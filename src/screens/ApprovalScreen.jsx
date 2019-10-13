import React from 'react'
import {searchOrderForApproval, sendClientResponse} from '../efixService'
import {Button} from '@blueprintjs/core'

class ApprovalScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            msg: "",
            approval: false,
            order: "",
            done: false
        }
        this.sendResponse = this.sendResponse.bind(this)
    }

    componentDidMount(){
        searchOrderForApproval(this.props.match.params.dni, this.props.match.params.id, (err, order)=>{
            if(err)this.setState({msg: "La orden no existe"})
            else {
                this.setState({order: order, msg: `La orden ${order.id} se encuentra en estado ${order.state}`})
                if(order.state === "ESPERANDO_PRESUPUESTO"){
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
                {!this.state.done && <div>
                {this.state.msg}
                {this.state.approval && 
                <div>
                    <p>El diagnóstico de su producto es: {this.state.order.diagnosis}</p>
                    <p>Su reparaciòn costaría: ${this.state.order.budget}</p>
                    <p>¿Desea aprobar la reparación?</p>
                    <Button onClick={()=> this.sendResponse(true)}>Aprobar</Button>
                    <Button onClick={()=> this.sendResponse(false)}>Rechazar</Button>
                </div>
                }
                </div>}
                {this.state.done && <div>
                    <p>Muchas gracias por responder, ya puede cerrar esta ventana</p>
                    </div>}
            </div>


        )
    }

}

export default ApprovalScreen