import React from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import {searchOrders, getAllOrders, isAuthored} from '../efixService'
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
            goLogin: false,
            alert: false,
            msg: '',
            title: ''
        }
        this._isMounted = false
        this.createBoxesFromArray = this.createBoxesFromArray.bind(this)
    }

    componentDidMount(){
        this._isMounted = true
        {this._isMounted &&

            isAuthored((error, _response) => {
                if(error){this.setState({goLogin: true})}
            })
            let string = this.state.search
            if(string === undefined){
                getAllOrders((err, result) => {
                   if(err) this._isMounted && this.setState({msg: 'No se ha podido conectar al back-end', alert: true})
                   else this._isMounted && this.setState({orders: this.createBoxesFromArray(result), 
                                                        isLoaded: true,
                                                        title: 'Todas las ordenes'})
                })        
            } else {
                searchOrders(string, (err, result) =>{
                    if(err) this._isMounted && this.setState({msg: 'No se ha podido conectar al back-end', alert: true})
                   else this._isMounted && this.setState({orders: this.createBoxesFromArray(result), 
                                                        isLoaded: true, 
                                                        title: 'Resultados de búsqueda'})     
                })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false
     }

    createBoxesFromArray(orders){
        const orderBoxes = []
        orders.forEach((elem) => {
            const box = <OrderResultBox
                update = {this.update}
                key={elem.id}
                id = {elem.id}
                user = {elem.user}
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
                    style={{color: 'white', 
                           marginTop: '30px', 
                           marginBottom: '30px', 
                           backgroundColor: '#39A1D2'}}
                    icon={<Icon style={{color: 'white'}} icon='undo' iconSize='15'/>}
                    minimal='true'
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
                {this.state.goLogin && <Redirect to='/login'/>}
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
                                    <h1>{this.state.title}</h1>
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