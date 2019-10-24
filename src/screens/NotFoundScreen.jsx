import React from 'react'
import { Redirect } from 'react-router-dom'
import { NonIdealState, Button, Navbar } from '@blueprintjs/core'

class NotFoundScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            goHome: false
        }
    }

    render(){
        return(
            <div>
                {this.state.goHome && <Redirect to='/home'/>}
                <Navbar style={{position: 'relative', 
                                height: '70px',
                                backgroundColor: '#5B1790'}}>
                    <img style={{position: 'absolute', 
                                 width: '150px',
                                 top: '50%',
                                 left: '50%', 
                                 transform: 'translate(-50%,-50%)'}}
                         src='/efixlogo.png' 
                         alt='E-FIX'/>    
                </Navbar>     
                <Navbar style={{position: 'absolute', 
                                bottom: '0',
                                height: '70px',
                                backgroundColor: '#5B1790'}}/>     
                <div style={{position: 'absolute', 
                             top: '50%', 
                             left: '50%', 
                             transform: 'translate(-50%, -50%)'}}>
                    <img style={{width: '150px', marginLeft: '15px'}}
                         src='http://localhost:3000/brokenlogo.png'
                         alt='E-Fix Broken'>
                    </img>
                    <NonIdealState title='No encontrado'
                                   description='La página solicitada no existe'
                                   action={<Button onClick={() => this.setState({goHome: true})}
                                                icon='home'>
                                            Ir al inicio
                                           </Button>}/>
                </div>
            </div>
        )
    }
}

export default NotFoundScreen