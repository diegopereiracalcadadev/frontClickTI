import React from 'react';
import {$, jQuery} from 'jquery';
import {Modal} from 'react-materialize';
import './App.css';
import TextareaAutosize from 'react-autosize-textarea';
import loadingImgSrc from "./imgs/loading-plasma.gif";
import axios from 'axios';
import Moment from 'react-moment';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import Header from './components/Header'

 
var Modulo = {
  OPENOS : { key : "openos",title : "Abrir Chamado"},
  CLOSEOS : { key : "closeos",title : "Fechar Chamados"}
};

var backEndHost = "http://192.168.0.12:8080";//"http://nodejs-mongo-persistent-backendclick.193b.starter-ca-central-1.openshiftapps.com";


var sendJsonRequest = async (url, metodo, objeto, callback) => {
  console.log("Enviando solicitação");
  try {
    const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objeto)
        });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    if(body.returnCode == -1){
      alert("Erro:" + body.message);
      console.log(body.message);
    }
    if (callback){
      callback(body);
    } 
    return body;
  } catch (error) {
    alert(error);
  }
}

var sendGetRequest = (url, callback) => {
  console.log("Method sendGetRequest was invoked.", url);
  return sendJsonRequest(url, "GET", callback);
}

var sendPostRequest = (url, objeto, callback) => {
  console.log("Method sendPostRequest was invoked.");
  console.log(url, objeto);
  return sendJsonRequest(url, "POST", objeto, callback);
}

class App extends React.Component {
  state = {
    activeModule : Modulo.OPENOS
  }

  
  constructor(props){
    super(props);
    console.log("[APP] - State no momento da renderização");
    console.log(this.state);
    this.changeAppActiveModule = this.changeAppActiveModule.bind(this);
  }   
  
  changeAppActiveModule(nextModule){
    console.log("[APP] - changeAppActiveModule inivocado com parm:", nextModule);
    this.setState({activeModule : nextModule});
    console.log("[APP] - State após alteração de state do changeAppActiveModule :", this.state);

  }

  render() {
    return (
      <div>
        <Header activeModule={this.state.activeModule} changeAppActiveModule = {this.changeAppActiveModule} />
        <Body activeModule={this.state.activeModule} />
        <Footer />
      </div>
    );
  }
}


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

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-component">
      </footer>
    );
  }
}

const mailToOptions = [
  { value: 'diegopereiracalcada@gmail.com', label: 'diegopereiracalcada@gmail.com' },
  { value: 'tarapi007@gmail.com', label: 'tarapi007@gmail.com' }
];

const clientsList = [
  { value: 'amontenegro', label : 'Amontenegro'},
  { value: 'bibi Barra', label : 'Bibi Barra'},
  { value: 'bibi Campo Grande', label : 'Bibi Campo Grande'},
  { value: 'bibi Metro', label : 'Bibi Metro'},
  { value: 'bibi Tijuca', label : 'Bibi Tijuca'},
  { value: 'capi', label : 'Capi'},
  { value: 'contarq', label : 'Contarq'},
  { value: 'globalCafe', label : 'GlobalCafe'},
  { value: 'lyon Construtora', label : 'Lyon Construtora'},
  { value: 'mm', label : 'MM'},
  { value: 'mundo Verde', label : 'Mundo Verde'},
  { value: 'pet Shop', label : 'Pet Shop'},
  { value: 'quality Fisio', label : 'Quality Fisio'},
  { value: 'romarfel', label : 'Romarfel'},
  { value: 'usaFlex', label : 'UsaFlex'}
]

class ModuloAbrirChamado extends React.Component{
  state = {
    clientName : "",
    mailTo : "diegopereiracalcada@gmail.com",
    openingUser : "",
    description : "",
    isExpandedDesc : false,
  }
  

  constructor(props){
    super(props);
    this.handleOpeningUserOnChange = this.handleOpeningUserOnChange.bind(this);
    this.handleDescriptionOnChange = this.handleDescriptionOnChange.bind(this);
    this.handleDescriptionOnFocus = this.handleDescriptionOnFocus.bind(this);
    this.handleDescriptionCloseBtn = this.handleDescriptionCloseBtn.bind(this);
    this.send = this.send.bind(this);
  }

  send() {
    console.log(this.state);
    // if(!this.state.clientName 
    //       || !this.state.description
    //       || !this.state.mailTo  
    //       || !this.state.openingUser
    //       || this.state.clientName.trim() === ""
    //       || this.state.description.trim() === "" 
    //       || this.state.mailTo.trim() === "" 
    //       || this.state.openingUser.trim() === ""){
    //   alert("Preencha todos os campos por favor");
    //   return false;
    // }
    // sendPostRequest(
    //   `${backEndHost}/open`, 
    //   this.state,
    //   (corpo) => {
    //     console.log(corpo);
    //     alert(corpo.message);
    //     window.location.reload();
    //   }
    // );
  }

  handleOnClientNameChange = (selectedOption) => {
    this.setState({ clientName : selectedOption });
    console.log("[ModuloAbrirChamado] - handleOnClientNameChange - State após execução ", this.state);
  }
  
  handleOnMailToChange = (selectedOption) => {
    this.setState({ mailTo : selectedOption });
    console.log("[ModuloAbrirChamado] - handleOnMailToChange - State após execução", this.state);
  }

  handleOpeningUserOnChange(event){
    this.setState({openingUser : event.target.value});
    console.log("[ModuloAbrirChamado] - handleOpeningUserOnChange - State após execução", this.state);
  }

  handleDescriptionOnChange(event){
    this.setState({description : event.target.value});
    console.log("[ModuloAbrirChamado] - handleDescriptionOnChange - State após execução", this.state);
  }

  handleDescriptionOnFocus(event){
    this.setState({isExpandedDesc : true});
  }
  
  handleDescriptionCloseBtn(event){
    event.preventDefault();
    this.setState({isExpandedDesc : false});
  }

  render() {
    return (
      <div className="form-abrir-chamado">
        <form ref={el => (this.form = el)}>
          <label>Clientes</label>
          <Select 
              onChange={this.handleOnClientNameChange}
              options = {clientsList}>
          </Select>

          <label>Email</label>
          <Creatable
            defaultValue={{ value: 'diegopereiracalcada@gmail.com', label: 'diegopereiracalcada@gmail.com' }}
            onChange={this.handleOnMailToChange}
            options={mailToOptions}
            isMulti={true}
          />
          {/* <select name="mailTo"
              value={this.state.mailTo} 
              onChange={this.handleMailToOnChange}>
            <option>tarapi007@gmail.com</option>
            <option>diegopereiracalcada@gmail.com</option>
          </select> */}

          <label>Usuário:</label>
          <input name="openingUser" 
              defaultValue={this.state.openingUser} 
              onBlur={this.handleOpeningUserOnChange}/>
          
          <div className={this.state.isExpandedDesc === true ? "desc-ctnr expanded-desc" : "desc-ctnr"}>
            <label>Descrição:</label>
            <button 
                className={this.state.isExpandedDesc === true ? "btn-close-desc" : "btn-close-desc invisible"}
                onClick={this.handleDescriptionCloseBtn}>
              X
            </button>
            <TextareaAutosize 
                name="description" 
                style={{ minHeight: 100, maxHeight: 240 }}
                defaultValue={this.state.description} 
                onBlur={this.handleDescriptionOnChange}
                onFocus={this.handleDescriptionOnFocus} /> 
          </div>
        </form>
        <button className="btn-confirmar btn-full50" onClick={() => this.send()}>Confirmar</button>
      </div>
    );
  }
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
    console.log("[ModuloFecharChamados] - Carregando chamados do servidor: " + backEndHost);
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
    console.log("[ModuloFecharChamados] - Disparando requisição: ", myRequest);

    fetch(myRequest)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('[ModuloFecharChamados] - Json respondido:', json);
      updateState({chamados : json});
    }).catch((ex) => {
      console.log('[ModuloFecharChamados] - Erro ao parsear. ', ex);
      this.setState({isLoading : false, isInError : true});
    });
    
  }

  tryToCloseOs(chamado){
    console.log("tryToCloseOs invoked");
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

function updateState(toUpdateObject){
  this.setState({ chamados : toUpdateObject.chamados, isLoading : false });
}

class ItemChamado extends React.Component {
  state = {
    response: '',
    show: true
  };

  constructor(props) {
    super(props);
    
    this.state._id = props.chamado._id;
    this.state.osNumber = props.chamado.osNumber;
    this.state.status = props.chamado.status;
    this.state.clientId = props.chamado.clientId;
    this.state.clientName = props.chamado.clientName;
    this.state.openingUser = props.chamado.openingUser;
    this.state.openingDate = props.chamado.openingDate;
    this.state.description = props.chamado.description;
    this.state.comments = props.chamado.comments;
    this.state.mailTo = props.chamado.mailTo;
    this.state.closingDate = props.chamado.closingDate;
    this.state.solution = props.chamado.solution;

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = ()=>{
    console.log("ItemChamado - handleOnClick invoked");
    console.log(this.state);
    this.props.tryToCloseOs(this.state);
  }

  render() {
    return (
      this.state.show ?
        <li className="li-chamado">
          <div className="infs-chamado">
            <input type="hidden" name="clientId" value={this.state.clientId} />
            <p className="os-number">OS-{this.state.osNumber}</p>
            <p className="nome-cliente">{this.state.clientName}</p>
            <p className="desc-chamado">{this.state.description}</p>
          </div>
          <div className="status-chamado">
            <div className="infs-abertura" style={{marginBottom: 10}}>
              <p>Aberto em</p> 
              <p className="dt-abertura"><Moment locale="pt-br" format="DD/MM/YYYY">{this.state.openingDate}</Moment></p>
            </div>
            <div style={{marginLeft: 8}}>
              <button 
                onClick={this.handleOnClick}
                className="waves-effect waves-light btn btn-fechar-chamado">Fechar</button>
            </div>
          </div>
        </li>
        : null
    );
  }
}

class LoadingGif extends React.Component {
  render(){
    return (
      <div className="container-loading">
        <p>Aguarde...</p>
        <img className="loading-img" src={loadingImgSrc} alt="Carregando..." />
      </div>
    )
  }
}

class SimpleModal extends React.Component{
  state = {
    showModal : this.props.showModal,
    osBeingClosed : this.props.osBeingClosed,
    isCloseBtnActive : true,
    isExpandedDesc : false
  }

  constructor(props){
    super(props);
    this.handleDescriptionOnFocus = this.handleDescriptionOnFocus.bind(this);
    this.handleDescriptionCloseBtn = this.handleDescriptionCloseBtn.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps chamado");
      this.setState({
        showModal : nextProps.showModal,
        osBeingClosed : nextProps.osBeingClosed
      });
  }
  
  handleOnConfirmClick = () => {
    if(this.state.isCloseBtnActive){
      console.log("Botão de fechamento de chamado clicado."); 
      this.setState({isCloseBtnActive : false});
      console.log(" State atual do SimpleModal:");
      console.log(this.state);
      
      let osBeingClosed = this.state.osBeingClosed;
      if(!osBeingClosed.osNumber) {
        alert("osnumber nulo");
        return false;
      }
      
      this.sendCloseRequest(osBeingClosed)
      .then(res => {
        if(res.returnCode && res.returnCode == 1){
          alert(`Chamado ${osBeingClosed.osNumber} fechado com sucesso.`);
          window.location.reload();
        } else {
          alert("Erro ao tentar fechar o chamado");
        }
      })
      .catch(err => alert(err));
    }
  }
  
  sendCloseRequest = async (osBeingClosed) => {
    console.log("Enviando solicitação de fechamento para a OS: " + osBeingClosed.osNumber);
    const response = await fetch(`${backEndHost}/close?_id=${osBeingClosed._id}&osNumber=${osBeingClosed.osNumber}&openingUser=${osBeingClosed.openingUser}&mailTo=${osBeingClosed.mailTo}&description=${osBeingClosed.description}&solution=${osBeingClosed.solution}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  handleDescriptionOnFocus(event){
    this.setState({isExpandedDesc : true});
  }
  
  handleDescriptionCloseBtn(event){
    event.preventDefault();
    this.setState({isExpandedDesc : false});
  }

  render(){  
    return (
      this.state.showModal
      ?
      <div className="simple-modal-dimmed-bg">
        <div className="simple-modal-dialog">
          <div className="simple-modal-header">
            <div className="simple-modal-header-infs">
              <p>Fechando OS  {this.state.osBeingClosed.osNumber}</p>
              <p>{this.state.osBeingClosed.description}</p>
            </div>
            <div className="btn-area-close-modal">
              <button 
                  className="close-simple-modal"
                  onClick={() => {this.setState({showModal : false})}}>
                  X
              </button>
            </div>
          </div>
          <div className="simple-modal-body">
            <div className="opening-chamado-container">
              <label>Usuário solicitante</label>
              <input className="opening-user" value={this.state.osBeingClosed.openingUser} onChange={(e) =>{
                  var newOpeningUser =  e.target.value;
                  var newOsBeingClosed = this.state.osBeingClosed;
                  newOsBeingClosed.openingUser = newOpeningUser;
                  this.setState({osBeingClosed : newOsBeingClosed });
                  console.log(this.state);
                }} type="text"/>
              
              <label>Enviar e-mail de fechamento p/ ( , para + )</label>
              <input className="mail-to" value={this.state.osBeingClosed.mailTo}  onChange={(e) =>{
                  var newMailTo =  e.target.value;
                  var newOsBeingClosed = this.state.osBeingClosed;
                  newOsBeingClosed.mailTo = newMailTo;
                  this.setState({osBeingClosed : newOsBeingClosed });
                }} type="text"/>
              
              <div className={this.state.isExpandedDesc === true ? "desc-ctnr expanded-desc" : "desc-ctnr"}>
                <label>Descrição:</label>
                <button 
                    className={this.state.isExpandedDesc === true ? "btn-close-desc" : "btn-close-desc invisible"}
                    onClick={this.handleDescriptionCloseBtn}>
                  X
                </button>
                <textarea 
                    className="solution" 
                    onChange={(e) =>{
                        var newSolution =  e.target.value;
                        var newOsBeingClosed = this.state.osBeingClosed;
                        newOsBeingClosed.solution = newSolution;
                        this.setState({osBeingClosed : newOsBeingClosed });
                    }} 
                    onFocus={this.handleDescriptionOnFocus}>
                </textarea>
              </div>
            </div>
          </div>
          
          <div className="simple-modal-footer">
            <button className={this.state.isCloseBtnActive ? "btn" : "btn btn-desativado"} onClick={this.handleOnConfirmClick}>Confirmar</button>
          </div>
        </div>
      </div>
      :
      null 
    )
  }
}

class ErrorLoadingOrders extends React.Component {
  errorStyle = {
    textAlign: "center",
    marginTop: 60,
    color: "white",
    fontWeight: 700,
    fontSize: 20,
    background: "#ff0000a8",
    padding: "20px 0"
  }

  render(){
    return (
      <div style={this.errorStyle}>
        <p>Erro ao listar os chamados...</p>
        <p>Tente novamente em instantes</p>
      </div>
    )
  }
}

export {App, Modulo};



