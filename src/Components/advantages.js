import React from 'react';
import Card from './card';
import '../css/advantages.css'

const Advantages = () => {
    return(
        <div className = "advantages">
            <div className = "fStroke"><Card name="Капуста" price="12" descr="Предположим, что эта капуста очень вкусная" type="normal"/> <Card name="Капуста" price="12" newPrice="7.85" descr="Предположим, что эта капуста не очень вкусная" type="sale"/> <Card name="Огурцы" price="43" type="normal"/></div>
        </div>
    )
}
export default Advantages;