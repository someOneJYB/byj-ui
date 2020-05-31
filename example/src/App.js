import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, AnExample } from './es';
import { AnotherExample } from './lib';
import './es/style/css/index.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <AnExample name={'rtyui'}/>
          <AnotherExample name={"23456789"}/>
          <Button>and save to reload.</Button>
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
