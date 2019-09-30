import React from 'react'
import {Card, Elevation, Button, Dialog} from '@blueprintjs/core'
import {updateState} from '../efixService'

class OrderResultBox extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            info: false,
            state: false,
            productState: this.valueTranslator(this.props.state),
            productStateSelect: this.props.state,
            lastUpdate: this.props.lastUpdateDate
        }
        this.getDiagnosis = this.getDiagnosis.bind(this)
        this.getBudget = this.getBudget.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.valueTranslator = this.valueTranslator.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    getDiagnosis(){
        if(this.props.diagnosis === null){
            return "- No disponible -"
        } else {
            return this.props.diagnosis
        }
    }

    getBudget(){
        if(this.props.budget === null){
            return "- No disponible -"
        } else {
            return this.props.budget
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    updateState(){
        updateState(this.props.id, this.state.productStateSelect, (response) =>{
            this.setState({
                state: false, 
                productState: this.valueTranslator(this.state.productStateSelect),
                lastUpdate: new Date().toLocaleString()
            })
        })
    }

    valueTranslator(value) {
        if(value === 'RECIBIDO'){return 'Recibido'}
        if(value === 'ESPERANDO_PRESUPUESTO'){return 'Esperando aprobación de presupuesto'}
        if(value === 'REPARACION'){return 'En reparación'}
        if(value === 'RETIRAR_SINARREGLO'){return 'Listo para retirar sin arreglar'}
        if(value === 'REPARADO'){return 'Reparado'}
        if(value === 'CANCELADA'){return 'Reparación Cancelada'}
        if(value === 'ENTREGADO'){return 'Entregado'}
        return ""
    }

    render(){
        return (
            <div>
                <Dialog isOpen={this.state.info}
                        onClose={()=> this.setState({info: false})}>
                    <h1>Orden de Reparación #{this.props.id}</h1>
                    <h3>Nombre del Cliente: {this.props.name}</h3>
                    <h3>DNI: {this.props.dni}</h3>
                    <h3>E-mail: {this.props.email}</h3>
                    <h3>Producto: [{this.props.type}] {this.props.brand}{" "}{this.props.model}</h3>
                    <h3>Falla inicial: {this.props.problem}</h3>
                    <h3>Diagnóstico: {this.getDiagnosis()}</h3>
                    <h3>Presupuesto: {this.getBudget()}</h3>
                    <h3>Estado: {this.state.productState} (Última actualización: {this.state.lastUpdate})</h3>
                </Dialog>
                <Dialog isOpen={this.state.state} onClose={()=> this.setState({state: true})}>      
                        <h1>Cambiar estado de {this.props.brand}{" "}{this.props.model}</h1>
                        <select value={this.state.productStateSelect}
                                name='productStateSelect'
                                onChange={this.handleChange}>
                        <option value='RECIBIDO'>{this.valueTranslator('RECIBIDO')}</option>
                        <option value='ESPERANDO_PRESUPUESTO'>{this.valueTranslator('ESPERANDO_PRESUPUESTO')}</option>
                        <option value='REPARACION'>{this.valueTranslator('REPARACION')}</option>
                        <option value='RETIRAR_SINARREGLO'>{this.valueTranslator('RETIRAR_SINARREGLO')}</option>
                        <option value='REPARADO'>{this.valueTranslator('REPARADO')}</option>
                        <option value='CANCELADA'>{this.valueTranslator('CANCELADA')}</option>
                        <option value='ENTREGADO'>{this.valueTranslator('ENTREGADO')}</option>
                        </select>
                        <Button onClick={this.updateState}> Aceptar </Button>
                </Dialog>
                <Card elevation={Elevation.TWO} interactive='true'
                      style={{width: '500px', height: '150px', marginBottom: '30px'}}>
                    <div style={{display: 'inline-block'}}>
                        <div>   
                            {this.props.brand} {"  "} {this.props.model}
                        </div>
                        <div>
                            {this.props.name}           
                        </div>
                        <Button onClick={()=> this.setState({info: true})}>Ver Info</Button>
                    </div>
                    <div style={{display: 'inline-block'}}> 
                        {this.state.productState}
                        <Button onClick={()=> this.setState({state: true})}>Cambiar Estado</Button>
                    </div>
                </Card>
            </div>
        )
    }
}

export default OrderResultBox