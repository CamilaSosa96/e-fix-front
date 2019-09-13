import React from 'react';
import {withRouter} from 'react-router-dom';

class OrderScreen extends React.Component {

    constructor(props){
        super(props);
        this.goOrder = this.goOrder.bind(this);
    }

    goOrder(){
        this.nextPath("/newOrder");
    }

    nextPath(path) {
        this.props.history.push(path);
      }

    render (){
        return (
            <div>
                <button  className="createOrder" onClick={this.goOrder}> <h1>+ CREAR ORDEN</h1> </button>
            </div>
        )
    }
}

export default withRouter(OrderScreen);