import React from 'react';

function fazParte(date, tdDay){
    tdDay = "" + tdDay;
    if(tdDay.length === 1){
        tdDay = "0" + tdDay;
    }
    console.log("faz parte invoked");
    if(date.indexOf(tdDay) === 0){
        return true;
    } else {
        return false;
    }
}

class Card extends React.Component{
    render(){
        return (
            <div className={"card " + this.props.clientName} >
                <div className="card-title">
                    <p>{this.props.clientName}</p>
                </div>
                <div className="card-content">
                    <p>{this.props.desc}</p>
                </div>
            </div>
        );
    }
}

class TRQuinzena1 extends React.Component{
    state = {
        chamadosList : [
            {
                clientName: "MM",
                desc : "Cards for display in portfolio style material design by Google.",
                date : "01/10/218"
            },
            {
                clientName: "clientNameTest2",
                desc : "Second big description lorem i´sum.",
                date : "01/10/218"
            },
            {
                clientName: "clientNameTest2",
                desc : "hamachi ferrado",
                date : "02/10/218"
            },
            {
                clientName: "clientNameTest3",
                desc : "hamachi ferrado",
                date : "03/10/218"
            }
        ]
    }

    render(){
        let tds = [];
        for(let i = 1; i <= 15; i++){
            tds.push(
                <td  >
                    {i}
                    {this.state.chamadosList.map((item) => {
                        if(fazParte(item.date, i)){
                            return <Card clientName={item.clientName} 
                                        desc={item.desc} />
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

class TableQuinzena1 extends React.Component{
   
    render(){
        let cabecalhos = [];
        for(let i=1; i<=15; i++){
           cabecalhos.push( <th key={i} >{i}</th>);
        }
      
        return (
            <div>
                 <table className="tabela-chamados quinzena-1">
                    <thead className="headers-chamados">
                        <tr>
                            { cabecalhos }
                        </tr>
                    </thead>
                    <tbody>
                           <TRQuinzena1 />
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
               <TableQuinzena1 />
            </div>
        )
    }
}


export default ModuloListagemMensal;