import React from 'react'
import {Button} from '@blueprintjs/core'
import NewOrderForm from '../components/NewOrderForm'

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
                {this.state.component === 'home' &&
                <div>
                    <Button onClick={() => this.handleComponent('newOrder')}> Crear orden </Button>
                    <Button> Ver todas las ordenes </Button>
                </div>
                }
                {this.state.component === 'newOrder' &&
                <div>
                    <NewOrderForm parentHandler={this.handleComponent}></NewOrderForm>
                </div>
                }
            </div>
        )
    }
}

export default HomeScreen;