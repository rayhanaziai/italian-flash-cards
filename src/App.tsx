import React from 'react';
import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import { RouteNames } from "./constants/routes";

import Home from "./Pages/Home";
import Input from "./Pages/Input";



const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World! Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <Routes>
          <Route path={RouteNames.Input} element={<Input />}/>
          <Route path={RouteNames.Index} element={<Home />}/>
        </Routes>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
