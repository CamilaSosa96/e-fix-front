import React from 'react';
import OrderResult from './OrderResultBox.jsx'

class ResultScreen extends React.Component {

    render() {
        return (
            <div>
                <h1>Resultados:</h1>
                <OrderResult msj="Camila Sosa - Samsung Galaxy J1 Mini - [Recibido]"></OrderResult>
            </div>
        )
    }
}

export default ResultScreen;