import React from 'react'
import {Redirect} from 'react-router-dom'
import {isAuthored, logOut} from '../efixService'
import {Navbar, InputGroup, Icon, Colors, Button} from '@blueprintjs/core'

class NavigationBar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            search: '',
            username: '',
            goSearch: false,
            goHome: false,
            goLogin: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    componentDidMount(){
        isAuthored((error, response) => {
            if(!error) this.setState({username: response.data.user})
        })
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
        event.preventDefault();
    }

    handleSearch(){
        if(this.state.search !== ''){
            this.setState({goSearch: true})
        }
    }

    handleLogOut(){
        logOut((error, response) =>{
            if(error) console.log(error)
            this.setState({goLogin: true})
        })
    }

    render(){
        return(
            <div>
                {this.state.goSearch && <Redirect to={`/orders/${this.state.search}`}/>}
                {this.state.goHome && <Redirect to='/home' />}
                {this.state.goLogin && <Redirect to='/login' />}
                <Navbar style={{backgroundColor: '#5B1790',
                                height: '70px',
                                position: 'relative'}}>
                    <img style={{width:'150px',
                                position: 'absolute', 
                                top: '50%', 
                                transform: 'translate(0,-50%)'}}
                        src='../efixlogo.png' 
                        alt='E-FIX' 
                        onClick={()=> this.setState({goHome:true})}/>                 
                    <div style={{width: '400px',
                                height: '5x',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'inline'
                                }}>
                        <InputGroup 
                            type='search'
                            name='search'
                            value={this.state.search}
                            placeholder='Buscar una orden por e-mail'
                            onChange = {this.handleChange}
                            rightElement={
                                <Icon icon='search'
                                    intent='primary' 
                                    style={{marginRight: '10px', marginTop: '7px', color: Colors.VIOLET4}}
                                    onClick={this.handleSearch}
                                />}
                        />
                    </div>
                    <div style={{ 
                            position: 'absolute',
                            top: '80%',
                            left: '80%',
                            transform: 'translate(-80%, -80%)',
                            display: 'inline',
                            color: 'white'
                        }}>
                        <p>
                            ¡Hola {this.state.username}!
                        </p>
                    </div>
                    <div>
                        <Button style={{
                                    position: 'absolute',
                                    top: '90%',
                                    left: '90%',
                                    transform: 'translate(-90%, -90%)',
                                    display: 'inline',
                                    color: 'white'
                                }}
                                onClick={this.handleLogOut}
                                intent='primary'>
                            <p>Salir</p>
                        </Button>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar