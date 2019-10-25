import React from 'react'
import {validateUser} from '../efixService'
import { Dialog, Icon, Divider, InputGroup, Button, Alert} from '@blueprintjs/core'

class ChangePassword extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isOpen: this.props.open,
            oldPass: '',
            newPass: '',
            newPassConf: '',
            adminPass: '',
            adminUserForChange: '',
            adminNewPassForUser: '',
            msg: '',
            alert: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handlePasswordChangeForUser = this.handlePasswordChangeForUser.bind(this)
    }

    handleClose(){
        this.setState({isOpen: false})
        this.props.close()
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handlePasswordChange(){
        if(this.state.oldPass === '' || this.state.newPass === '' || this.state.newPassConf === ''){
            this.setState({alert: true, msg: 'Por favor, complete todos los campos.'})
        } else {
            this.state.newPass !== this.state.newPassConf ?
            this.setState({alert: true, msg: 'Las nuevas contraseñas no coinciden'}) :
            validateUser(this.props.username, this.state.oldPass, (err, _res) =>{
                err ? this.setState({alert: true, msg: 'La contraseña es incorrecta'}) :
                this.props.passwordChange(this.state.newPass)  
            })
        }
    }

    handlePasswordChangeForUser(){
        if(this.state.adminPass === '' || this.state.adminUserForChange === '' || this.state.adminNewPassForUser === ''){
            this.setState({alert: true, msg: 'Por favor, complete todos los campos.'})
        } else {
            validateUser(this.props.username, this.state.adminPass, (err, _res) =>{
                err ? this.setState({alert: true, msg: 'La contraseña es incorrecta'}) :
                this.props.passwordChangeForUser(this.state.adminUserForChange, this.state.adminNewPassForUser)  
            })
        }
    }

    render(){
        return(
            <div>
                <Alert isOpen={this.state.alert}
                       onClose={() => this.setState({alert: false})}>
                    {this.state.msg}
                </Alert>
                <Dialog isOpen={this.state.isOpen}
                        onClose={this.handleClose}
                        title={<p style={{fontSize: '30px', 
                                          textAlign: 'center',
                                          width: '380px',
                                          marginTop: '12px',}}>
                                Cambiar Contraseña</p>}
                        icon={<Icon style={{marginRight: '10px', marginTop: '7px', color: 'grey'}}
                                    icon='lock' 
                                    iconSize='30'/>}>
                    <div style={{height: '170px', textAlign: 'center'}}>
                        <p style={{fontSize:'20px', textAlign: 'center', marginTop: '10px'}}>
                            <b>Cambiar mi contraseña</b></p>
                        <div style={{display: 'inline-block'}}>
                            <InputGroup style={{width: '200px', 
                                                marginTop: '10px', 
                                                marginLeft: '10px', 
                                                marginRight: '10px'}}
                                        disabled={true}
                                        value={this.props.username}/>
                            <InputGroup style={{width: '200px', 
                                                marginTop: '10px', 
                                                marginLeft: '10px', 
                                                marginRight: '10px'}}
                                        type='password'
                                        name='oldPass'
                                        placeholder='Contraseña antigua' 
                                        value={this.state.pass}
                                        onChange={this.handleChange}/>             
                        </div>
                        <div style={{display: 'inline-block'}}>       
                            <InputGroup style={{width: '200px', 
                                                marginTop: '10px', 
                                                marginLeft: '10px', 
                                                marginRight: '10px'}}
                                        type='password'
                                        name='newPass'
                                        placeholder='Contraseña nueva' 
                                        value={this.state.pass}
                                        onChange={this.handleChange}/>
                            <InputGroup style={{width: '200px', marginTop: '10px', marginLeft: '10px', marginRight: '10px'}}
                                        type='password'
                                        name='newPassConf'
                                        placeholder='Repita su contraseña nueva' 
                                        value={this.state.passConf}
                                        onChange={this.handleChange}/>
                    </div>             
                    <Button style={{marginTop: '10px', color: 'white', backgroundColor: 'grey'}}
                            onClick={this.handlePasswordChange}
                            minimal='true'> 
                        <b>CAMBIAR CONTRASEÑA</b> 
                    </Button>
                    </div>
                    {this.props.username === 'Admin' &&
                    <div style={{height: '170px'}}>
                        <Divider/>
                        <div style={{height: '170px', textAlign: 'center'}}>
                            <p style={{fontSize:'20px', textAlign: 'center', marginTop: '10px'}}>
                                <b>Cambiar contraseña de un usuario</b></p>
                            <div style={{display: 'inline-block'}}>
                                <InputGroup style={{width: '200px', 
                                                    marginTop: '10px', 
                                                    marginLeft: '10px', 
                                                    marginRight: '10px'}}
                                            disabled={true}
                                            value={this.props.username}/>
                                <InputGroup style={{width: '200px', 
                                                    marginTop: '10px', 
                                                    marginLeft: '10px', 
                                                    marginRight: '10px'}}
                                            type='password'
                                            name='adminPass'
                                            placeholder='Contraseña de Admin' 
                                            value={this.state.adminPass}
                                            onChange={this.handleChange}/>             
                            </div>
                            <div style={{display: 'inline-block'}}>       
                                <InputGroup style={{width: '200px', 
                                                    marginTop: '10px', 
                                                    marginLeft: '10px', 
                                                    marginRight: '10px'}}
                                            type='text'
                                            name='adminUserForChange'
                                            placeholder='Usuario' 
                                            value={this.state.adminUserForChange}
                                            onChange={this.handleChange}/>
                                <InputGroup style={{width: '200px', marginTop: '10px', marginLeft: '10px', marginRight: '10px'}}
                                            type='password'
                                            name='adminNewPassForUser'
                                            placeholder='Nueva contraseña' 
                                            value={this.state.adminNewPassForUser}
                                            onChange={this.handleChange}/>
                            </div>
                            <Button style={{marginTop: '10px', color: 'white', backgroundColor: 'grey'}}
                                    onClick={this.handlePasswordChangeForUser}
                                    minimal='true'> 
                                <b>CAMBIAR CONTRASEÑA DE USUARIO</b> 
                            </Button>    
                        </div>
                    </div>}                
                </Dialog>
            </div>
        )
    }
}

export default ChangePassword