import React from 'react';
import {withRouter} from 'react-router-dom';

class EditScreen extends React.Component {

    nextPath(path) {
        this.props.history.push(path)
      }

    render(){
        return (
            <div className="editando">
                <h1>Editar datos</h1>
                ID de la orden: 1
                <form onSubmit={() => this.nextPath('/resuits')} className="moverforma">
                    <input  type="text" placeholder="Nombre Cliente" value="Camila Sosa"/> <br/>
                    <input  type="text" placeholder="DNI Cliente" value="42345"/> <br/>
                    <input  type="text" placeholder="Tipo de producto" value="Smartphone"/> <br/>
                    <input  type="text" placeholder="Marca" value="Samsung"/> <br/>
                    <input  type="text" placeholder="Modelo" value="J1 Mini"/> <br/>
                    <input type="text" placeholder="Falla" value="No enciende"/> <br/>
                    <input  type="text" placeholder="Diagnostico"/> <br/>
                    <input  type="text" placeholder="Presupuesto"/> <br/>
              
                    <input type="radio" name="status" value="recibido" checked/> Recibido <br/>
                    <input type="radio" name="status" value="esperando"/> Esperando aprobación del presupuesto <br/>
                    <input type="radio" name="status" value="Reparado"/> Reparado <br/>
                    <input type="radio" name="status" value="canceled"/> Reparación cancelada <br/>
                    <input type="radio" name="status" value="delivered"/> Entregado <br/>

                    <input  type="submit" value="Actualizar Orden"  />
                </form>
            </div>
        )
    }
}

export default withRouter(EditScreen);