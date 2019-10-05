import React from 'react'
import { Redirect } from "react-router-dom"
import NavigationBar from '../components/NavigationBar'
import { Button } from "@blueprintjs/core"

class HomeScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            goCreate: false, 
            goSeeAll: false
        }
    }

    render(){
        return (
            <div>
                <NavigationBar/>
                {this.state.goCreate && <Redirect to="/createOrder"/>}
                {this.state.goSeeAll && <Redirect to="/orders"/>}
                <div style={{}}>
                    <Button onClick={() => this.setState({goCreate: true})}
                            style={{marginRight: '20px'}}
                            intent='success'> 
                        <h1>CREAR ORDEN</h1> 
                    </Button>
                    <Button onClick={() => this.setState({goSeeAll: true})}
                            intent='primary'> 
                        <h1>VER TODAS LAS ORDENES</h1> 
                    </Button>
            </div>
            </div>
        )
    }
}

export default HomeScreen;