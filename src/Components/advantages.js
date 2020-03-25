import React from 'react';
import Card from './card';
import '../css/advantages.css'

const Advantages = () => {
    return(
        <div className = "advantages">
            <div className = "fStroke"><Card/> <Card/> <Card/></div>
            <div className = "sStroke"><Card/> <Card/></div>
        </div>
    )
}
export default Advantages;