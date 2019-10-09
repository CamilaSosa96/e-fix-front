import React from 'react'
import {stateNameTranslator} from '../handlers/StateStyleHandler'
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
                        <option value='RECIBIDO'>{stateNameTranslator('RECIBIDO')}</option>
                        <option value='ESPERANDO_PRESUPUESTO'>{stateNameTranslator('ESPERANDO_PRESUPUESTO')}</option>
                        <option value='REPARACION'>{stateNameTranslator('REPARACION')}</option>
                        <option value='RETIRAR_SINARREGLO'>{stateNameTranslator('RETIRAR_SINARREGLO')}</option>
                        <option value='REPARADO'>{stateNameTranslator('REPARADO')}</option>
                        <option value='CANCELADA'>{stateNameTranslator('CANCELADA')}</option>
                        <option value='ENTREGADO'>{stateNameTranslator('ENTREGADO')}</option>
                        </select>
                        <Button onClick={this.sendChangeToParent}> Aceptar </Button>
                        <Button onClick={() => this.props.closeStateDialog()}> Volver </Button>
    </div>
    )
}
}

export default OBDStateChange