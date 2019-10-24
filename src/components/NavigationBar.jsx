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
        event.preventDefault()
    }

    handleSearch(){
        if(this.state.search !== '') this.setState({goSearch: true})
    }

    handleLogOut(){
        logOut((error, _response) => {
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
                <Navbar style={{position: 'relative',
                                height: '70px',
                                backgroundColor: '#5B1790'}}>
                    <img style={{position: 'absolute',
                                 width: '150px',  
                                 top: '50%', 
                                 transform: 'translate(0,-50%)'}}
                         src='http://localhost:3000/efixlogo.png' 
                         alt='E-FIX' 
                         onClick={() => this.setState({goHome:true})}/>                 
                    <div style={{position: 'absolute',
                                 display: 'inline',
                                 width: '400px',
                                 height: '5x',
                                 top: '50%',
                                 left: '50%',
                                 transform: 'translate(-50%, -50%)'}}>
                        <InputGroup type='search'
                                    name='search'
                                    value={this.state.search}
                                    placeholder='Buscar una orden por e-mail'
                                    maxLength='30'
                                    onChange ={this.handleChange}
                                    rightElement={
                                        <Icon style={{marginRight: '10px', marginTop: '7px', color: Colors.VIOLET4}}
                                              icon='search'
                                              intent='primary' 
                                              onClick={this.handleSearch}
                                        />}
                        />
                    </div>
                    <div style={{position: 'absolute',
                                 right: '0',
                                 marginRight: '10px',
                                 marginTop: '18px',
                                 textAlign: 'right'}}>
                        <Icon icon='user' iconSize= '20' style={{color: 'white', marginBottom:'2px'}}/>
                        <p style={{display:'inline', 
                                   marginRight: '30px', 
                                   marginLeft: '5px',
                                   fontSize: '30px', 
                                   color: 'white',}}>
                            <b>{this.state.username}</b>
                        </p>
                        <Tooltip content='Cerrar sesión'>
                            <Button style={{display:'inline',
                                            height:'10px',
                                            marginBottom:'20px',
                                            color: 'white',
                                            backgroundColor: '#BF12FE'}}
                                     minimal={true}
                                     onClick={this.handleLogOut} >
                                    <Icon style={{marginLeft: '0px'}} icon='log-out' color='white'/>
                            </Button>
                        </Tooltip>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar