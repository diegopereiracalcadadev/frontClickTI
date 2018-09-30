import React from 'react';
import {Modulo} from '../App';
import {ModuloAbrirChamado} from '../App';
import {ModuloFecharChamados} from '../App';

class Body extends React.Component {
    render() {
      console.log("[Body] - Renderizando body");
      console.log(this.props.activeModule);
      
      return (
        <section className="body-componente">
          {this.props.activeModule == Modulo.OPENOS 
          ?
          <ModuloAbrirChamado />
          :
          <ModuloFecharChamados />} 
        </section>
      )
    }
  }
export default Body;  