import React from 'react';
import {Modulo} from '../App';
import {ModuloAbrirChamado} from '../App';
import {ModuloFecharChamados} from '../App';
import ModuloListagemMensal from './ModuloListagemMensal';

class Body extends React.Component {
    render() {
      console.log("[Body] - Renderizando body");
      console.log(this.props.activeModule);
      
      return (
        <section className="body-componente">
          {(() => {
            switch(this.props.activeModule){
              case Modulo.OPENOS:
                return <ModuloAbrirChamado />;
                break;
              case Modulo.CLOSEOS:
                return <ModuloFecharChamados />;
                break;
              case Modulo.LIST:
                return <ModuloListagemMensal />;
                break;
            }
          })()}
          
        </section>
      )
    }
  }
export default Body;  