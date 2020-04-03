import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import '../css/header.css'

class Header extends React.Component {
    constructor(props) {
    super(props);
    this.state={onActiveFirst:'Select',onActiveSecond:'nonSelect',onActiveThird:'nonSelect'};
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu>
        <a id="vegetables" className="menu-item"><div onClick={()=>this.props.anchor('1')}>Овощи</div></a>
        <a id="fruits" className="menu-item"><div onClick={()=>this.props.anchor('2')}>Фрукты</div></a>
        <a id="nuts" className="menu-item"><div onClick={()=>this.props.anchor('3')}>Орехи</div></a>
        <a id="candies" className="menu-item"><div onClick={()=>this.props.anchor('4')}>Конфеты</div></a>
        <a id="chocolate" className="menu-item"><div onClick={()=>this.props.anchor('5')}>Фрукты в шоколаде</div></a>
      </Menu>
    );
  }
}
export default Header;