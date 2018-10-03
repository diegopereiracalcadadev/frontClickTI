import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import {backEndHost} from '../App';
import {sendGetRequest} from '../App';
import {sendPostRequest} from '../App';
import SelectNomeEmpresa from './inputs/SelectNomeEmpresa';
import CreatableMailTo from './inputs/CreatableMailTo';
import InputOpeningUser from './inputs/InputOpeningUser';


class ModuloAbrirChamado extends React.Component{
    state = {
      clientName : "",
      mailTo : [],
      openingUser : "",
      description : "",
      isExpandedDesc : false,
    }
    
    constructor(props){
      super(props);
      this.handleOpeningUserOnChange = this.handleOpeningUserOnChange.bind(this);
      this.handleDescriptionOnChange = this.handleDescriptionOnChange.bind(this);
      this.handleDescriptionOnFocus = this.handleDescriptionOnFocus.bind(this);
      this.handleDescriptionCloseBtn = this.handleDescriptionCloseBtn.bind(this);;
      this.handleOnMailToChange = this.handleOnMailToChange.bind(this);
      this.send = this.send.bind(this);
    }
  
    send() {
      console.log(this.state);
      // validadeFields(); // TODO: funcao universal de vald
      if ( this.state.clientName == "" || this.state.clientName.value.trim() === ""
          || this.state.mailTo == "" || this.state.mailTo[0].value.trim() === "" 
          || this.state.openingUser == "" || this.state.openingUser.trim() === ""
          || this.state.description == "" || this.state.description.trim() === "" ){
        console.log("Campos obrigatórios vazios. Confirmação de abertura cancelada.");
        alert("Preencha todos os campos por favor");
        return false;
      } else {
        sendPostRequest(
          `${backEndHost}/open`, 
          this.state,
          (corpo) => {
            console.log(corpo);
            alert(corpo.message);
            window.location.reload();
          }
        );
      }
    }
  
    handleOnClientNameChange = (selectedOption) => {
      console.log(`[ handleOnClientNameChange ] invoked. `);
      this.setState(
        { clientName : selectedOption }, 
        ()=>{console.log("[ModuloAbrirChamado] - handleOnClientNameChange - State após execução", this.state);}
      );
    }
    
    handleOnMailToChange = (selectedOption) => {
      console.log("[ handleOnMailToChange ] invoked. ");
      this.setState(
          { mailTo : selectedOption }, 
          ()=>{console.log("[ModuloAbrirChamado] - handleOnMailToChange - State após execução", this.state);}
        );
        
      }
  
      handleOpeningUserOnChange = (event) => {
        console.log(`[ handleOpeningUserOnChange ] invoked. `);
        this.setState(
          { openingUser : event.target.value }, 
          ()=>{console.log("[ModuloAbrirChamado] - handleOpeningUserOnChange - State após execução", this.state);}
        );
      }
  
      handleDescriptionOnChange = (event) => {
        console.log(`[ handleDescriptionOnChange ] invoked. `);
        this.setState(
          { description : event.target.value },
          ()=>{console.log("[ModuloAbrirChamado] - handleDescriptionOnChange - State após execução", this.state);}
        );
      }
      
      handleDescriptionOnFocus(event){
        console.log(`[ handleDescriptionOnFocus ] invoked. `);
        this.setState({isExpandedDesc : true});
      }
      
      handleDescriptionCloseBtn(event){
        console.log(`[ handleDescriptionCloseBtn ] invoked. `);
        event.preventDefault();
        this.setState({isExpandedDesc : false});
    }
  
    render() {
      return (
        <div className="form-abrir-chamado">
          <form ref={el => (this.form = el)}>
            <SelectNomeEmpresa 
                handleOnChange={this.handleOnClientNameChange}
                defaultValue={this.state.clientName} />
  
            <CreatableMailTo 
              handleOnChange={this.handleOnMailToChange}
              defaultValue={this.state.clientName} />
  
            <InputOpeningUser 
                openingUser={this.state.openingUser} 
                handleOnChange={this.handleOpeningUserOnChange} />
            
            <div className={this.state.isExpandedDesc === true ? "desc-ctnr expanded-desc" : "desc-ctnr"}>
              <label>Descrição:</label>
              <button 
                  className={this.state.isExpandedDesc === true ? "btn-close-desc" : "btn-close-desc invisible"}
                  onClick={this.handleDescriptionCloseBtn}>X</button>
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


  
  export default ModuloAbrirChamado;