import React from 'react'
import {Card, Elevation, Button, Dialog, Tag} from '@blueprintjs/core'
import {updateState, loadBudget} from '../efixService'
import {stateNameTranslator} from '../handlers/StateStyleHandler'
import OBDStateChange from './OBDStateChange'
import OBDInformation from './OBDInformation'
import OBDLoadBudget from './OBDLoadBudget'

class OrderResultBox extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            info: false,
            editState: false,
            budgetLoad: false,
            productState: stateNameTranslator(this.props.state),
            lastUpdate: this.props.lastUpdateDate
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateState = this.updateState.bind(this)
        this.closeStateDialog = this.closeStateDialog.bind(this)
        this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this)
        this.handleBudget = this.handleBudget.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    updateState(rawStateValue){
        updateState(this.props.id, rawStateValue, (_response) =>{
            this.setState({
                editState: false, 
                productState: stateNameTranslator(rawStateValue),
                lastUpdate: new Date().toLocaleString()
            })
        })
    }

    closeStateDialog(){
        this.setState({editState: false, budgetLoad: false})
    }

    stateInfo(){
        return ({
            state: this.state.productState,
            date: this.state.lastUpdate
        })
    }

    handleOrderStatusChange(rawStateValue){
        this.setState({editState: false, productState: stateNameTranslator(rawStateValue)})
        this.updateState(rawStateValue)
    }

    handleBudget(diagnosis, budget){
        loadBudget(this.props.id, diagnosis, budget, (_result)=> {
            this.setState({budgetLoad: false})
        })
    }

    render(){
        return (
            <div>
                <Dialog isOpen={this.state.info} onClose={()=> this.setState({info: false})}>
                   <OBDInformation orderInfo ={this.props} 
                                    stateInfo={this.state.productState}
                                    dateInfo={this.state.lastUpdate}                
                    />
                </Dialog>
                <Dialog isOpen={this.state.editState} onClose={()=> this.setState({editState: true})}>      
                    <OBDStateChange orderInfo = {this.props}
                                    handleChange = {this.handleChange}
                                    updateState={this.updateState}
                                    closeStateDialog={this.closeStateDialog}
                                    handleOrderStatusChange = {this.handleOrderStatusChange}
                    />
                </Dialog>
                <Dialog isOpen={this.state.budgetLoad} onClose={()=> this.setState({budgetLoad: false})}>
                    <OBDLoadBudget orderInfo = {this.props}
                                    handleBudget = {this.handleBudget}
                                    closeStateDialog={this.closeStateDialog}
                    />
                </Dialog>
                <Card elevation={Elevation.TWO} 
                    interactive='true'
                    style={{width: '500px', 
                            height: '150px', 
                            marginBottom: '30px'}}>
                    <div>
                        <div style={{display: 'inline-block', marginRight: '0px', textAlign: 'left'}}>
                            <div>
                                <b>{this.props.brand} {this.props.model}</b>
                            </div>
                            <div>
                                {this.props.name} 
                            </div>
                            <div>
                                <Tag fill='true' round='true'>
                                    {this.state.productState}
                                </Tag>
                            </div>    
                        </div> 
                        <div style={{display: 'inline-block'}}>  
                            <div>
                                <Button style={{marginRight: 'auto 0'}}
                                        onClick={()=> this.setState({info: true})}>
                                        Ver Información
                                </Button>
                            </div>
                            <div>
                                <Button onClick={()=> this.setState({editState: true})}>
                                        Cambiar Estado
                                </Button>
                            </div>
                            <div>
                                <Button onClick={()=> this.setState({budgetLoad: true})}>
                                        Enviar Presupuesto
                                </Button>
                            </div>
                        </div>                   
                    </div>
                </Card>
            </div>
        )
    }
}

export default OrderResultBox