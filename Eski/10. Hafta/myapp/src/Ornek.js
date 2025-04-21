import React, { useState, useEffect } from 'react';

/*
    2 tane input 1 tane select 1 tane de düğme
     elemanı olan bir form hazırlayınız.

    Select in içinde 4 tane seçenek olmalı.
        Bu seçenekler 4 işlem olmalı.

    Düğmeye basıldığında inputlara herhangi bir değer girilmediyse
        Hatalı giriş mesajı versin.
    
        İnputlara sayı dışında bir değer girildiyse
            Okuma Yazma Öğren mesajı versin.
        
            İnputlara 5 haneden büyük sayı girilirse
                Kafam Karıştır mesajı versin.

    İnputlara doğru veri girildiyse Select'te seçilen işlemi yaparak
        sonucu bir h1 de göstersin.

    Her 5 saniyede 1 inputların arka plan rengi 
        rastgele bir renkle değişsin.
*/


function Ornek() {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [background, setBackground] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const colors = ['red', 'blue', 'green', 'yellow', 'orange'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setBackground(randomColor);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            setErrorMessage('Okuma Yazma Öğren');
        } else if (value.length > 5) {
            setErrorMessage('Kafam Karıştı');
        } else {
            setErrorMessage('');
        }

        if (e.target.name === 'input1') {
            setInput1(value);
        } else if (e.target.name === 'input2') {
            setInput2(value);
        }
    };

    const handleSelectChange = (e) => {
        setOperation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (input1 === '' || input2 === '') {
            setErrorMessage('Hatalı giriş');
        } else {
            let result;
            switch (operation) {
                case 'add':
                    result = Number(input1) + Number(input2);
                    break;
                case 'subtract':
                    result = Number(input1) - Number(input2);
                    break;
                case 'multiply':
                    result = Number(input1) * Number(input2);
                    break;
                case 'divide':
                    result = Number(input1) / Number(input2);
                    break;
                default:
                    result = '';
            }
            setResult(result);
        }
    };

    return (
        <div style={{ backgroundColor: background }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="input1"
                    value={input1}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="input2"
                    value={input2}
                    onChange={handleInputChange}
                />
                <select value={operation} onChange={handleSelectChange}>
                    <option value="">Select an operation</option>
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                    <option value="multiply">Multiply</option>
                    <option value="divide">Divide</option>
                </select>
                <button type="submit">Calculate</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {result && <h1>{result}</h1>}
        </div>
    );
}


export default Ornek