import React from 'react'
import { InputGroup, Button, Dialog} from '@blueprintjs/core'

class OBDLoadBudget extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            bud: '',
            diag: ''
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
    }

    handleClose(){
        this.props.closeDialog()
    }

    render(){
        return(
            <div>
                <Dialog isOpen={this.props.isOpen} 
                        onClose={this.handleClose} 
                        title={<p>Cargar presupuesto para {this.props.orderInfo.brand} {this.props.orderInfo.model}</p>}>
                <textarea placeholder='Diagnóstico'
                            name='diag'
                            onChange = {this.handleChange}
                            maxLength='30'/>
                <InputGroup type='number' 
                            name='bud'
                            placeholder='Costo de la reparación'
                            onChange = {this.handleChange}/>
                <Button onClick={this.sendChangeToParent}>
                    Cargar presupuesto
                </Button>
                <Button onClick={() => this.props.closeDialog()}> Volver </Button>
                </Dialog>
            </div>
        )
    }

}

export default OBDLoadBudget