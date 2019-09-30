import React from 'react'
import {Button} from '@blueprintjs/core'
import NewOrderForm from '../components/NewOrderForm'
import OrderList from '../components/OrderList'
import NavigationBar from '../components/NavigationBar'
import SearchResult from '../components/SearchResult'

class HomeScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            component: 'home',
            searchString: ""
        }
        this.handleComponent = this.handleComponent.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    
    handleComponent(componentName){
        this.setState({component: componentName})
    }

    handleSearch(string){
        this.setState({component: 'search', searchString: string})
    }

    render(){
        return (
            <div>
                <NavigationBar doSearch={this.handleSearch}/>
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
                <NewOrderForm parentHandler={this.handleComponent}></NewOrderForm>}
                {this.state.component === 'allOrders' && <OrderList/>}
                {this.state.component === 'search' && 
                <SearchResult searchString={this.state.searchString}/>}
            </div>
        )
    }
}

export default HomeScreen;