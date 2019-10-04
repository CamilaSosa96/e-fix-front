import React from 'react'
import {Button} from '@blueprintjs/core'

class HomeOptions extends React.Component{

    render(){
        return(
            <div style={{}}>
                    <Button onClick={() => this.props.handleComponent('newOrder')}
                            style={{marginRight: '20px'}}
                            intent='success'> 
                        <h1>CREAR ORDEN</h1> 
                    </Button>
                    <Button onClick={() => this.props.handleComponent('allOrders')}
                            intent='primary'> 
                        <h1>VER TODAS LAS ORDENES</h1> 
                    </Button>
            </div>
        )
    }
}

export default HomeOptions