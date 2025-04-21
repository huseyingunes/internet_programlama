import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

/*
    Benim için bir tane yapılacaklar listesi uygulaması geliştirmeni
        istiyorum.
    
    Bu uygulamada yapılacaklar Firebase veri tabanında tutulmalıdır.

    Uygulama açıldığında daha önce kayıtlı olan yapılacaklar 
        otomatik olarak gösterilmelidir.

    Kullanıcı bu yapılacaklara yeni yapılacaklar ekleyebilmeli
     eski yapılacakları düzenleyebilmeli ve silebilmelidir.
*/

const Ornek2 = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const firebaseConfig = {
        // Your Firebase configuration
        apiKey: "AIzaSyA1WRpGOE-nBMSlMmwytKoIl6z0sbPzWRk",
        authDomain: "copilot-react-todos.firebaseapp.com",
        projectId: "copilot-react-todos",
        storageBucket: "copilot-react-todos.appspot.com",
        messagingSenderId: "426558992742",
        appId: "1:426558992742:web:92b924fc266e9294be98a7"
    };
    firebase.initializeApp(firebaseConfig);

    // Fetch todos from Firebase
    
    const fetchTodos = async () => {
        const db = firebase.firestore();
        const todosRef = db.collection('todos');
        const snapshot = await todosRef.get();
        const todosData = snapshot.docs.map(doc => doc.data());
        setTodos(todosData);
    };
    

    useEffect(() => {
        // Initialize Firebase
        
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (newTodo.trim() === '') return;

        const db = firebase.firestore();
        const todosRef = db.collection('todos');
        await todosRef.add({ text: newTodo });

        setNewTodo('');
        fetchTodos();
    };

    const editTodo = async (id, newText) => {
        const db = firebase.firestore();
        const todoRef = db.collection('todos').doc(id);
        await todoRef.update({ text: newText });

        fetchTodos();
    };

    const deleteTodo = async (id) => {
        const db = firebase.firestore();
        const todoRef = db.collection('todos').doc(id);
        await todoRef.delete();

        fetchTodos();
    };

    return (
        <div>
            <h1>Yapılacaklar Listesi</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => editTodo(todo.id, 'New Text')}>Düzenle</button>
                        <button onClick={() => deleteTodo(todo.id)}>Sil</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Ekle</button>
        </div>
    );
};

export default Ornek2;