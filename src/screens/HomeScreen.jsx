import React from 'react'

class HomeScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            component: 'home'
        }
        this.handleComponent = this.handleComponent.bind(this)
    }
    
    handleComponent(componentName){
        this.setState({
            component: componentName
        })
    }

    render(){
        return (
            <div>
                <h1>Hola estas en home!</h1>
            </div>
        )
    }
}

export default HomeScreen;