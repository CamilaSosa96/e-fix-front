import React from 'react';

class HomeComponents extends React.Component {

    constructor(props){
        super(props)
        this.handleParentComponent = this.handleParentComponent.bind(this)
    }

    handleParentComponent(){
        this.props.handleComponent('createorder');
    }

    render (){
        return (
            <div>
                <button className="createOrder" onClick={this.handleParentComponent}> <h1>+ CREAR ORDEN</h1> </button>
            </div>
        )
    }
}

export default HomeComponents;