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
                <Card style={{width: '800px', 
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                            }}>
                    {!this.state.done && 
                    <div>
                        <p style={{ textAlign: 'center', fontSize: '20px'}}>
                        Su producto <b>{this.state.order.brand} {this.state.order.model}</b> se encuentra {stateTextForClient(this.state.order.state)}
                        </p>
                        {this.state.approval && 
                        <div>
                            <p>El diagnóstico de su producto es: {this.state.order.diagnosis}</p>
                            <p>Su reparaciòn costaría: ${this.state.order.budget}</p>
                            <p>¿Desea aprobar la reparación?</p>
                            <Button onClick={()=> this.sendResponse(true)}>Aprobar</Button>
                            <Button onClick={()=> this.sendResponse(false)}>Rechazar</Button>
                        </div>}
                    </div>}
                    {this.state.done && 
                    <div>
                        <p>Muchas gracias por responder, ya puede cerrar esta ventana</p>
                    </div>}
                </Card>
            </div>
        )
    }
}

export default ApprovalScreen