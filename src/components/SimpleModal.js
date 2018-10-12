import React from 'react';
import {backEndHost} from '../App';
import InputOpeningUser from './inputs/InputOpeningUser';
import CreatableMailTo from './inputs/CreatableMailTo';
import {sendPostRequest} from '../App';

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
      this.handleOpeningUserOnChange = this.handleOpeningUserOnChange.bind(this);
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
        
        sendPostRequest(
          `${backEndHost}/close`, 
          osBeingClosed,
          (corpo) => {
            alert(`Chamado ${osBeingClosed.osNumber} fechado com sucesso.`);
            window.location.reload();
          }
        );
      }
    }
    

    handleDescriptionOnFocus(event){
      this.setState({isExpandedDesc : true});
    }
    
    handleDescriptionCloseBtn(event){
      event.preventDefault();
      this.setState({isExpandedDesc : false});
    }

    handleOpeningUserOnChange(e){
      console.log("[ handleOpeningUserOnChange ] invoked.");
      var newOpeningUser =  e.target.value;
      var newOsBeingClosed = this.state.osBeingClosed;
      newOsBeingClosed.openingUser = newOpeningUser;
      this.setState({osBeingClosed : newOsBeingClosed });
      console.log(this.state);
    }

    handleOnMailToChange = (selectedOption) => {
      console.log("[ handleOnMailToChange ] invoked. ", selectedOption);

      var newOsBeingClosed = this.state.osBeingClosed;
      newOsBeingClosed.mailTo = selectedOption;

      this.setState(
          { osBeingClosed : newOsBeingClosed }, 
          ()=>{console.log("[ModuloAbrirChamado] - handleOnMailToChange - State após execução", this.state);}
      );
        
    }
  
    handleOnDescriptionChange = (e) =>{
      var newSolution =  e.target.value;
      var newOsBeingClosed = this.state.osBeingClosed;
      newOsBeingClosed.solution = newSolution;
      this.setState({osBeingClosed : newOsBeingClosed });
    }

    render(){  
      return (
        this.state.showModal
        ?
        <div className="simple-modal-dimmed-bg">
          <div className="simple-modal-dialog">
            <div className="simple-modal-header">
              <div className="simple-modal-header-infs">
                <p>Fechando OS  {this.state.osBeingClosed.osNumber} - {this.state.osBeingClosed.clientName.label}</p>
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
              <InputOpeningUser 
                defaultValue={this.state.osBeingClosed.openingUser} 
                handleOnChange={this.handleOpeningUserOnChange} />
              <CreatableMailTo className="mail-to" 
                  defaultValue={this.state.osBeingClosed.mailTo} 
                  handleOnChange={this.handleOnMailToChange}
                  />
                
                <div className={this.state.isExpandedDesc === true ? "desc-ctnr expanded-desc" : "desc-ctnr"}>
                  <label>Execução:</label>
                  <button 
                      className={this.state.isExpandedDesc === true ? "btn-close-desc" : "btn-close-desc invisible"}
                      onClick={this.handleDescriptionCloseBtn}>
                    X
                  </button>
                  <textarea 
                      className="solution" 
                      onChange={this.handleOnDescriptionChange}
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