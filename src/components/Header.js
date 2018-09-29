import React from 'react';
import {Modulo} from '../App';
import logoimg from "../imgs/logo.jpg";

class Header extends React.Component {
 
    constructor(props) {
      super(props);
      this.handleOnMenuItemClick = this.handleOnMenuItemClick.bind(this);
    }
  
    handleOnMenuItemClick(module){
      console.log("[HEADER] - setActiveModule invocado com param: ", module);
      this.props.changeAppActiveModule(module);
      document.getElementsByClassName("sidenav-overlay")[0].click();
    }
  
    render() {
      return (
        <nav className="topbar">
          <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large">
            <i className="material-icons">menu</i>
          </a>
          <span>{this.props.activeModule.title}</span>
          <a className="btn-refresh right" href="javascript:window.location.reload()">
            <i className="material-icons">refresh</i>
          </a>
          <ul id="slide-out" className="sidenav">
            <div className="menu-container-logo">
              <img className="logo-img" src={logoimg} alt="Logo ClickTI" />
            </div>
            <li>
              <a onClick={this.handleOnMenuItemClick.bind(null, Modulo.OPENOS)} className="waves-effect" href="#!">{Modulo.OPENOS.title}</a>
            </li>
            <li>
              <a onClick={this.handleOnMenuItemClick.bind(null, Modulo.CLOSEOS)} className="waves-effect" href="#!">{Modulo.CLOSEOS.title}</a>
            </li>
          </ul>
        </nav>
      );
    }
  }

  export default Header;