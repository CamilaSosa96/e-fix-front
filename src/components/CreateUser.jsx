import React from 'react'
import { Dialog, InputGroup, Button, Icon} from '@blueprintjs/core'

class CreateUser extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user: '',
            pass: ''
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
        this.props.createUser(this.state.user, this.state.pass)
    }

    render(){
        return(
            <div>
                <Dialog style={{width: '380px', height:'150px', display: 'inline-block'}}
                        isOpen={this.props.isOpen}
                        title={<p style={{fontSize: '30px', marginTop: '12px'}}>Crear nuevo usuario</p>}
                        icon={<Icon style={{marginRight: '10px', marginTop: '7px', color: '#3DA817'}}
                                icon='new-person' 
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
                                type='text'
                                name='pass'
                                placeholder='Contraseña' 
                                value={this.state.pass}
                                onChange={this.handleChange}/>
                    </div>    
                    <div style={{display: 'inline-block'}}>        
                    <Button style={{width: '100px',
                                    height: '70px',
                                    marginBottom: '30px',
                                    color: 'white',
                                    backgroundColor: '#3DA817'}}
                            icon={<Icon icon='plus' color='white'/>}
                            minimal='true'
                            intent='success'
                            onClick={this.createUser}>
                        <b>CREAR</b>
                    </Button>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default CreateUser