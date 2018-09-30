import React from 'react';
import {backEndHost} from '../App';

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

export default SimpleModal;