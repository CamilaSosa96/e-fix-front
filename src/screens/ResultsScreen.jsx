import React from 'react';
import TopBar from '../components/TopBar.jsx';
import OrderResult from '../components/OrderResult.jsx'

class ResultScreen extends React.Component {

    render() {
        return (
            <div>
                <TopBar></TopBar>
                <h1>Resultados:</h1>
                <OrderResult msj="Camila Sosa - Samsung Galaxy J1 Mini - [Recibido]"></OrderResult>
            </div>
        )
    }
}

export default ResultScreen;