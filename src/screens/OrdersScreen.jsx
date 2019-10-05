import React from 'react'
import { Redirect } from "react-router-dom";
import {searchOrders, getAllOrders} from '../efixService'
import OrderResultBox from '../components/OrderBox'
import NavigationBar from '../components/NavigationBar'
import { Button } from '@blueprintjs/core'
import { withRouter } from 'react-router'

class OrderScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            orders: [],
            search: this.props.match.params.searchString,
            goHome: false
        }
    }

    componentDidMount(){
        let string = this.state.search
        const orderBoxes = []
        if(string === undefined){
            getAllOrders((err, result) => {
                const orderBoxes = []
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
        } else {
            searchOrders(string, (err, result) =>{
                result.forEach((elem) =>{
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
                this.setState({orders: orderBoxes,isLoaded: true})
            })
            
        }
    }
    

    

    render(){
        if(this.state.isLoaded){
            return(
                
                <div>
                    {this.state.goHome && <Redirect to="/home"/>}
                    <NavigationBar/>
                    <h1>Resultados de búsquedas</h1>
                    <Button onClick={() => this.setState({goHome: true})}>Volver</Button>
                        {this.state.orders}
                </div>
            )
        } else {
            return(
                <h1>Cargando...</h1>
            )
        }
        
    }
    }

    export default withRouter(OrderScreen)