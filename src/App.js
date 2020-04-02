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
      <Element name="myScrollToElement1">
      <Categories name="Новинки" />
      </Element>
      <Element name="myScrollToElement2">
      <Categories name="Овощи" />
      </Element>
      <Categories name="Фрукты" />
      <Categories name="Грибы" />
      <Footer />
      <Info/>
    </div>
  );
  }  
}

export default App;
