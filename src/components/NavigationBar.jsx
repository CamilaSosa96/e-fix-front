import React from 'react'
import {Redirect} from 'react-router-dom'
import {isAuthored, logOut} from '../efixService'
import {Navbar, InputGroup, Icon, Colors, Button, Tooltip} from '@blueprintjs/core'

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
        logOut((error, _response) =>{
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
                    <img style={{width: '150px',
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
                            onChange ={this.handleChange}
                            maxLength='30'
                            rightElement={
                                <Icon style={{marginRight: '10px', marginTop: '7px', color: Colors.VIOLET4}}
                                      icon='search'
                                      intent='primary' 
                                      onClick={this.handleSearch}
                                />}
                        />
                    </div>
                    <div style={{textAlign: 'right',
                                 position: 'absolute',
                                 right: '0',
                                 marginRight: '10px',
                                 marginTop: '18px'
                                 }}>
                        <Icon icon='user' iconSize= '20' style={{color: 'white', marginBottom:'2px'}}/>
                        <p style={{fontSize: '30px', 
                                   color: 'white',
                                   display:'inline', 
                                   marginRight: '30px', 
                                   marginLeft: '5px'}}>
                            <b>{this.state.username}</b>
                        </p>
                        <Tooltip content='Cerrar sesión'>
                            <Button style={{color: 'white', 
                                            display:'inline', 
                                            marginBottom:'20px',
                                            height:'10px', 
                                            backgroundColor: '#BF12FE'
                                          }}
                                    onClick={this.handleLogOut} 
                                    minimal={true}>
                                    <Icon icon='log-out' color='white' style={{marginLeft: '0px'}}/>
                            </Button>
                        </Tooltip>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar