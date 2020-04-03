import React from 'react';
import './css/main.css';
import DemoCarousel from './Components/slide'
import Advantages from './Components/advantages';
import Sales from './Components/sales';
import Categories from './Components/categories';
import Footer from './Components/footer';
import Header from './Components/header';
import {Element,scroller } from 'react-scroll'
import HeaderPC from './Components/headerPC';
import Info from './Components/info';
import Login from './Components/login';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={visibility:false};
    this.handleClick=this.handleClick.bind(this);
  }
  handleClick(link){
    scroller.scrollTo(`myScrollToElement${link}`, {
        offset: -60,
        duration: 300,
        smooth: "easeInOutQuint"
    });
  }

  render() {
    return (
    <div className="App">
      <HeaderPC anchor={this.handleClick}/>
      <Header anchor={this.handleClick}/>
      <DemoCarousel/>
      <Advantages/>
      <Sales />
      <Categories name="Новинки" />
      <Element name="myScrollToElement1">
      <Categories name="Овощи" />
      </Element>
      <Element name="myScrollToElement2">
      <Categories name="Фрукты" />
      </Element>
      <Element name="myScrollToElement3">
      <Categories name="Орехи" />
      </Element>
      <Element name="myScrollToElement4">
      <Categories name="Конфеты" />
      </Element>
      <Element name="myScrollToElement5">
      <Categories name="Фрукты в шоколаде" />
      </Element>
      <Footer />
      <Info/>
    </div>
  );
  }  
}

export default App;
