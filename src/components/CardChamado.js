import React from 'react';

class CardChamado extends React.Component{

    render(){
        return(
            <div class="card">
                <div class="card-title tema2">
                    <p>{this.props.title}</p>
                </div>
                <div class="card-content">
                    <p>{this.props.desc}</p>
                </div>
            </div>
        )
    }

}