import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi Pichu
        </p>
        <a
          className="App-link"
          href="https://www.pokemon.com/us/pokedex/pichu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pika pika
        </a>
      </header>
    </div>
  );
}

export default App;
