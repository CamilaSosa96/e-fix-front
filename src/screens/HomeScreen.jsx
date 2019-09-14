import React from 'react'
import ToolBar from '../components/ToolBar'
import HomeComponents from '../components/HomeComponents'
import '../styles/HomeScreen.css'
import NewOrder from '../components/NewOrder'

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
            {(this.state.component === 'createorder') && <NewOrder/>}
            </div>
        )
    }
}

export default HomeScreen;