import React from 'react'
import NewOrderForm from '../subscreens/NewOrderForm'
import OrderList from '../subscreens/OrderList'
import NavigationBar from '../components/NavigationBar'
import SearchResult from '../subscreens/SearchResult'
import HomeOptions from '../subscreens/HomeOptions'

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
        this.setState({component: ''})
        this.setState({component: 'search', searchString: string})
    }

    render(){
        return (
            <div>
                <NavigationBar doSearch={this.handleSearch} handleComponent={this.handleComponent}/>
                {this.state.component === 'home' && <HomeOptions handleComponent={this.handleComponent}/>}
                {this.state.component === 'newOrder' && <NewOrderForm parentHandler={this.handleComponent}/>}
                {this.state.component === 'allOrders' && <OrderList/>}
                {this.state.component === 'search' && <SearchResult searchString={this.state.searchString}/>}
            </div>
        )
    }
}

export default HomeScreen;