import React from 'react'
import {Navbar, InputGroup, Icon, Colors} from '@blueprintjs/core'

class NavigationBar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            search: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
        event.preventDefault();
    }

    handleSearch(){
        this.setState({search: ""})
        this.props.doSearch(this.state.search)  
    }

    render(){
        return(
            <Navbar style={{backgroundColor: '#5B1790',
                            height: '70px',
                            position: 'relative'}}>
                <img style={{width:'150px',
                            position: 'absolute', 
                            top: '50%', 
                            transform: 'translate(0,-50%)'}}
                    src='../efixlogo.png' 
                    alt='E-FIX' 
                    onClick={() => this.props.handleComponent('home')}/>                 
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
                        rightElement={<Icon icon='search'
                                            intent='primary' 
                                            style={{marginRight: '10px', marginTop: '7px', color: Colors.VIOLET4}}
                                            onClick={this.handleSearch}/>}
                    />
                </div>
            </Navbar>
        )
    }
}

export default NavigationBar