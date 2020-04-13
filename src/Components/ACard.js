import React from 'react';
import '../css/card.css';

class ACard extends React.Component {

    render(){
        return(
            <div className="osnova">
                    <div className="mer_logo">
                        <img src={this.props.image} alt="" />
                    </div>
                    <div className="mer_name">
                        {this.props.name}
                    </div>
                    <div className="mer_dopinfo">
                        {this.props.descr}
                    </div>
                </div>
            )
    }
}
ACard.defaultProps = {
    type: 'normal',
    name: 'Преимущество',
}

export default ACard;