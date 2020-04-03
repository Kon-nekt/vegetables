import React from 'react';
import PropTypes from 'prop-types';
import '../css/productCard.css';

class Card extends React.Component {

    render(){
        return(
            <div className="osnova">
                                <div className="mer_logo">
                                   <img src={this.props.image} alt="" />
                                </div>
                                <div className="mer_name">
                                    {this.props.name}
                                </div>
                                {(this.props.type === 'sale') && <div className="mer_old_price">
                                    {this.props.price} грн/кг
                                </div> }
                                {(this.props.type === 'sale') && <div className="mer_sale">
                                    {this.props.newPrice} грн/кг
                                </div>}
                                {(this.props.type === 'normal') && <div className="mer_price">
                                    {this.props.price} грн/кг
                                </div> }
                                <div className="mer_dopinfo">
                                    {this.props.descr}
                                </div>
                            </div>
            )
    }
}

Card.defaultProps = {
    type: 'normal',
    price: '000',
    name: 'Товар',
}

Card.propTypes = {
    type: PropTypes.string,
    price: PropTypes.string.isRequired,
    newPrice: PropTypes.string,
    name: PropTypes.string.isRequired,
    descr: PropTypes.string,
}

export default Card;
