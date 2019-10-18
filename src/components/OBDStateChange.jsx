import React from 'react'
import {stateNameTranslator} from '../handlers/StateStyleHandler'
import {Button, Dialog} from '@blueprintjs/core'

class OBDStateChange extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            stateValue: this.props.rawState
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.sendChangeToParent = this.sendChangeToParent.bind(this)
    }

    handleChange(event){
        this.setState({stateValue: event.target.value})
    }

    sendChangeToParent(){
        this.props.handleOrderStatusChange(this.state.stateValue)
    }

    handleClose(){
        this.props.closeDialog()
    }

    render(){
        return (    
        <div>
            <Dialog isOpen={this.props.isOpen} 
                    onClose={this.handleClose} 
                    title={<p style={{marginTop: '12px', textAlign: 'center'}}>
                            Cambiar estado de {this.props.orderInfo.brand}{' '}{this.props.orderInfo.model}
                           </p>}> 
                    <div style={{textAlign: 'center'}}>
                        <select style={{marginTop: '22px', height: '30px', width:'250px' , marginRight:'15px'}}
                                value={this.state.stateValue} 
                                onChange={this.handleChange}>
                        <option value='RECIBIDO'>{stateNameTranslator('RECIBIDO')}</option>
                        <option value='REPARACION'>{stateNameTranslator('REPARACION')}</option>
                        <option value='RETIRAR_SINARREGLO'>{stateNameTranslator('RETIRAR_SINARREGLO')}</option>
                        <option value='REPARADO'>{stateNameTranslator('REPARADO')}</option>
                        <option value='CANCELADA'>{stateNameTranslator('CANCELADA')}</option>
                        <option value='ENTREGADO'>{stateNameTranslator('ENTREGADO')}</option>
                        </select>
                        <Button style={{marginTop: '-3px', height:'30px'}}
                                onClick={this.sendChangeToParent}> 
                                Aceptar 
                        </Button>
                    </div>
            </Dialog>
        </div>  
        )
    }
}

export default OBDStateChange