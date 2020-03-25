import React from 'react';
import logo from './logo.svg';
import './css/main.css';
import DemoCarousel from './Components/slide'
import Advantages from './Components/advantages';

function App() {
  return (
    <div className="App">
      <DemoCarousel/>
      <Advantages/>
    </div>
  );
}

export default App;
