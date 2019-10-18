import React from 'react'
import {searchOrderForApproval, sendClientResponse} from '../efixService'
import {Button, Navbar, Card} from '@blueprintjs/core'
import {stateTextForClient} from '../handlers/StateStyleHandler'

class ApprovalScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            approval: false,
            order: '',
            done: false
        }
        this.sendResponse = this.sendResponse.bind(this)
    }

    componentDidMount(){
        searchOrderForApproval(this.props.match.params.dni, this.props.match.params.id, (err, order)=>{
            if(err)this.setState({msg: 'La orden a la que trata de acceder no existe'})
            else {
                this.setState({order: order})
                if(order.state === 'ESPERANDO_PRESUPUESTO'){
                    this.setState({approval: true})
                }
            }
        })
    }

    sendResponse(choice){   
        sendClientResponse(this.state.order.id, this.state.order.dni, choice, (response)=>{
            this.setState({done: true})
        })
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
                <Card style={{width: '1000px', 
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                            }}>
                    {!this.state.done && 
                    <div>
                        <p style={{ textAlign: 'center', fontSize: '20px'}}>
                        <p>Su producto <b>{this.state.order.brand} {this.state.order.model}</b> {stateTextForClient(this.state.order.state).msg1}</p>
                        <p>{stateTextForClient(this.state.order.state).msg2}</p>
                        </p>
                        {this.state.approval && 
                        <div style={{ textAlign: 'center', fontSize: '20px'}}>
                            <p>Para reparar su producto, se necesita: <b>{this.state.order.diagnosis}</b></p>
                            <p>Su reparación costaría: <b>${this.state.order.budget}</b></p>
                            <p>¿Desea aprobar la reparación?</p>
                            <Button style={{height: '60px', fontSize:'30px', marginTop: '15px', marginRight: '100px'}}
                                    onClick={()=> this.sendResponse(true)}
                                    intent='success'>
                                <b>Aprobar</b>
                            </Button>
                            <Button style={{height: '60px', fontSize:'30px', marginTop: '15px'}}
                                    onClick={()=> this.sendResponse(false)}
                                    intent='danger'>
                                <b>Rechazar</b>
                            </Button>
                        </div>}
                    </div>}
                    {this.state.done && 
                    <div style={{ textAlign: 'center', fontSize: '20px'}}>
                        <p>Muchas gracias por responder, ya puede cerrar esta ventana.</p>
                    </div>}
                </Card>
            </div>
        )
    }
}

export default ApprovalScreen