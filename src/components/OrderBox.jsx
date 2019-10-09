import React from 'react'
import {Card, Elevation, Button, Dialog} from '@blueprintjs/core'
import {updateState} from '../efixService'
import {stateNameTranslator} from '../handlers/StateStyleHandler'
import OBDStateChange from './OBDStateChange'
import OBDInformation from './OBDInformation'

class OrderResultBox extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            info: false,
            editState: false,
            productState: stateNameTranslator(this.props.state),
            lastUpdate: this.props.lastUpdateDate
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateState = this.updateState.bind(this)
        this.closeStateDialog = this.closeStateDialog.bind(this)
        this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    updateState(rawStateValue){
        updateState(this.props.id, rawStateValue, (response) =>{
            this.setState({
                editState: false, 
                productState: stateNameTranslator(rawStateValue),
                lastUpdate: new Date().toLocaleString()
            })
        })
    }

    closeStateDialog(){
        this.setState({editState: false})
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

    render(){
        return (
            <div>
                <Dialog isOpen={this.state.info}
                        onClose={()=> this.setState({info: false})}>
                   <OBDInformation orderInfo ={this.props} 
                                    stateInfo={this.state.productState}
                                    dateInfo={this.state.lastUpdate}
                                    >
                                    </OBDInformation>
                </Dialog>
                <Dialog isOpen={this.state.editState} onClose={()=> this.setState({editState: true})}>      
                        <OBDStateChange orderInfo = {this.props}
                                        handleChange = {this.handleChange}
                                        updateState={this.updateState}
                                        closeStateDialog={this.closeStateDialog}
                                        handleOrderStatusChange = {this.handleOrderStatusChange}></OBDStateChange>
                </Dialog>
                <Card elevation={Elevation.TWO} 
                    interactive='true'
                    style={{width: '500px', 
                            height: '100px', 
                            marginBottom: '30px'}}>
                    <div>
                        <div style={{display: 'inline-block', marginRight: '0px', textAlign: 'left'}}>
                            <div>
                                <b>{this.props.brand} 
                                {'  '} 
                                {this.props.model}</b>
                            </div>
                            <div>
                                {this.props.name} 
                            </div>
                            <div>
                            <b>{this.state.productState}</b>
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
                        </div>                   
                    </div>
                </Card>
            </div>
        )
    }
}

export default OrderResultBox