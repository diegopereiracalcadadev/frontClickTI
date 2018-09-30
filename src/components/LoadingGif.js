import React from 'react';
import loadingImgSrc from "../imgs/loading-plasma.gif";

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

  export default LoadingGif;