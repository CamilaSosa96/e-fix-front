import React from 'react'
import {Divider, Colors} from '@blueprintjs/core'

class OBDInformation extends React.Component {

    constructor(props){
        super(props)
        this.getDiagnosis = this.getDiagnosis.bind(this)
        this.getBudget = this.getBudget.bind(this)
    }

    getDiagnosis(){
        if(this.props.orderInfo.diagnosis === null){
            return 'No disponible'
        } else {
            return this.props.orderInfo.diagnosis
        }
    }

    getBudget(){
        if(this.props.orderInfo.budget === null){
            return 'No disponible'
        } else {
            return this.props.orderInfo.budget
        }
    }

render(){
    return(
        <div style={{backgroundColor: Colors.VIOLET1}}>
            <div style={{backgroundColor: 'white', marginLeft: '20px', marginRight: '20px'}}>
                <h1>Orden de Reparación #{this.props.orderInfo.id}</h1>
                <Divider/>
                <h3>Nombre del Cliente: {this.props.orderInfo.name}</h3>
                <h3>DNI: {this.props.orderInfo.dni}</h3>
                <h3>E-mail: {this.props.orderInfo.email}</h3>
                <Divider/>
                <h3>Producto: [{this.props.orderInfo.type}] {this.props.orderInfo.brand}{' '}{this.props.orderInfo.model}</h3>
                <h3>Falla inicial: {this.props.orderInfo.problem}</h3>
                <h3>Diagnóstico: {this.getDiagnosis()}</h3>
                <h3>Presupuesto: {this.getBudget()}</h3>
                <Divider/>
                <h3>Estado: {this.props.stateInfo}</h3>
                <h3>Última actualización: {this.props.dateInfo}</h3>
            </div>
        </div>
    )
}

}

export default OBDInformation