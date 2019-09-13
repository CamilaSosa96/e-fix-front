import React from 'react';
import TopBar from './TopBar';
import {withRouter} from 'react-router-dom';

class NewOrder extends React.Component{

    constructor(props){
        super(props);
        this.volver = this.volver.bind(this);
    }

    volver(){
        this.nextPath("/message");
        }

    nextPath(path) {
        this.props.history.push(path);
      }

    render(){
        return (
            <div>
                <TopBar></TopBar>
                <h1>Ingrese los datos</h1>
                <form onSubmit={this.volver} className='createForm'>
                    <input className='elemf' type="text" placeholder="Nombre Cliente"/>
                    <input className='elemf' type="text" placeholder="DNI Cliente"/>
                    <input className='elemf' type="text" placeholder="Tipo de producto"/>
                    <input className='elemf' type="text" placeholder="Marca"/>
                    <input className='elemf' type="text" placeholder="Modelo"/>
                    <input className='elemf' type="text" placeholder="Falla"/>
                    <input className='elemf' type="submit" value="Crear Orden"/>
                </form>
            </div>
        )
    }
}

export default withRouter(NewOrder);