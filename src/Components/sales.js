import React from 'react';
import PropTypes from 'prop-types';

import Card from './productCard';
import '../css/sales.css'

class Sales extends React.Component {

    render(){
        return(
            <>
                <h1 className="sales_header">Распродажа! Только сегодня и только сейчас!</h1>
                <div className = "fStroke">
                    <Card name="Капуста" price="12" newPrice="7.85" descr="" type="sale"/>
                    <Card name="Капуста" price="12" newPrice="7.85" descr="Предположим, что эта капуста не очень вкусная" type="normal"/>
                    <Card name="Капуста" price="12" newPrice="7.85" descr="Предположим, что эта капуста не очень вкусная" type="sale"/>
                </div>
                {/* <div className="sales_footer" /> */}
            </>
        )
    }
}

export default Sales;
