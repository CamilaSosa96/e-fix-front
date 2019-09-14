import React from 'react';
import {withRouter} from 'react-router-dom';

class OrderResult extends React.Component {

    nextPath(path) {
        this.props.history.push(path);
      }

    render(){
        return(
            <div className="resbox">
                <h3>{this.props.msj}</h3>
                <button onClick={() => this.nextPath('/editOrder')}> EDITAR</button>
            </div>
        )
    }
}

export default withRouter(OrderResult);