import React from 'react'
import {searchOrderForApproval, sendClientResponse} from '../efixService'
import {Button, Navbar, Card, Alert, Icon} from '@blueprintjs/core'
import {stateTextForClient} from '../handlers/StateStyleHandler'

class ApprovalScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            approval: false,
            order: '',
            done: false,
            exists: true,
            choice: '',
            confirmation: false
        }
        this.sendResponse = this.sendResponse.bind(this)
        this.onConfirmation = this.onConfirmation.bind(this)
    }

    componentDidMount(){
        searchOrderForApproval(this.props.match.params.dni, this.props.match.params.id, (err, order)=>{
            if(err)this.setState({exists: false})
            else {
                this.setState({order: order})
                if(order.state === 'ESPERANDO_PRESUPUESTO'){
                    this.setState({approval: true})
                }
            }
        })
    }

    sendResponse(choice){   
        this.setState({choice: choice, confirmation: true})
    }

    onConfirmation(){
        sendClientResponse(this.state.order.id, this.state.order.dni, this.state.choice, (_response)=>{
            this.setState({confirmation: false, done: true})
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
                         src='http://localhost:3000/efixlogo.png' 
                         alt='E-FIX'/>    
                </Navbar>     
                <Navbar style={{backgroundColor: '#5B1790',
                                height: '70px',
                                position: 'absolute', bottom: '0'}}/> 
                <Alert confirmButtonText={this.state.choice ? 'Aprobar reparación' : 'Rechazar reparación'}
                       cancelButtonText='Volver'
                       intent={this.state.choice ? 'success' : 'danger'}
                       isOpen={this.state.confirmation}
                       icon={<Icon style={{marginRight: '10px',
                                           color: this.state.choice ? 'green' : 'red', 
                                           display: 'inline-block'}}
                                    icon= {this.state.choice ? 'confirm' : 'warning-sign'} 
                                    iconSize='50'/>}
                        onCancel={() => this.setState({confirmation: false})}
                        onConfirm={this.onConfirmation}>
                        <p>
                            ¿Está seguro de que desea <b>{this.state.choice ? 'aceptar ' : 'rechazar '}</b>
                            la reparación de su producto <b>{this.state.order.brand} 
                            {this.state.order.model}</b> por el costo de <b>${this.state.order.budget}</b> ?
                        </p>
                </Alert>        
                <Card style={{maxWidth: '1200px',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                            }}>
                    {!this.state.done && this.state.exists &&
                    <div>
                        <div style={{width: '900px', textAlign: 'center', fontSize: '20px'}}>
                        <p>Su producto <b>{this.state.order.brand} {this.state.order.model}</b> {stateTextForClient(this.state.order.state).msg1}</p>
                        <p>{stateTextForClient(this.state.order.state).msg2}</p>
                        </div>
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
                    {!this.state.exists &&
                    <div style={{ textAlign: 'center', fontSize: '20px'}}>
                        <p>La orden solicitada no existe.</p>
                    </div>}
                </Card>
            </div>
        )
    }
}

export default ApprovalScreen