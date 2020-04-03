import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import '../css/header.css'

class Header extends React.Component {
    constructor(props) {
    super(props);
    this.state={onActiveFirst:'Select',onActiveSecond:'nonSelect',onActiveThird:'nonSelect', menuOpen:false};
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  closeMenu () {
    this.setState({menuOpen: false})
  }
  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
        <a id="vegetables" className="menu-item" onClick={()=>{this.props.anchor('Овощи');this.closeMenu();}}><div>Овощи</div></a>
        <a id="fruits" className="menu-item" onClick={()=>{this.props.anchor('Фрукты');this.closeMenu();}} ><div>Фрукты</div></a>
        <a id="nuts" className="menu-item" onClick={()=>{this.props.anchor('Орехи');this.closeMenu();}} ><div>Орехи</div></a>
        <a id="candies" className="menu-item" onClick={()=>{this.props.anchor('Конфеты');this.closeMenu();}} ><div>Конфеты</div></a>
        <a id="chocolate" className="menu-item" onClick={()=>{this.props.anchor('Фрукты в шоколаде');this.closeMenu();}}><div>Фрукты в шоколаде</div></a>
      </Menu>
    );
  }
}
export default Header;