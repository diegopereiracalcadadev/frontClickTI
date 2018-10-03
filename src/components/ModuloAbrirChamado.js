import React from 'react';
import Creatable from 'react-select/lib/Creatable';
import TextareaAutosize from 'react-autosize-textarea';
import {backEndHost} from '../App';
import {sendGetRequest} from '../App';
import {sendPostRequest} from '../App';
import SelectNomeEmpresa from './inputs/SelectNomeEmpresa';

const mailToOptions = [
  { value: 'diegopereiracalcada@gmail.com', label: 'diegopereiracalcada@gmail.com' },
  { value: 'tarapi007@gmail.com', label: 'tarapi007@gmail.com' }
];



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
      this.handleDescriptionCloseBtn = this.handleDescriptionCloseBtn.bind(this);
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
      this.setState(
        { clientName : selectedOption }, 
        ()=>{console.log("[ModuloAbrirChamado] - handleOnClientNameChange - State após execução", this.state);}
      );
    }
    
    handleOnMailToChange = (selectedOption) => {
      this.setState(
          { mailTo : selectedOption }, 
          ()=>{console.log("[ModuloAbrirChamado] - handleOnMailToChange - State após execução", this.state);}
      );
    }
  
    handleOpeningUserOnChange = (event) => {
      this.setState(
          { openingUser : event.target.value }, 
          ()=>{console.log("[ModuloAbrirChamado] - handleOpeningUserOnChange - State após execução", this.state);}
      );
    }
  
    handleDescriptionOnChange = (event) => {
      this.setState(
          { description : event.target.value },
          ()=>{console.log("[ModuloAbrirChamado] - handleDescriptionOnChange - State após execução", this.state);}
      );
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
            <SelectNomeEmpresa 
                onChange={this.handleOnClientNameChange}
                defaultValue={this.state.clientName} />
  
            <label>Email</label>
            <Creatable
              defaultValue={this.state.mailTo} 
              onChange={this.handleOnMailToChange}
              options={mailToOptions}
              isMulti={true}
            />
  
            <label>Usuário:</label>
            <input name="openingUser" 
                defaultValue={this.state.openingUser} 
                onBlur={this.handleOpeningUserOnChange}/>
            
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