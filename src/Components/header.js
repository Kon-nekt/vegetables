import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import '../css/header.css'

class Header extends React.Component {
    constructor(props) {
    super(props);
    this.state={onActiveFirst:'Select',onActiveSecond:'nonSelect',onActiveThird:'nonSelect'};
  }
  handleMenuClick(event) {
    event.preventDefault();
    // Using the parent component's state to keep track of the menu
    this.setState({menuOpen: false});
  }
  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu isOpen={ false }>
        <a id="vegetables" className="menu-item" onClick={()=>this.props.anchor('Овощи')}><div>Овощи</div></a>
        <a id="fruits" className="menu-item" onClick={()=>this.props.anchor('Фрукты')}><div>Фрукты</div></a>
        <a id="nuts" className="menu-item" onClick={()=>this.props.anchor('Орехи')}><div>Орехи</div></a>
        <a id="candies" className="menu-item" onClick={()=>this.props.anchor('Конфеты')}><div>Конфеты</div></a>
        <a id="chocolate" className="menu-item" onClick={()=>this.props.anchor('Фрукты в шоколаде')}><div>Фрукты в шоколаде</div></a>
      </Menu>
    );
  }
}
export default Header;