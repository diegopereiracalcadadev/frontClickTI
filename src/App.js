import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import ModuloAbrirChamado from './components/ModuloAbrirChamado';
import ModuloFecharChamados from './components/ModuloFecharChamados';
 
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
    if (200 !== response.status) throw Error(body.message);
    if(-1 == body.returnCode){
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
        <Header activeModule={this.state.activeModule} 
            changeAppActiveModule = {this.changeAppActiveModule}/>
        <Body activeModule={this.state.activeModule} />
      </div>
    );
  }
}

export { 
    App,
    Modulo, 
    ModuloAbrirChamado, 
    ModuloFecharChamados,
    backEndHost,
    sendGetRequest,
    sendPostRequest
};



