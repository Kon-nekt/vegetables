import React from 'react';
import logo from './logo.svg';
import './css/main.css';
import DemoCarousel from './Components/slide'
import Advantages from './Components/advantages';
import Footer from './Components/footer';

function App() {
  return (
    <div className="App">
      <DemoCarousel/>
      <Advantages/>
      <Footer/>
    </div>
  );
}

export default App;
