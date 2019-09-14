import React from 'react'
import {withRouter} from 'react-router-dom';

class Message extends React.Component{

    constructor(props){
        super(props);
        this.volver = this.volver.bind(this);
    }

    volver(){
        this.nextPath("/home");
        }

    nextPath(path) {
        this.props.history.push(path);
      }

    render(){
        return(
            <div>
                <h1>Orden Creada</h1>
                <button  className="acceptbutton" onClick={this.volver}> <h3>ACEPTAR</h3> </button>
            </div>
        )
    }

}

export default withRouter(Message);