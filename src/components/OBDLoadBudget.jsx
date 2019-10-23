import React from 'react'
import { InputGroup, Button, Dialog, Alert, Icon} from '@blueprintjs/core'

class OBDLoadBudget extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            bud: '',
            diag: '',
            alert: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.sendChangeToParent = this.sendChangeToParent.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    sendChangeToParent(){
        if(this.state.bud !== '' && this.state.diag !== ''){
            this.props.handleBudget(this.state.diag, this.state.bud)
        }
        else this.setState({alert: true})
    }

    handleClose(){
        this.props.closeDialog()
    }

    render(){
        return(
            <div>
                {this.state.alert && 
                        <Alert
                            isOpen={this.state.alert} 
                            onClose={() => this.setState({alert: false})}>
                            Por favor, complete todos los campos.
                        </Alert>}
                <Dialog style={{height: '140px'}}
                        isOpen={this.props.isOpen} 
                        onClose={this.handleClose} 
                        title={<p style={{marginTop: '12px', textAlign: 'center'}}>
                            Cargar presupuesto para {this.props.orderInfo.brand} {this.props.orderInfo.model}</p>}>
                    <div style={{textAlign: 'center'}}>
                        <div style={{display: 'inline-block', marginRight: '10px'}}>
                            <InputGroup style={{width: '350px', marginTop: '10px'}}
                                        type='text'
                                        placeholder='¿Qué necesita para ser reparado?'
                                        name='diag'
                                        onChange={this.handleChange}
                                        maxLength='30'/>
                            <InputGroup style={{width: '350px', marginTop: '10px'}}
                                        type='number' 
                                        name='bud'
                                        placeholder='Costo de la reparación'
                                        onChange={this.handleChange}/>
                        </div>
                        <div style={{display: 'inline-block'}}>
                            <Button style={{textAlign: 'center', 
                                            width: '100px', 
                                            height:'70px', 
                                            marginBottom: '30px',
                                            color: 'white',
                                            backgroundColor: '#3DA817'}}
                                    icon={<Icon icon='insert' color='white'/>}
                                    minimal='true'
                                    intent='success'
                                    onClick={this.sendChangeToParent}>
                                <b>CARGAR</b>
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default OBDLoadBudget