import React from 'react';
import {withRouter} from 'react-router-dom';

class ApprovalScreen extends React.Component {

    render(){
        return(
            <div>
                <h1>Bienvenida Camila!</h1>
                <h2>Su producto: Samsung Galaxy J1 Mini</h2>
                <h2>presenta: Falla en el botón de encendido</h2>
                <h2>Su reparación costaría 750$</h2>
                <h2>Desea aprobar la reparación?</h2>
                <button onClick={console.log("ResultScreen3")}> <h3>ACEPTAR</h3> </button>
                <button onClick={console.log("ResultScreen4")}> <h3>RECHAZAR</h3> </button>
            </div>
        )
    }
}

export default ApprovalScreen;