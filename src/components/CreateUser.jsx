import React from 'react'
import { Dialog, InputGroup, Button, Icon, Alert} from '@blueprintjs/core'

class CreateUser extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user: '',
            pass: '',
            passConf: '',
            msg: '',
            alert: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.createUser = this.createUser.bind(this)
    }

    handleClose(){
        this.props.closeDialog()
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    createUser(){
        if(this.state.user === '' || this.state.pass === '' || this.state.passConf === ''){
            this.setState({alert: true, msg: 'Por favor, complete todos los campos.'})
        } else {
            this.state.pass !== this.state.passConf ? 
                this.setState({alert: true, pass: '', passConf: '', msg: 'Las contraseñas no coinciden.'}) :   
                this.props.createUser(this.state.user, this.state.pass) 
        }
    }

    render(){
        return(
            <div> 
                <Alert isOpen={this.state.alert} 
                       confirmButtonText='ACEPTAR'
                       icon='warning-sign'
                       intent='warning'
                       onClose={() => this.setState({alert: false})}>
                    {this.state.msg}
                </Alert>
                <Alert isOpen={this.props.alert} 
                       onClose={() => this.props.closeAlert()}>
                    El nombre de usuario ya existe. Intente con otro.
                </Alert>
                <Dialog style={{width: '380px', height:'190px', display: 'inline-block'}}
                        isOpen={this.props.isOpen}
                        title={<p style={{fontSize: '30px', marginTop: '12px'}}>Crear nuevo usuario</p>}
                        icon={<Icon style={{marginRight: '10px', marginTop: '7px', color: '#3DA817'}}
                                    icon='plus' 
                                    iconSize='30'/>} 
                        onClose={this.handleClose}>
                    <div style={{display: 'inline-block'}}>
                    <InputGroup style={{width: '250px', marginTop: '10px', marginLeft: '10px', marginRight: '10px'}}
                                type='text'
                                name='user' 
                                placeholder='Usuario' 
                                value={this.state.user}
                                onChange={this.handleChange}/>
                    <InputGroup style={{width: '250px', marginTop: '10px', marginLeft: '10px', marginRight: '10px'}}
                                type='password'
                                name='pass'
                                placeholder='Contraseña' 
                                value={this.state.pass}
                                onChange={this.handleChange}/>
                    <InputGroup style={{width: '250px', marginTop: '10px', marginLeft: '10px', marginRight: '10px'}}
                                type='password'
                                name='passConf'
                                placeholder='Repita su contraseña' 
                                value={this.state.passConf}
                                onChange={this.handleChange}/>
                    </div>    
                    <div style={{display: 'inline-block'}}>        
                    <Button style={{width: '100px',
                                    height: '105px',
                                    marginBottom: '70px',
                                    color: 'white',
                                    backgroundColor: '#3DA817'}}
                            minimal='true'
                            intent='success'
                            onClick={this.createUser}>
                            <div>
                                <Icon style={{marginLeft: '7px'}} icon='new-person' iconSize='60' color='white'/>
                            </div>
                            <div style={{fontSize: '20px'}}><b>CREAR</b></div>
                    </Button>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default CreateUser