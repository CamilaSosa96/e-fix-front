import React from 'react'
import {getSettings} from '../efixService'
import {stateIconSelector, stateColorSelector} from '../handlers/StateStyleHandler'
import {Dialog, Icon, InputGroup, Checkbox, Button, Divider} from '@blueprintjs/core'

class AdminInfo extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            emailAuth: false,
            name: '',
            email: '',
            phone: '',
            prefRecived: false,
            prefBudget: false,
            prefRepairing: false,
            prefTakeBackNoRepair: false,
            prefRepaired: false,
            prefTookBackNoRepair: false,
            prefDelivered: false,
        }
        this.closeDialog = this.closeDialog.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSettings = this.handleSettings.bind(this)
    }

    componentDidMount(){
        getSettings((_err, result) => {
            const info = result.data[0]
            this.setState({
                emailAuth: info.email_auth,
                name: info.nombre,
                email: info.email,
                phone: info.telefono,
                prefRecived: info.RECIBIDO,
                prefBudget: info.ESPERANDO_PRESUPUESTO,
                prefRepairing: info.REPARACION,
                prefTakeBackNoRepair: info.RETIRAR_SINARREGLO,
                prefRepaired: info.REPARADO,
                prefTookBackNoRepair: info.CANCELADA,
                prefDelivered: info.ENTREGADO,
            })
        })
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleSettings(){
        this.props.handleSettings(this.state)
    }

    closeDialog(){
        this.props.close()
    }

    render(){
        return(
            <div>
                <Dialog isOpen={this.props.open}
                        onClose={this.closeDialog}
                        title={<p style={{fontSize: '30px', 
                                          textAlign: 'center',
                                          width: '380px',
                                          marginTop: '12px',}}>
                                Configuración</p>}
                        icon={<Icon style={{marginRight: '10px', marginTop: '7px', color: 'grey'}}
                                    icon='cog' 
                                    iconSize='30'/>}>               
                        <b style={{textAlign:'center', 
                                   fontSize:'20px', 
                                   marginBottom: '10px',
                                    marginTop:'5px'}}>
                            Información de la empresa
                        </b> 
                    <div style={{textAlign:'center'}}>
                        <div style={{display:'inline-block', marginRight:'20px', color:'grey'}}>
                            <Icon icon='office'
                                  iconSize='100'/>
                        </div>
                        <div style={{display: 'inline-block', width:'250px'}}>
                            <InputGroup style={{marginBottom:'10px'}}
                                        type='text' 
                                        name='name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder='Nombre'/>
                            <InputGroup style={{marginBottom:'10px'}}
                                        type='email' 
                                        name='email'
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder='Correo electrónico'/>
                            <InputGroup style={{marginBottom:'10px'}}
                                        type='text'
                                        name='phone'
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        placeholder='Teléfono'/>
                        </div>           
                        <Divider/>
                    </div>
                    <b style={{textAlign:'center', fontSize:'20px'}}>Preferencias de envio de correo</b>
                    <div style={{marginLeft:'20px'}}>
                    <p style={{marginTop: '5px'}}><b>Enviar correo al cliente para notificarle: </b></p>
                    <Checkbox checked={this.state.prefRecived}
                              onChange={() => this.setState({prefRecived: !this.state.prefRecived})}>
                        <Icon style={{marginRight:'5px'}}
                            icon={stateIconSelector('RECIBIDO')} 
                            color={stateColorSelector('RECIBIDO')}/>
                        Que el producto fue recibido.</Checkbox>
                    <Checkbox checked={this.state.prefBudget}
                              onChange={() => this.setState({prefBudget: !this.state.prefBudget})}>
                        <Icon style={{marginRight:'5px'}}
                            icon={stateIconSelector('ESPERANDO_PRESUPUESTO')} 
                            color={stateColorSelector('ESPERANDO_PRESUPUESTO')}/>
                        Que debe aprobar el presupuesto de la reparación del producto.</Checkbox>
                    <Checkbox checked={this.state.prefRepairing}
                              onChange={() => this.setState({prefRepairing: !this.state.prefRepairing})}>
                        <Icon style={{marginRight:'5px'}}
                            icon={stateIconSelector('REPARACION')} 
                            color={stateColorSelector('REPARACION')}/>
                        Que el producto se encuentra en reparación.</Checkbox>
                    <Checkbox checked={this.state.prefTakeBackNoRepair}
                              onChange={() => this.setState({prefTakeBackNoRepair: !this.state.prefTakeBackNoRepair})}>
                        <Icon style={{marginRight:'5px'}}
                            icon={stateIconSelector('RETIRAR_SINARREGLO')} 
                            color={stateColorSelector('RETIRAR_SINARREGLO')}/>
                        Que el producto está listo para retirar sin reparar.</Checkbox>
                    <Checkbox checked={this.state.prefRepaired}
                              onChange={() => this.setState({prefRepaired: !this.state.prefRepaired})}>
                        <Icon style={{marginRight:'5px'}}
                            icon={stateIconSelector('REPARADO')} 
                            color={stateColorSelector('REPARADO')}/>
                        Que el producto fue reparado.</Checkbox>
                    <Checkbox checked={this.state.prefTookBackNoRepair}
                              onChange={() => this.setState({prefTookBackNoRepair: !this.state.prefTookBackNoRepair})}>
                        <Icon style={{marginRight:'5px'}}
                            icon={stateIconSelector('CANCELADA')} 
                            color={stateColorSelector('CANCELADA')}/>
                        Que el producto fue retirado sin reparar.</Checkbox>
                    <Checkbox checked={this.state.prefDelivered}
                              onChange={() => this.setState({prefDelivered: !this.state.prefDelivered})}>
                        <Icon style={{marginRight:'5px'}}
                            icon={stateIconSelector('ENTREGADO')} 
                            color={stateColorSelector('ENTREGADO')}/>
                        Que el producto fue retirado reparado.</Checkbox>
                    </div>
                    <Button style={{width:'480px',
                                    marginTop:'7px', 
                                    marginBottom:'5px',
                                    marginLeft:'10px',
                                    textAlign:'center',
                                    color:'white',
                                    backgroundColor: this.state.emailAuth ? 'orange' : 'blue'}}
                            minimal={true}
                            icon={<Icon icon='envelope' color='white'/>}>
                        {this.state.emailAuth ? <b>USAR OTRO CORREO PARA ENVIAR LAS NOTIFICACIONES</b> : 
                        <b>AUTORIZAR CORREO PARA ENVIAR LAS NOTIFICACIONES</b>}
                    </Button>
                    <Divider/>
                    <Button style={{width:'480px',
                                    marginTop:'7px', 
                                    marginBottom:'5px',
                                    marginLeft:'10px',
                                    textAlign:'center',
                                    color:'white',
                                    backgroundColor: 'green'}}
                            minimal={true}
                            icon={<Icon icon='saved' color='white'/>}
                            onClick={this.handleSettings}>
                        <b>GUARDAR CAMBIOS</b>
                    </Button>
                </Dialog>
            </div>
        )
    }
}

export default AdminInfo