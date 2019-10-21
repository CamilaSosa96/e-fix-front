import React from 'react'
import { Dialog, InputGroup, Button } from '@blueprintjs/core'

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
                <Dialog isOpen={this.props.isOpen}
                        title={"Crear nuevo usuario"} 
                        onClose={this.handleClose}>
                    <InputGroup type='text'
                                name='user' 
                                placeholder='Usuario' 
                                value={this.state.user}
                                onChange={this.handleChange}/>
                    <InputGroup type='text'
                                name='pass'
                                placeholder='Contraseña' 
                                value={this.state.pass}
                                onChange={this.handleChange}/>
                    <Button onClick={this.createUser}>
                        Crear
                    </Button>
                </Dialog>
            </div>
        )
    }
}

export default CreateUser