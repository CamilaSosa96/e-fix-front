import React from 'react'
import ToolBar from '../components/ToolBar'
import HomeComponents from '../components/HomeComponents'
import NewOrder from '../components/NewOrder'
import Message from './Message'
import '../styles/HomeScreen.css'

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
            <ToolBar handleComponent={this.handleComponent}/>
            {(this.state.component === 'home') && <HomeComponents handleComponent={this.handleComponent}/>}
            {(this.state.component === 'createorder') && <NewOrder handleComponent={this.handleComponent}/>}
            {(this.state.component === 'message') && <Message handleComponent={this.handleComponent}/>}
            </div>
        )
    }
}

export default HomeScreen;