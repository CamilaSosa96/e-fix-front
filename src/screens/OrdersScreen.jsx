import React from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import {searchOrders, getAllOrders} from '../efixService'
import OrderResultBox from '../components/OrderBox'
import NavigationBar from '../components/NavigationBar'
import { Button, Icon, Spinner, Alert } from '@blueprintjs/core'

class OrderScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            orders: [],
            search: this.props.match.params.searchString,
            isLoaded: false,
            goHome: false,
            alert: false,
            msg: ''
        }
        this.createBoxesFromArray = this.createBoxesFromArray.bind(this)
    }

    componentDidMount(){
        let string = this.state.search
        if(string === undefined){
            getAllOrders((err, result) => {
               if(err) this.setState({msg: 'No se ha podido conectar al back-end', alert: true})
               else this.setState({orders: this.createBoxesFromArray(result), isLoaded: true})
            })        
        } else {
            searchOrders(string, (err, result) =>{
                if(err) this.setState({msg: 'No se ha podido conectar al back-end', alert: true})
               else this.setState({orders: this.createBoxesFromArray(result), isLoaded: true})     
            })
        }
    }

    createBoxesFromArray(orders){
        const orderBoxes = []
        orders.forEach((elem) => {
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
        return orderBoxes
    }
    
    render(){
        const backButton = () => {
            return(
                <Button 
                    style={{marginTop: '30px', marginBottom: '30px', backgroundColor: '#BF83DA'}}
                    icon={<Icon icon='undo' iconSize='15'/>}
                    onClick={() => this.setState({goHome: true})}>
                    Volver
                </Button>
            )
        }
        return(
            <div>
                <Alert isOpen={this.state.alert}
                    onClose={()=>{this.setState({goHome: true})}}>
                    {this.state.msg}
                </Alert>
                {this.state.goHome && <Redirect to='/home'/>}
                {this.state.isLoaded ? 
                    <div>
                        {this.state.goHome && <Redirect to='/home'/>}
                        <NavigationBar/>
                        <div style={{textAlign: 'center'}}>
                            {this.state.orders.length === 0 ? 
                                <div style={{marginTop: '150px'}}>
                                    <Icon icon='error' iconSize='100' intent='danger'/>
                                    <h2>¡Oops! No se han encontrado resultados</h2>
                                    {backButton()}
                                </div> 
                                :
                                <div style={{display: 'inline'}}>
                                    <h1>Resultados de búsqueda</h1>
                                    <div style={{width: '500px',
                                                margin: '0 auto'}}>
                                        {this.state.orders}
                                    </div>
                                    {backButton()}
                                </div>
                            }
                        </div>
                    </div> 
                    : 
                    <div>
                        <NavigationBar/>
                        <div style={{position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'}}>   
                            <Spinner size='160'/>
                        </div>
                    </div> 
                }
            </div>
        )
    }
}

    export default withRouter(OrderScreen)