import React from 'react';

class NewOrder extends React.Component{

    render(){
        return (
            <div>
                <h1>Ingrese los datos</h1>
                <form className='createForm'>
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

export default NewOrder;