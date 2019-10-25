import React from 'react'
import { Redirect } from 'react-router-dom'
import {isAuthored, createUser} from '../efixService'
import NavigationBar from '../components/NavigationBar'
import CreateUser from '../components/CreateUser'
import { Button, Icon, Toaster} from '@blueprintjs/core'


class HomeScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            goCreate: false, 
            alertForCreate: false,
            goSeeAll: false,
            goLogin: false,
            createUser: false,
            loggedUser: ''
        }
        this.closeDialog = this.closeDialog.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this.createUser = this.createUser.bind(this)
    }

    refHandlers = { toaster: (ref) => this.toaster = ref,}

    componentDidMount(){
        isAuthored((error, response) => {
            error ? this.setState({goLogin: true}) : this.setState({loggedUser: response.data.user})
        })
    }

    closeDialog(){
        this.setState({createUser: false})
    }

    closeAlert(){
        this.setState({alertForCreate: false})
    }

    createUser(user, pass){
        createUser(user, pass, (error, _res) => {
            if(error.message === 'Request failed with status code 409') {
                this.setState({alertForCreate: true})
            }
           else {
                this.setState({createUser: false})
                this.toaster.show({timeout:'3500', 
                                   icon: 'new-person',
                                   message: 'El usuario fue creado satisfactoriamente', 
                                   intent: 'success'}) 
           }
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
                                                      closeAlert={this.closeAlert}
                                                      createUser={this.createUser}
                                                      alert={this.state.alertForCreate}/>}
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
                    <Toaster position='top' ref={this.refHandlers.toaster} />
                </div>
            </div>
        )
    }
}

export default HomeScreen