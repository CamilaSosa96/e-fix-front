import React from 'react';

class OrderResult extends React.Component {

    constructor(props){
        super(props)
        this.goToEdit = this.goToEdit.bind(this)
    }

    goToEdit(){
        this.props.changeComp('edit')
    }

    render(){
        return(
            <div className="resbox">
                <h3>{this.props.msj}</h3>
                <button onClick={this.goToEdit}> EDITAR</button>
            </div>
        )
    }
}

export default OrderResult;