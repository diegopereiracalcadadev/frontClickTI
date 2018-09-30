import React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import TextareaAutosize from 'react-autosize-textarea';
import {backEndHost} from '../App';
import {sendGetRequest} from '../App';
import {sendPostRequest} from '../App';

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
];

class ModuloAbrirChamado extends React.Component{
    state = {
      clientName : "",
      mailTo : [{value: "diegopereiracalcada@gmail.com", label: "diegopereiracalcada@gmail.com"}],
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
      if(this.state.clientName == ""
          || this.state.mailTo == ""
          || this.state.openingUser == ""
          || this.state.description == ""
          || this.state.clientName.value.trim() === ""
          || this.state.mailTo[0].value.trim() === "" 
          || this.state.description.trim() === "" 
          || this.state.openingUser.trim() === ""){
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