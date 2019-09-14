import React from 'react';
import {withRouter} from 'react-router-dom';

class EditScreen extends React.Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render(){
        return (
            <div>
                <h1>Editar datos</h1>
                ID de la orden: 1
                <form onSubmit={() => this.nextPath('/results')}>
                    <input className='elemf' type="text" placeholder="Nombre Cliente" value="Camila Sosa"/>
                    <input className='elemf' type="text" placeholder="DNI Cliente" value="42345"/>
                    <input className='elemf' type="text" placeholder="Tipo de producto" value="Smartphone"/>
                    <input className='elemf' type="text" placeholder="Marca" value="Samsung"/>
                    <input className='elemf' type="text" placeholder="Modelo" value="J1 Mini"/>
                    <input className='elemf' type="text" placeholder="Falla" value="No enciende"/>
                    <input className='elemf' type="text" placeholder="Diagnostico"/>
              
                    <input type="radio" name="status" value="recibido" checked/> Recibido
                    <input type="radio" name="status" value="esperando"/> Esperando aprobación del presupuesto
                    <input type="radio" name="status" value="Reparado"/> Reparado
                    <input type="radio" name="status" value="canceled"/> Reparación cancelada
                    <input type="radio" name="status" value="delivered"/> Entregado

                    <input className='elemf' type="submit" value="Actualizar Orden"/>
                </form>
            </div>
        )
    }
}

export default withRouter(EditScreen);