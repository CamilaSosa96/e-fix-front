import React from 'react'
import {searchOrders} from '../efixService'
import OrderResultBox from '../components/OrderBox'
import { InputGroup } from '@blueprintjs/core'

class SearchResult extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            orders: [],
            searchString: this.props.searchString
        }
        this.cargarOrdenes = this.cargarOrdenes.bind(this)
    }

    componentDidMount(){
        this.cargarOrdenes()
    }

    cargarOrdenes(){
        const string = this.state.searchString
        const orderBoxes = []
        searchOrders(string, (err, result)=>{
            result.forEach((elem) => {
                const box = <OrderResultBox
                    update = {this.update}
                    key={elem.id}
                    id = {elem.id}
                    name = {elem.name}
                    dni = {elem.dni}
                    email = {elem.email}
                    type = {elem.type}
                    brand = {elem.brand}
                    model = {elem.model}
                    problem = {elem.problem}
                    diagnosis = {elem.diagnosis}
                    budget = {elem.budget}
                    state = {elem.state}
                    lastUpdateDate = {elem.lastUpdateDate}
                />
                orderBoxes.push(box)
        })
        this.setState({
            orders: orderBoxes,
            isLoaded: true
       })
    }) 
    }

    render(){
        if(this.state.isLoaded){
            return(
                <div>
                    <h1>Resultados de búsquedas</h1>
                    
                        {this.state.orders}
                    <InputGroup
                        type='hidden'
                        value={this.state.searchString}
                        onChange={this.cargarOrdenes}
                    ></InputGroup>
                </div>
            )
        } else {
            return(
                <h1>Cargando...</h1>
            )
        }
        
    }
}

export default SearchResult