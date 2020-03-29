import React from 'react';
import './css/main.css';
import DemoCarousel from './Components/slide'
import Advantages from './Components/advantages';
import Sales from './Components/sales';
import Categories from './Components/categories';
import Footer from './Components/footer'

function App() {
  return (
    <div className="App">
      <DemoCarousel/>
      <Advantages/>
      <Sales />
      <Categories name="Новинки" />
      <Categories name="Овощи" />
      <Categories name="Фрукты" />
      <Categories name="Грибы" />
      <Footer />
    </div>
  );
}

export default App;
