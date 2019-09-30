import React from 'react'
import {Button, Navbar} from '@blueprintjs/core'
import NewOrderForm from '../components/NewOrderForm'
import OrderList from '../components/OrderList'

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
                <Navbar style={{backgroundColor: '#5B1790',
                                height: '70px'}}>
                    <img src='../efixlogo.png' 
                        alt='E-FIX'
                        style={{width:'10%',
                                position: 'absolute', 
                                top: '50%', 
                                transform: 'translate(0,-50%)'}}
                        onClick={()=> this.handleComponent('home')}>  
                    </img>
                </Navbar>
                {this.state.component === 'home' &&
                <div style={{position: 'absolute', 
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)'}}>
                    <Button onClick={() => this.handleComponent('newOrder')}
                            style={{marginRight: '20px'}}
                            intent='success'> 
                        <h1>CREAR ORDEN</h1> 
                    </Button>
                    <Button onClick={() => this.handleComponent('allOrders')}
                            intent='primary'> 
                        <h1>VER TODAS LAS ORDENES</h1> 
                    </Button>
                </div>
                }
                {this.state.component === 'newOrder' &&
                <div>
                    <NewOrderForm parentHandler={this.handleComponent}></NewOrderForm>
                </div>
                }
                {this.state.component === 'allOrders' &&
                <div>
                    <OrderList></OrderList>
                </div>
                }
            </div>
        )
    }
}

export default HomeScreen;