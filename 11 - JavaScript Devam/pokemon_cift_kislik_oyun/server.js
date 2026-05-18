const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// ==================== OYUN STATESİ ====================

const gameRooms = {}; // Tüm odaları saklamak için
const userRooms = {}; // Kullanıcı ID'sinden oda ID'sine

// ==================== YARDIMCI FONKSİYONLAR ====================

/**
 * Yeni oda oluştur
 */
function createRoom(roomId, hostId, hostName) {
    gameRooms[roomId] = {
        id: roomId,
        host: {
            id: hostId,
            name: hostName,
            socket: null,
            deck: [],
            health: 100,
            maxHealth: 100,
            currentPokemonIndex: 0,
            currentPokemon: null
        },
        guest: {
            id: null,
            name: null,
            socket: null,
            deck: [],
            health: 100,
            maxHealth: 100,
            currentPokemonIndex: 0,
            currentPokemon: null
        },
        status: 'waiting', // waiting, deck-building, ready, playing, finished
        battleLog: [],
        createdAt: new Date()
    };
    return gameRooms[roomId];
}

/**
 * Pokémon'u PokeAPI'den getir
 */
async function fetchPokemonData(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) return null;
        
        const data = await response.json();
        
        return {
            id: pokemonId,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            type: data.types[0]?.type?.name || 'normal',
            image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            stats: {
                hp: data.stats[0]?.base_stat || 50,
                attack: data.stats[1]?.base_stat || 50,
                defense: data.stats[2]?.base_stat || 50,
                spAtk: data.stats[3]?.base_stat || 50,
                spDef: data.stats[4]?.base_stat || 50,
                speed: data.stats[5]?.base_stat || 50
            }
        };
    } catch (error) {
        console.error('Pokemon fetch error:', error);
        return null;
    }
}

/**
 * Hasar hesapla
 */
function calculateDamage(attacker, defender) {
    const baseDamage = attacker.stats.attack * 0.8;
    const randomMultiplier = 0.8 + Math.random() * 0.4;
    const defenseFactor = 100 / (100 + defender.stats.defense);
    const damage = Math.max(5, Math.floor(baseDamage * randomMultiplier * defenseFactor));
    return damage;
}

/**
 * Savaş logu ekle
 */
function addBattleLog(roomId, message) {
    if (gameRooms[roomId]) {
        gameRooms[roomId].battleLog.push({
            message,
            timestamp: new Date()
        });
        
        // Son 50 mesajı tut
        if (gameRooms[roomId].battleLog.length > 50) {
            gameRooms[roomId].battleLog.shift();
        }
    }
}

// ==================== SOCKET.IO OLAYLARI ====================

io.on('connection', (socket) => {
    console.log(`[CONNECTED] ${socket.id}`);

    /**
     * Oda oluştur
     */
    socket.on('create-room', (data, callback) => {
        const roomId = Math.random().toString(36).substring(7);
        const room = createRoom(roomId, socket.id, data.playerName);
        room.host.socket = socket;
        userRooms[socket.id] = roomId;

        socket.join(roomId);
        
        console.log(`[ROOM CREATED] ${roomId} by ${data.playerName}`);
        callback({
            success: true,
            roomId,
            message: `Oda oluşturuldu: ${roomId}`
        });
    });

    /**
     * Odaya katıl
     */
    socket.on('join-room', (data, callback) => {
        const roomId = data.roomId;
        const room = gameRooms[roomId];

        if (!room) {
            return callback({
                success: false,
                message: 'Oda bulunamadı!'
            });
        }

        if (room.guest.id) {
            return callback({
                success: false,
                message: 'Oda dolu!'
            });
        }

        room.guest.id = socket.id;
        room.guest.name = data.playerName;
        room.guest.socket = socket;
        userRooms[socket.id] = roomId;

        socket.join(roomId);
        room.status = 'deck-building';

        console.log(`[ROOM JOINED] ${roomId} by ${data.playerName}`);

        // Her iki oyuncuya da odaya katılınca bildir
        io.to(roomId).emit('room-updated', {
            host: {
                id: room.host.id,
                name: room.host.name,
                deckSize: room.host.deck.length
            },
            guest: {
                id: room.guest.id,
                name: room.guest.name,
                deckSize: room.guest.deck.length
            },
            status: room.status,
            message: `${data.playerName} odaya katıldı!`
        });

        callback({
            success: true,
            message: `${roomId} odasına katıldınız!`
        });
    });

    /**
     * Deste ekle
     */
    socket.on('add-to-deck', async (data, callback) => {
        const roomId = userRooms[socket.id];
        const room = gameRooms[roomId];

        if (!room) {
            return callback({ success: false, message: 'Oda bulunamadı!' });
        }

        // Pokémon verilerini getir
        const pokemonData = await fetchPokemonData(data.pokemonId);
        
        if (!pokemonData) {
            return callback({ success: false, message: 'Pokémon bulunamadı!' });
        }

        // Oyuncunun destesini belirle
        const isHost = socket.id === room.host.id;
        const playerDeck = isHost ? room.host.deck : room.guest.deck;
        const playerName = isHost ? room.host.name : room.guest.name;

        // Deste boyutu kontrol et (maksimum 6 Pokémon)
        if (playerDeck.length >= 6) {
            return callback({ 
                success: false, 
                message: 'Deste 6 Pokémon ile dolduruldu!' 
            });
        }

        // Pokémon'u deste ekle
        playerDeck.push(pokemonData);

        console.log(`[DECK UPDATE] ${playerName} added ${pokemonData.name} to deck`);

        // Her iki oyuncuya da güncelle
        io.to(roomId).emit('deck-updated', {
            host: {
                id: room.host.id,
                name: room.host.name,
                deckSize: room.host.deck.length,
                deckReady: room.host.deck.length >= 1
            },
            guest: {
                id: room.guest.id,
                name: room.guest.name,
                deckSize: room.guest.deck.length,
                deckReady: room.guest.deck.length >= 1
            },
            message: `${playerName} destesine ${pokemonData.name} ekledi!`
        });

        callback({ 
            success: true, 
            message: `${pokemonData.name} destesine eklendi!` 
        });
    });

    /**
     * Desteden çıkar
     */
    socket.on('remove-from-deck', (data, callback) => {
        const roomId = userRooms[socket.id];
        const room = gameRooms[roomId];

        if (!room) {
            return callback({ success: false, message: 'Oda bulunamadı!' });
        }

        const isHost = socket.id === room.host.id;
        const playerDeck = isHost ? room.host.deck : room.guest.deck;
        const playerName = isHost ? room.host.name : room.guest.name;

        // Pokemon'u desteden çıkar
        const index = data.index;
        if (index >= 0 && index < playerDeck.length) {
            const removed = playerDeck.splice(index, 1)[0];
            console.log(`[DECK UPDATE] ${playerName} removed ${removed.name} from deck`);

            // Her iki oyuncuya da güncelle
            io.to(roomId).emit('deck-updated', {
                host: {
                    id: room.host.id,
                    name: room.host.name,
                    deckSize: room.host.deck.length,
                    deckReady: room.host.deck.length >= 1
                },
                guest: {
                    id: room.guest.id,
                    name: room.guest.name,
                    deckSize: room.guest.deck.length,
                    deckReady: room.guest.deck.length >= 1
                },
                message: `${playerName} destesinden ${removed.name} çıkardı!`
            });

            callback({ 
                success: true, 
                message: `${removed.name} desteden çıkardı!` 
            });
        }
    });

    /**
     * Oyunu başlat
     */
    socket.on('start-game', (data, callback) => {
        const roomId = userRooms[socket.id];
        const room = gameRooms[roomId];

        if (!room) {
            return callback({ success: false, message: 'Oda bulunamadı!' });
        }

        if (room.host.deck.length === 0 || room.guest.deck.length === 0) {
            return callback({ 
                success: false, 
                message: 'Her oyuncunun en az 1 Pokémon\'u olmalı!' 
            });
        }

        // İlk Pokémon'ları ayarla
        room.host.currentPokemonIndex = 0;
        room.host.currentPokemon = room.host.deck[0];
        
        room.guest.currentPokemonIndex = 0;
        room.guest.currentPokemon = room.guest.deck[0];

        // Healthi sıfırla
        room.host.health = 100;
        room.guest.health = 100;

        room.status = 'playing';
        room.battleLog = [];

        console.log(`[GAME STARTED] Room ${roomId}`);

        // Her iki oyuncuya oyun başlasın bildir
        io.to(roomId).emit('game-started', {
            host: {
                name: room.host.name,
                pokemon: room.host.currentPokemon,
                health: room.host.health,
                maxHealth: room.host.maxHealth
            },
            guest: {
                name: room.guest.name,
                pokemon: room.guest.currentPokemon,
                health: room.guest.health,
                maxHealth: room.guest.maxHealth
            }
        });

        addBattleLog(roomId, '⚔️ Oyun başladı!');

        callback({ success: true, message: 'Oyun başladı!' });
    });

    /**
     * Saldırı yap
     */
    socket.on('attack', (data, callback) => {
        const roomId = userRooms[socket.id];
        const room = gameRooms[roomId];

        if (!room || room.status !== 'playing') {
            return callback({ success: false, message: 'Oyun aktif değil!' });
        }

        const isHost = socket.id === room.host.id;
        const attacker = isHost ? room.host : room.guest;
        const defender = isHost ? room.guest : room.host;
        const attackerName = isHost ? room.host.name : room.guest.name;
        const defenderName = isHost ? room.guest.name : room.host.name;

        if (!attacker.currentPokemon || !defender.currentPokemon) {
            return callback({ success: false, message: 'Pokémon yok!' });
        }

        // Hasar hesapla
        const damage = calculateDamage(attacker.currentPokemon, defender.currentPokemon);
        defender.health -= damage;

        const logMessage = `⚡ ${attacker.currentPokemon.name} (${attackerName}) → ${defender.currentPokemon.name} (${defenderName}): ${damage} hasar!`;
        addBattleLog(roomId, logMessage);

        // Savaş sonuçlarını gönder
        const battleResult = {
            attacker: {
                name: attackerName,
                pokemon: attacker.currentPokemon.name,
                damage
            },
            defender: {
                name: defenderName,
                pokemon: defender.currentPokemon.name,
                health: Math.max(0, defender.health),
                maxHealth: defender.maxHealth,
                isDead: defender.health <= 0
            },
            battleLog: room.battleLog
        };

        io.to(roomId).emit('attack-result', battleResult);

        // Pokémon öldüyse kontrol et
        if (defender.health <= 0) {
            defender.health = 0;
            
            // Sonraki Pokémon var mı?
            if (defender.currentPokemonIndex + 1 < defender.deck.length) {
                defender.currentPokemonIndex++;
                defender.currentPokemon = defender.deck[defender.currentPokemonIndex];
                defender.health = 100;

                const switchMessage = `🔄 ${defenderName} ${defender.currentPokemon.name} ile değiştirdi!`;
                addBattleLog(roomId, switchMessage);

                io.to(roomId).emit('pokemon-switched', {
                    defenderName,
                    newPokemon: defender.currentPokemon,
                    health: 100
                });
            } else {
                // Oyun bitti!
                room.status = 'finished';
                const winnerName = attackerName;
                
                const endMessage = `🏆 ${winnerName} OYUNU KAZANDI! 🏆`;
                addBattleLog(roomId, endMessage);

                io.to(roomId).emit('game-ended', {
                    winner: winnerName,
                    loser: defenderName,
                    battleLog: room.battleLog
                });
            }
        }

        callback({ success: true, damage });
    });

    /**
     * Oyuncu ayrıldı
     */
    socket.on('disconnect', () => {
        const roomId = userRooms[socket.id];
        const room = gameRooms[roomId];

        if (room) {
            const playerName = socket.id === room.host.id ? room.host.name : room.guest.name;
            
            if (room.status === 'playing') {
                const winner = socket.id === room.host.id ? room.guest.name : room.host.name;
                addBattleLog(roomId, `🚪 ${playerName} ayrıldı! ${winner} kazandı!`);
                
                io.to(roomId).emit('player-disconnected', {
                    message: `${playerName} oyundan ayrıldı!`,
                    winner: winner
                });
            } else {
                io.to(roomId).emit('player-left', {
                    message: `${playerName} oyundan ayrıldı!`
                });
            }

            console.log(`[DISCONNECTED] ${socket.id} from room ${roomId}`);
        }

        delete userRooms[socket.id];
    });
});

// ==================== HTTP ROUTES ====================

/**
 * Test endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK',
        timestamp: new Date(),
        rooms: Object.keys(gameRooms).length
    });
});

/**
 * Tüm odaları listele (debug)
 */
app.get('/api/rooms', (req, res) => {
    const rooms = Object.values(gameRooms).map(room => ({
        id: room.id,
        host: room.host.name,
        guest: room.guest.name,
        status: room.status,
        createdAt: room.createdAt
    }));
    res.json({ rooms });
});

// ==================== SUNUCU BAŞLAT ====================

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🎮 Pokemon TCG Server çalışıyor: http://localhost:${PORT}`);
    console.log(`⚡ Socket.IO aktif: ws://localhost:${PORT}`);
});
