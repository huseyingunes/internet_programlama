import logo from './logo.svg';
import './App.css';
import Yeni from './Yeni';
import Sart from './Sart';
import Sart2 from './Sart2';
import SartGaraj from './SartGaraj';

function tikla()
{
    alert("Tıklandı")
}

function App() {
  const a = "Merhaba"
  let araba = {"marka":"TOGG","model":"X10","yil":2023}
  return (
    <div className="App">
      <header className="App-header">
        <SartGaraj arabalar={["TOGG","Anadol","BMC"]}/>
        <Sart2 sart={true}/>
        <Sart sart={true}/>
        <Sart sart={false}/>
        <Yeni renk="turuncu" ileti={a} arac={araba}/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
