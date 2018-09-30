import React from 'react';
import {backEndHost} from '../App';
import LoadingGif from './LoadingGif';
import ErrorLoadingOrders from './ErrorLoadingOrders';
import SimpleModal from './SimpleModal';
import ItemChamado from './ItemChamado';

function updateState(toUpdateObject){
    this.setState({ chamados : toUpdateObject.chamados, isLoading : false });
}


class ModuloFecharChamados extends React.Component {
    state = {
      chamados : [],
      showModal : false,
      modalTitle : "",
      modalBody : "",
      osBeingClosed : 0,
      isLoading: true,
      isInError: false
    }
  
    constructor(props) {
      super(props);
      this.tryToCloseOs = this.tryToCloseOs.bind(this);
      updateState = updateState.bind(this);
    }
  
    componentDidMount() {
      console.log("[ModuloFecharChamados] - Montagem do componente invocada.");
      var myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*'
      });
  
      var myInit = { method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default' };
  
      var myRequest = new Request(`${backEndHost}/getOpeneds`, myInit);
      console.log(`[ModuloFecharChamados] - Disparando requisição para ${backEndHost}: `, myRequest);
  
      fetch(myRequest)
          .then(function(response) {
            console.log("[ModuloFecharChamados] - Recebido retorno da requisição.");
            return response.json();
          })
          .then((json) => {
            if(json.status != undefined && json.status == "-1"){
              this.setState({isLoading : false, isInError : true});
              return false;
            }
            console.log('[ModuloFecharChamados] - Json respondido:', json);
            updateState({chamados : json});
          })
          .catch((ex) => {
            console.log('[ModuloFecharChamados] - Erro ao parsear. ', ex);
            this.setState({isLoading : false, isInError : true});
          });
    }
  
    tryToCloseOs(chamado){
      console.log("[ModuloFecharChamados] - tryToCloseOs invoked");
      console.log(chamado);
      this.setState({
        showModal : true,
        osBeingClosed : chamado
      })
    }
  
    render() {
      return (
        this.state.isLoading === true || this.state.isInError === true  
        ?
        this.state.isLoading ? <LoadingGif /> : <ErrorLoadingOrders />
        :
        <div>
          <SimpleModal 
              showModal={this.state.showModal} 
              osBeingClosed={this.state.osBeingClosed} />
          <ul className="ul-chamados">
            {
              this.state.chamados.length === 0 ?
                <div style={{height: 60, background: "#cccccc80", textAlign: "center", fontSize: 20, paddingTop: 10}}>
                  Não há chamados abertos
                </div>
              :
                this.state.chamados.map(chamado =>
                  <ItemChamado chamado={chamado} 
                  tryToCloseOs = {this.tryToCloseOs}/>
                )
            }
          </ul>
        </div>
      );
    }
  }

  
  export default ModuloFecharChamados;