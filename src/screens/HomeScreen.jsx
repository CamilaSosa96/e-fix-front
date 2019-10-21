import React from 'react'
import { Redirect } from 'react-router-dom'
import {isAuthored, createUser} from '../efixService'
import NavigationBar from '../components/NavigationBar'
import { Button, Icon } from '@blueprintjs/core'
import CreateUser from '../components/CreateUser'

class HomeScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            goCreate: false, 
            goSeeAll: false,
            goLogin: false,
            createUser: false,
            loggedUser: ''
        }
        this.closeDialog = this.closeDialog.bind(this)
        this.createUser = this.createUser.bind(this)
    }

    componentDidMount(){
        isAuthored((error, response) => {
            if(error){this.setState({goLogin: true})}
            else this.setState({loggedUser: response.data.user})
        })
    }

    closeDialog(){
        this.setState({createUser: false})
    }

    createUser(user, pass){
        createUser(user, pass, (err, _res) => {
            if(err) console.log(err)
            this.setState({createUser: false})
        })
    }

    render(){
        return (
            <div>
                <NavigationBar/>
                {this.state.goLogin && <Redirect to='/login'/>}
                {this.state.goCreate && <Redirect to='/createOrder'/>}
                {this.state.goSeeAll && <Redirect to='/orders'/>}
                {this.state.createUser && <CreateUser isOpen={this.state.createUser}
                                                      closeDialog={this.closeDialog}
                                                      createUser={this.createUser}/>}
                <div style={{textAlign: 'center'}}>
                    <div>
                    <Button style={{width:'500px', marginTop: '100px'}}
                            onClick={() => this.setState({goCreate: true})}
                            icon={<Icon icon='add' iconSize='25'/>}
                            intent='success'> 
                        <h1>CREAR ORDEN</h1> 
                    </Button>
                    </div>
                    <div>
                    <Button style={{width:'500px', marginTop: '100px'}}
                            onClick={() => this.setState({goSeeAll: true})}
                            icon={<Icon icon='list' iconSize='25'/>}
                            intent='primary'> 
                        <h1>VER TODAS LAS ORDENES</h1>
                    </Button>
                    </div>
                    {this.state.loggedUser === 'Admin' &&
                    <div>
                        <Button style={{width:'500px', marginTop: '100px'}}
                            onClick={() => this.setState({createUser: true})}
                            icon={<Icon icon='new-person' iconSize='25'/>}
                            intent='warning'> 
                        <h1>CREAR NUEVO USUARIO</h1>
                        </Button>
                    </div>}
                </div>
            </div>
        )
    }
}

export default HomeScreen;