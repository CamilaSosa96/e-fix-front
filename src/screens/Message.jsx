import React from 'react'

class Message extends React.Component{

    constructor(props){
        super(props);
        this.handleParentComponent = this.handleParentComponent.bind(this)
    }

    handleParentComponent(){
        this.props.handleComponent('home');
    }
  
    render(){
        return(
            <div>
                <h2 className="msj">La orden fue creada satisfactoriamente!</h2>
                <button  className="acceptbutton" onClick={this.handleParentComponent}> <h3>ACEPTAR</h3> </button>
            </div>
        )
    }

}

export default Message;