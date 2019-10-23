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
                 <Navbar style={{backgroundColor: '#5B1790',
                                height: '70px',
                                position: 'relative'}}>
                     <img style={{width: '150px',
                                 position: 'absolute', 
                                 top: '50%',
                                 left: '50%', 
                                 transform: 'translate(-50%,-50%)'}}
                         src='/efixlogo.png' 
                         alt='E-FIX'/>    
                </Navbar>     
                <Navbar style={{backgroundColor: '#5B1790',
                                height: '70px',
                                position: 'absolute', bottom: '0'}}/>     
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                {this.state.goHome && <Redirect to='/home'/>}
                <img style={{width: '150px', marginLeft: '15px'}}
                                            src='http://localhost:3000/brokenlogo.png'
                                       alt='E-Fix Broken'>
                           </img>
                <NonIdealState 
                                title='No encontrado'
                                description='La página solicitada no existe'
                                action={<Button onClick={() => this.setState({goHome: true})}
                                                icon='home'>
                                            Ir al inicio
                                        </Button>}>
                                       
                </NonIdealState>
            </div>
            </div>
        )
    }

}

export default NotFoundScreen