import React from 'react'
import {Card, Elevation, Button, Dialog, Tag} from '@blueprintjs/core'
import {updateState, loadBudget} from '../efixService'
import {stateNameTranslator, stateIconSelector, stateColorSelector} from '../handlers/StateStyleHandler'
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
            stateColor: stateColorSelector(this.props.state),
            stateIcon: stateIconSelector(this.props.state),
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
                productState: stateNameTranslator(rawStateValue),
                lastUpdate: new Date().toLocaleString(),
            })
        })
    }

    closeStateDialog(){
        this.setState({editState: false, budgetLoad: false})
    }

    stateInfo(){
        return ({state: this.state.productState, date: this.state.lastUpdate})
    }

    handleOrderStatusChange(rawStateValue){
        this.setState({editState: false, 
                        productState: stateNameTranslator(rawStateValue), 
                        stateColor: stateColorSelector(rawStateValue),
                        stateIcon: stateIconSelector(rawStateValue)})
        this.updateState(rawStateValue)
    }

    handleBudget(diagnosis, budget){
        loadBudget(this.props.id, diagnosis, budget, (_result)=> {
            this.setState({budgetLoad: false,
                            productState: stateNameTranslator('ESPERANDO_PRESUPUESTO'),
                            stateColor: stateColorSelector('ESPERANDO_PRESUPUESTO'),
                            stateIcon: stateIconSelector('ESPERANDO_PRESUPUESTO')})
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
                    <div style={{position: 'relative', height: '120px'}}>
                        <div style={{textAlign: 'left'}}>
                            <div style={{fontSize: '20px', marginBottom: '7px'}}>
                                <b>{this.props.brand} {this.props.model}</b> 
                            </div>
                            <div>{this.props.name} - {this.props.email}</div>   
                        </div> 
                        <div style={{position: 'absolute', bottom: '0'}}>
                            <div style={{textAlign: 'center', marginBottom: '10px'}}>  
                                <Button style={{width: '140px', marginRight: '20px'}}
                                        onClick={()=> this.setState({info: true})}>
                                    Ver Información
                                </Button>
                                <Button style={{width: '140px', marginRight: '20px'}}
                                        onClick={()=> this.setState({editState: true})}>
                                    Cambiar Estado
                                </Button>
                                <Button style={{width: '140px'}}
                                        onClick={()=> this.setState({budgetLoad: true})}>
                                    Enviar Presupuesto
                                </Button>
                            </div>
                            <div>
                                <Tag style={{backgroundColor: this.state.stateColor, 
                                            width: '460px',
                                            textAlign: 'left'}}
                                    fill='true' 
                                    round='true'
                                    rightIcon={this.state.stateIcon}>
                                    <b style={{color: 'white', fontSize: '16px'}}>
                                        {this.state.productState}
                                    </b>
                                </Tag>
                             </div> 
                        </div>          
                    </div>
                </Card>
            </div>
        )
    }
}

export default OrderResultBox