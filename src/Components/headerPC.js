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
        <div id="vegetables" className="nav"><div onClick={()=>this.props.anchor('1')}>Овощи</div></div>
        <div id="fruits" className="nav"><div onClick={()=>this.props.anchor('2')}>Фрукты</div></div>
        <div id="nuts" className="nav"><div onClick={()=>this.props.anchor('3')}>Орехи</div></div>
        <div id="candies" className="nav"><div onClick={()=>this.props.anchor('4')}>Конфеты</div></div>
        <div id="chocolate" className="nav"><div onClick={()=>this.props.anchor('5')}>Фрукты в шоколаде</div></div>
      </div>
    );
  }
}
export default HeaderPC;