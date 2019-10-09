import React from 'react'
import {Button} from '@blueprintjs/core'

class OBDStateChange extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            stateValue: this.props.orderInfo.state
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendChangeToParent = this.sendChangeToParent.bind(this)
    }

handleChange(event){
    this.setState({stateValue: event.target.value})
}

sendChangeToParent(){
    this.props.handleOrderStatusChange(this.state.stateValue)
}

render(){
    return (    
    <div>
        <h1>Cambiar estado de {this.props.orderInfo.brand}{' '}{this.props.orderInfo.model}</h1>
                        <select value={this.state.stateValue}
                                onChange={this.handleChange}>
                        <option value='RECIBIDO'>{this.props.valueTranslator('RECIBIDO')}</option>
                        <option value='ESPERANDO_PRESUPUESTO'>{this.props.valueTranslator('ESPERANDO_PRESUPUESTO')}</option>
                        <option value='REPARACION'>{this.props.valueTranslator('REPARACION')}</option>
                        <option value='RETIRAR_SINARREGLO'>{this.props.valueTranslator('RETIRAR_SINARREGLO')}</option>
                        <option value='REPARADO'>{this.props.valueTranslator('REPARADO')}</option>
                        <option value='CANCELADA'>{this.props.valueTranslator('CANCELADA')}</option>
                        <option value='ENTREGADO'>{this.props.valueTranslator('ENTREGADO')}</option>
                        </select>
                        <Button onClick={this.sendChangeToParent}> Aceptar </Button>
                        <Button onClick={() => this.props.closeStateDialog()}> Volver </Button>
    </div>
    )
}
}

export default OBDStateChange