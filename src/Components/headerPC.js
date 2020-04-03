import React from 'react';
import '../css/headerPC.css'

class HeaderPC extends React.Component {
    constructor(props) {
    super(props);
    this.state={onActiveFirst:'Select',onActiveSecond:'nonSelect',onActiveThird:'nonSelect'};
  }

  render () {
    return (
      <div className="navBar">
        <div id="vegetables" className="nav"><div onClick={()=>this.props.anchor('Овощи')}>Овощи</div></div>
        <div id="fruits" className="nav"><div onClick={()=>this.props.anchor('Фрукты')}>Фрукты</div></div>
        <div id="nuts" className="nav"><div onClick={()=>this.props.anchor('Орехи')}>Орехи</div></div>
        <div id="candies" className="nav"><div onClick={()=>this.props.anchor('Конфеты')}>Конфеты</div></div>
        <div id="chocolate" className="nav"><div onClick={()=>this.props.anchor('Фрукты в шоколаде')}>Фрукты в шоколаде</div></div>
      </div>
    );
  }
}
export default HeaderPC;