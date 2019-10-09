import React from 'react'
import { Redirect } from 'react-router-dom'
import {isAuthored} from '../efixService'
import NavigationBar from '../components/NavigationBar'
import { Button, Icon } from '@blueprintjs/core'

class HomeScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            goCreate: false, 
            goSeeAll: false,
            goLogin: false
        }
    }

    componentDidMount(){
        isAuthored((error, response) => {
            if(error){this.setState({goLogin: true})}
        })
    }

    render(){
        return (
            <div>
                <NavigationBar/>
                {this.state.goLogin && <Redirect to='/login'/>}
                {this.state.goCreate && <Redirect to='/createOrder'/>}
                {this.state.goSeeAll && <Redirect to='/orders'/>}
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
                </div>
            </div>
        )
    }
}

export default HomeScreen;