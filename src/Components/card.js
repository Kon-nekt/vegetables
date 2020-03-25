import React from 'react';
import img from './2.jpg';
import '../css/card.css';

const Card = () => {
return(
<div className="osnova">
                    <div className="mer_logo">
                       <img src={img} alt="" />
                    </div>
                    <div className="mer_name">
                        Капуста
                    </div>
                    <div className="mer_dopinfo">
                        Описание
                    </div>
                </div>
)
}
export default Card;
