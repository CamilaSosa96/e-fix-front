import React from 'react'
import {Dialog, Icon, Colors} from '@blueprintjs/core'

class OBDInformation extends React.Component {

    constructor(props){
        super(props)
        this.getDiagnosis = this.getDiagnosis.bind(this)
        this.getBudget = this.getBudget.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    getDiagnosis(){
        return this.props.orderInfo.diagnosis === null ? 
        'No disponible' :
        this.props.orderInfo.diagnosis
    }

    getBudget(){
        return this.props.orderInfo.budget === null ?
        'No disponible' :
        this.props.orderInfo.budget
    }

    handleClose(){
        this.setState({isOpen: false})
        this.props.closeInfoDialog()
    }

    render(){
        return(
            <Dialog isOpen={this.props.isOpen}
                    icon={<Icon icon='info-sign' 
                                iconSize='30'
                                style={{marginRight: '10px', marginTop: '7px', color: Colors.VIOLET4}} />}
                    title={<p style={{fontSize: '30px', marginTop: '12px'}}>Orden de Reparación #{this.props.orderInfo.id}</p>}
                    onClose={this.handleClose}
                    style={{width: '600px', height: '350px'}}>
                <div style={{fontSize: '18px', marginLeft: '10px', marginTop: '5px'}}>
                    <p> <Icon icon='user'/><b> Cliente:</b> {this.props.orderInfo.name}</p>
                    <p><Icon icon='id-number'/><b> DNI:</b> {this.props.orderInfo.dni}</p>
                    <p><Icon icon='envelope'/><b> E-mail:</b> {this.props.orderInfo.email}</p>
                    <p><Icon icon='desktop'/><b> Producto:</b> {this.props.orderInfo.type} {this.props.orderInfo.brand} {this.props.orderInfo.model}</p>
                    <p><Icon icon='cross'/><b> Falla incial:</b> {this.props.orderInfo.problem}</p>
                    <p><Icon icon='warning-sign'/><b> Diagnóstico:</b> {this.getDiagnosis()}</p>
                    <p><Icon icon='dollar'/><b> Presupuesto:</b> {this.getBudget()}</p>
                    <p><Icon icon='wrench'/><b> Estado:</b> {this.props.stateInfo}</p>
                    <p><Icon icon='calendar'/><b> Última actualización:</b> {this.props.dateInfo}</p>
                </div>
            </Dialog>
        )
    }

}

export default OBDInformation