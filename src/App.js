import React from 'react';
import {$, jQuery} from 'jquery';
import {Modal} from 'react-materialize';
import './App.css';
import TextareaAutosize from 'react-autosize-textarea';
import logoimg from "./imgs/logo.jpg";
import loadingImgSrc from "./imgs/loading-plasma.gif";
import axios from 'axios';
import Moment from 'react-moment';
 
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
    activeModule : Modulo.CLOSEOS
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

class ModuloAbrirChamado extends React.Component{
  state = {
    chamado : {
      clientName : "Capi",
      mailTo : "diegopereiracalcada@gmail.com"
    },
    expandedDesc : false
  }

  constructor(props){
    super(props);
    this.handleClientNameOnChange = this.handleClientNameOnChange.bind(this);
    this.handleMailToOnChange = this.handleMailToOnChange.bind(this);
    this.handleOpeningUserOnChange = this.handleOpeningUserOnChange.bind(this);
    this.handleDescriptionOnChange = this.handleDescriptionOnChange.bind(this);
    this.handleDescriptionOnFocus = this.handleDescriptionOnFocus.bind(this);
    this.handleDescriptionCloseBtn = this.handleDescriptionCloseBtn.bind(this);
    this.send = this.send.bind(this);
  }

  send() {
    if(!this.state.chamado.clientName 
          || !this.state.chamado.description
          || !this.state.chamado.mailTo  
          || !this.state.chamado.openingUser
          || this.state.chamado.clientName.trim() === ""
          || this.state.chamado.description.trim() === "" 
          || this.state.chamado.mailTo.trim() === "" 
          || this.state.chamado.openingUser.trim() === ""){
      alert("Preencha todos os campos por favor");
      console.log("this.state: ", this.state);
      return false;
    }
    sendPostRequest(
      `${backEndHost}/open`, 
      this.state.chamado,
      (corpo) => {
        console.log(corpo);
        alert(corpo.message);
        window.location.reload();
      }
    );
  }

  handleClientNameOnChange(event) {
    let newChamado = this.state.chamado;
    newChamado.clientName = event.target.value;
    this.setState({chamado : newChamado});
    console.log("[ModuloAbrirChamado] - state DEPOIS de trocar clientName:", this.state);
  }
  
  handleMailToOnChange(event){
    let newChamado = this.state.chamado;
    newChamado.mailTo = event.target.value;
    this.setState({chamado : newChamado});
    console.log("[ModuloAbrirChamado] - state DEPOIS de trocar mailTo:", this.state);
  }

  handleOpeningUserOnChange(event){
    let newChamado = this.state.chamado;
    newChamado.openingUser = event.target.value;
    this.setState({chamado : newChamado});
    console.log("[ModuloAbrirChamado] - state DEPOIS de trocar openingUser:", this.state);
  }

  handleDescriptionOnChange(event){
    let newChamado = this.state.chamado;
    newChamado.description = event.target.value;
    this.setState({chamado : newChamado});
    console.log("[ModuloAbrirChamado] - state DEPOIS de trocar description:", this.state);
  }

  handleDescriptionOnFocus(event){
    this.setState({expandedDesc : true});
  }
  
  handleDescriptionCloseBtn(event){
    event.preventDefault();
    this.setState({expandedDesc : false});
  }

  render() {
    return (
      <div class="form-abrir-chamado">
        <form ref={el => (this.form = el)}>
          <label>Clientes</label>
          <select name="clientName" 
              value={this.state.chamado.clientName} 
              onChange={this.handleClientNameOnChange}>
            <option>Amontenegro</option>
            <option>Bibi Barra</option>
            <option>Bibi Campo Grande</option>
            <option>Bibi Metro</option>
            <option>Bibi Tijuca</option>
            <option>Capi</option>
            <option>Contarq</option>
            <option>GlobalCafe</option>
            <option>Lyon Construtora</option>
            <option>MM</option>
            <option>Mundo Verde</option>
            <option>Pet Shop</option>
            <option>Quality Fisio</option>
            <option>Romarfel</option>
            <option>UsaFlex</option>
          </select>

          <label>Email</label>
          <select name="mailTo"
              value={this.state.chamado.mailTo} 
              onChange={this.handleMailToOnChange}>
            <option>tarapi007@gmail.com</option>
            <option>diegopereiracalcada@gmail.com</option>
          </select>

          <label>Usuário:</label>
          <input name="openingUser" 
              defaultValue={this.state.chamado.openingUser} 
              onBlur={this.handleOpeningUserOnChange}/>
          
          <div className={this.state.expandedDesc === true ? "desc-cont expanded-desc" : "desc-cont"}>
            <label>Descrição:</label>
            <button 
                className={this.state.expandedDesc === true ? "btn-close-desc" : "btn-close-desc invisible"}
                onClick={this.handleDescriptionCloseBtn}>
            X
            </button>
            <TextareaAutosize 
                name="description" 
                style={{ minHeight: 100, maxHeight: 240 }}
                defaultValue={this.state.chamado.description} 
                onBlur={this.handleDescriptionOnChange}
                onFocus={this.handleDescriptionOnFocus} /> 
          </div>
        </form>
        <button class="btn-full50" onClick={() => this.send()}>Confirmar</button>
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
    expandedDesc : false
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
    this.setState({expandedDesc : true});
  }
  
  handleDescriptionCloseBtn(event){
    event.preventDefault();
    this.setState({expandedDesc : false});
  }

  render(){  
    return (
      this.state.showModal
      ?
      <div className="simple-modal-dimmed-bg">
        <div className="simple-modal-dialog">
          <div class="simple-modal-header">
            <div class="simple-modal-header-infs">
              <p>Fechando OS  {this.state.osBeingClosed.osNumber}</p>
              <p>{this.state.osBeingClosed.description}</p>
            </div>
            <div class="btn-area-close-modal">
              <button 
                  class="close-simple-modal"
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
              
              <div className={this.state.expandedDesc === true ? "desc-cont expanded-desc" : "desc-cont"}>
                <label>Descrição:</label>
                <button 
                    className={this.state.expandedDesc === true ? "btn-close-desc" : "btn-close-desc invisible"}
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

export default App;



