import React from 'react';
import axios from 'axios';

import Card from './productCard';
import '../css/sales.css'

class Sales extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const response = await axios.get('http://192.236.146.174:8000/vegs');

        console.log(response.data.return);

        const data = response.data.return.filter(value => value.isSale);

        this.setState({
            data,
        })
    }

    dataRender(data) {
        return(data.map(cardData => <Card key = {cardData._id + 1} name={cardData.label} price={cardData.price} newPrice={cardData.salePrice} descr={cardData.description} image={cardData.image} type="sale" />));
    }

    render(){
        return(
            <>
                <h1 className="sales_header">Распродажа! Только сегодня и только сейчас!</h1>
                <div className = "fStroke">
                    {this.dataRender(this.state.data)}
                </div>
                {/* <div className="sales_footer" /> */}
            </>
        )
    }
}

export default Sales;
