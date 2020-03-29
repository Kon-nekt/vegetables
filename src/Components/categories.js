import React from 'react';
import PropTypes from 'prop-types';

import Card from './productCard';
import '../css/categories.css'

class Categories extends React.Component {

    render(){
        return(
            <>
                <h1 className="categories_header">{this.props.name}</h1>
                <div className = "fStroke">
                    <Card name="Капуста" price="12" newPrice="7.85" descr="Предположим, что эта капуста не очень вкусная" type="normal"/>
                    <Card name="Капуста" price="12" newPrice="7.85" descr="Предположим, что эта капуста не очень вкусная" type="normal"/>
                    <Card name="Капуста" price="12" newPrice="7.85" descr="Предположим, что эта капуста не очень вкусная" type="normal"/>
                    <Card name="Капуста" price="12" newPrice="7.85" descr="Предположим, что эта капуста не очень вкусная" type="normal"/>
                </div>
            </>
        )
    }
}

export default Categories;
