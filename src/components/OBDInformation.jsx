import React from 'react'
import {Dialog, Icon, Colors} from '@blueprintjs/core'

class OBDInformation extends React.Component {

    constructor(props){
        super(props)
        this.date = this.formatDate()
        this.getDiagnosis = this.getDiagnosis.bind(this)
        this.getBudget = this.getBudget.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }

    getDiagnosis(){
        return this.props.diagnosisInfo === null ? 
        'No disponible' :
        this.props.diagnosisInfo
    }

    getBudget(){
        return this.props.budgetInfo === null ?
        'No disponible' :
        `$ ${this.props.budgetInfo}`
    }

    handleClose(){
        this.props.closeDialog()
    }

    formatDate(){
        return this.props.dateInfo.replace('T', ' ').replace('.000Z', ' ').replace(',', ' ')
    }

    render(){
        return(
            <Dialog style={{width: '600px', height:'390px'}}
                    isOpen={this.props.isOpen}
                    icon={<Icon style={{marginRight: '10px', marginTop: '7px', color: Colors.VIOLET4}}
                                icon='info-sign' 
                                iconSize='30'/>}
                    title={<p style={{fontSize: '30px', marginTop: '12px'}}>
                            Orden de Reparación #{this.props.orderInfo.id}</p>}
                    onClose={this.handleClose}>
                <div style={{fontSize: '18px', marginLeft: '10px', marginTop: '5px'}}>
                    <p><Icon style={{marginBottom: '3px'}} icon='user'/><b> Técnico:</b> {this.props.orderInfo.user}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='person'/><b> Cliente:</b> {this.props.orderInfo.name}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='id-number'/><b> DNI:</b> {this.props.orderInfo.dni}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='envelope'/><b> E-mail:</b> {this.props.orderInfo.email}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='desktop'/><b> Producto:</b> {this.props.orderInfo.type} {this.props.orderInfo.brand} {this.props.orderInfo.model}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='cross'/><b> Falla incial:</b> {this.props.orderInfo.problem}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='warning-sign'/><b> Diagnóstico:</b> {this.getDiagnosis()}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='dollar'/><b> Presupuesto:</b> {this.getBudget()}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='wrench'/><b> Estado:</b> {this.props.stateInfo}</p>
                    <p><Icon style={{marginBottom: '3px'}} icon='calendar'/><b> Última actualización:</b> {this.date}</p>
                </div>
            </Dialog>
        )
    }
}

export default OBDInformation