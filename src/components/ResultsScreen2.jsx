import React from 'react';
import OrderResult from './OrderResultBox.jsx'
import ToolBar from './ToolBar.jsx';
import EditForm from './EditForm'

class ResultScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            comp: 'search',
            msj: "Camila Sosa - Samsung Galaxy J1 Mini - [Esperando aprobación del presupuesto]"
        }
        this.msjHandler = this.msjHandler.bind(this)
        this.compHandler = this.compHandler.bind(this)
    }

    msjHandler(mensaje){
        this.setState({
            msj: mensaje
        })
    }

    compHandler(compo){
        this.setState({
            comp: compo
        })
    }

    render() {
        return (
            <div>
                <ToolBar></ToolBar>
                {this.state.comp === 'search' && <h1>Resultados de búsqueda:</h1>}
                {this.state.comp === 'search' && <OrderResult msj={this.state.msj} changeComp={this.compHandler}/>}
                {this.state.comp === 'edit' && <EditForm changeMsj={this.msjHandler}></EditForm>}
            </div>
        )
    }
}

export default ResultScreen;