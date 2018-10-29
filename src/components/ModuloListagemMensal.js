import React from 'react';
import {sendGetRequest} from '../App';
import {sendPostRequest} from '../App';
import {backEndHost} from '../App';

function fazParte(date, tdDay){
    tdDay = "" + tdDay;
    if(tdDay.length === 1){
        tdDay = "0" + tdDay;
    }
    console.log("faz parte invoked");
    if(date.indexOf(tdDay) === 8){
        return true;
    } else {
        return false;
    }
}

class Card extends React.Component{
    render(){
        return (
            <div className={"card " + this.props.clientName.value} >
                <div className="card-title">
                    <p>{this.props.clientName.label}</p>
                </div>
                <div className="card-content">
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    }
}

class TRQuinzena extends React.Component{
    state = {
        chamadosList : []
    }

    componentDidMount(){
        sendGetRequest(
            `${backEndHost}/getCloseds`, 
            (corpo) => {
              console.log("[TRQuinzena] - Post retornado com sucesso", corpo);  
              this.setState({chamadosList : corpo});
            }
          );
    }

    render(){
        let firstDay;
        let lastDay;

        if(this.props.quinzena === "1"){
            firstDay = 1;
            lastDay = 15;
        } else {
            firstDay = 16;
            lastDay = 31;
        }

        let tds = [];
        for(let i = firstDay; i <= lastDay; i++){
            tds.push(
                <td chave={i}>
                    {this.state.chamadosList.map((item) => {
                        if(fazParte(item.closingDate, i)){
                            return <Card clientName={item.clientName} 
                                        description={item.description} />
                        } else {
                            return null;
                        }
                    })} 
                </td>
            );         
        }
        return (
            <tr>
                { tds }
            </tr>
        );
    }
}

class TableQuinzena extends React.Component{
   
    render(){
        let firstDay;
        let lastDay;
        
        if(this.props.quinzena === "1"){
            firstDay = 1;
            lastDay = 15;
        } else {
            firstDay = 16;
            lastDay = 31;
        }

        let cabecalhos = [];
        for(let i = firstDay; i <= lastDay; i++){
           cabecalhos.push( <th key={i} chave={i}>{i}</th>);
        }
      
        return (
            <div>
                 <table className="tabela-chamados">
                    <thead className="headers-chamados">
                        <tr>
                            { cabecalhos }
                        </tr>
                    </thead>
                    <tbody>
                           <TRQuinzena quinzena={this.props.quinzena} />
                    </tbody>
                </table>
            </div>
        );
    }
}

class ModuloListagemMensal extends React.Component{
    
    render(){
        
        return(
            <div>
                <TableQuinzena quinzena="1" />
                <TableQuinzena quinzena="2"  />
            </div>
        )
    }
}


export default ModuloListagemMensal;