import React from 'react';
import axios from 'axios';
import {Element,scroller } from 'react-scroll'

import './css/main.css';
import DemoCarousel from './Components/slide'
import Advantages from './Components/advantages';
import Sales from './Components/sales';
import Categories from './Components/categories';
import Footer from './Components/footer'
import Card from './Components/productCard';
import HeaderPC from './Components/headerPC';
import Info from './Components/info';
import Header from './Components/header';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            visibility:false,
        }

        this.handleClick=this.handleClick.bind(this);
        this.dataRender = this.dataRender.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get('/vegs');

        const data = response.data.return.reverse();

        this.setState({
            data,
        })
    }

    cardRender(data) {
        return(data.map(cardData => <Card key = { cardData._id } name={cardData.label} price={cardData.price} newPrice={cardData.salePrice} descr={cardData.description} image={cardData.image} type={ cardData.isSale ? "sale" : "normal" } />));
    }

    handleClick(link){
        scroller.scrollTo(`myScrollToElement${link}`, {
            offset: -60,
            duration: 300,
            smooth: "easeInOutQuint"
        });
      }

    dataRender(data) {
        let cards = {};
        let cardsToRender = [];

        for (const iterator of data) {
            let tempCategory = cards[iterator.category];

            tempCategory = tempCategory ? tempCategory : [];

            cards = {
                ...cards,
                [iterator.category]: [...tempCategory, iterator],
            }

            if ( ((Date.now() - iterator.time) < 604800000) && !iterator.isSale ) {

                if (cards.hasOwnProperty('Новинки')) {
                    cards['Новинки'] = [...cards['Новинки'], iterator];
                } else {
                    cards = {
                        'Новинки': [iterator],
                        ...cards,
                    }
                }
            }

        }

        let i = 1;

        for (const key in cards) {
            if (cards.hasOwnProperty(key)) {
                const element = cards[key];
                cardsToRender.push(
                    <Element  key={ `myScrollToElement${name}` } name={ `myScrollToElement${name}` }>
                        <Categories key={ key } name={ key }>
                            {this.cardRender(element)}
                        </Categories>
                    </Element>
                )
                i++;
            }
        }

        return cardsToRender;
    }

  render() {
    return (
      <div className="App">
        <HeaderPC anchor={this.handleClick}/>
        <Header anchor={this.handleClick}/>
        <DemoCarousel/>
        <Advantages/>
        <Sales />
        { this.dataRender(this.state.data) }
        <Footer />
        <Info/>
      </div>
    );
  }

}

export default App;
