import React from 'react';
import axios from 'axios';

import './css/main.css';
import DemoCarousel from './Components/slide'
import Advantages from './Components/advantages';
import Sales from './Components/sales';
import Categories from './Components/categories';
import Footer from './Components/footer'
import Card from './Components/productCard';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.dataRender = this.dataRender.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get('http://192.236.146.174:8000/vegs');

        const data = response.data.return

        this.setState({
            data,
        })
    }

    cardRender(data) {
        return(data.map(cardData => <Card key = {cardData._id} name={cardData.label} price={cardData.price} newPrice={cardData.salePrice} descr={cardData.description} image={cardData.image} type={ cardData.isSale ? "sale" : "normal" } />));
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

        for (const key in cards) {
            if (cards.hasOwnProperty(key)) {
                const element = cards[key];
                cardsToRender.push(
                    <Categories key={ key } name={ key }>
                        {this.cardRender(element)}
                    </Categories>
                )
            }
        }

        return cardsToRender;
    }

  render() {
    return (
      <div className="App">
        <DemoCarousel/>
        <Advantages/>
        <Sales />
        { this.dataRender(this.state.data) }
        <Footer />
      </div>
    );
  }
}

export default App;
