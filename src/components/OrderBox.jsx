import React from 'react'
import {Card, Elevation, Button, Tag} from '@blueprintjs/core'
import {updateState, loadBudget, isAuthored} from '../efixService'
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
            budget: this.props.budget,
            diagnosis: this.props.diagnosis,
            rawState: this.props.state,
            lastUpdate: this.props.lastUpdateDate,
            stateColor: stateColorSelector(this.props.state),
            stateIcon: stateIconSelector(this.props.state),
            productState: stateNameTranslator(this.props.state),
            loggedUser: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateState = this.updateState.bind(this)
        this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this)
        this.handleBudget = this.handleBudget.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.isAllowedToModify = this.isAllowedToModify.bind(this)
    }

    componentDidMount(){
        isAuthored((error, result) => {
            error ? console.log(error) : this.setState({loggedUser: result.data.user})
        })
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    updateState(rawStateValue){
        updateState(this.props.id, rawStateValue, (_response) => {
            this.setState({
                productState: stateNameTranslator(rawStateValue),
                lastUpdate: new Date().toLocaleString(),
            })
        })
    }

    stateInfo(){
        return ({state: this.state.productState, date: this.state.lastUpdate})
    }

    handleOrderStatusChange(rawStateValue){
        this.setState({editState: false, 
                       productState: stateNameTranslator(rawStateValue),
                       rawState: rawStateValue, 
                       stateColor: stateColorSelector(rawStateValue),
                       stateIcon: stateIconSelector(rawStateValue)})
        this.updateState(rawStateValue)
    }

    handleBudget(diagnosis, budget){
        loadBudget(this.props.id, diagnosis, budget, (_result) => {
            this.setState({budgetLoad: false,
                           productState: stateNameTranslator('ESPERANDO_PRESUPUESTO'),
                           stateColor: stateColorSelector('ESPERANDO_PRESUPUESTO'),
                           stateIcon: stateIconSelector('ESPERANDO_PRESUPUESTO'),
                           diagnosis: diagnosis,
                           budget: budget})
        })
    }

    closeDialog(){
        this.setState({info: false, editState: false, budgetLoad: false})
    }

    isAllowedToModify(){
        return (this.state.loggedUser === 'Admin') || (this.state.loggedUser === this.props.user) 
    }

    render(){
        return (
            <div>
                {this.state.info && 
                <OBDInformation isOpen={this.state.info}
                                closeDialog={this.closeDialog}
                                orderInfo={this.props}
                                stateInfo={this.state.productState}
                                budgetInfo={this.state.budget}
                                diagnosisInfo={this.state.diagnosis}
                                dateInfo={this.state.lastUpdate}
                />}
                {this.state.editState && 
                <OBDStateChange isOpen={this.state.editState}
                                rawState={this.state.rawState}
                                closeDialog={this.closeDialog}
                                orderInfo={this.props}
                                handleChange={this.handleChange}
                                updateState={this.updateState}
                                handleOrderStatusChange={this.handleOrderStatusChange}
                />}
                {this.state.budgetLoad &&
                <OBDLoadBudget  isOpen={this.state.budgetLoad}
                                closeDialog={this.closeDialog}
                                orderInfo={this.props}
                                handleBudget={this.handleBudget}
                />}
                <Card style={{width: '500px', height: '150px', marginBottom: '30px'}}
                      elevation={Elevation.TWO} 
                      interactive='true'>
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
                                        onClick={() => this.setState({info: true})}>
                                    Ver Información
                                </Button>
                                <Button style={{width: '140px', marginRight: '20px'}}
                                        disabled={!this.isAllowedToModify()}
                                        onClick={() => this.setState({editState: true})}>
                                    Cambiar Estado
                                </Button>                   
                                <Button style={{width: '140px'}}
                                        disabled={!this.isAllowedToModify()}
                                        onClick={() => this.setState({budgetLoad: true})}>
                                    Enviar Presupuesto
                                </Button>
                            </div>
                            <div>
                                <Tag style={{width: '460px',
                                             textAlign: 'left',
                                             backgroundColor: this.state.stateColor}}
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