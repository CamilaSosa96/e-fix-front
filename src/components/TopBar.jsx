import React from 'react';
import '../styles/TopBar.css';
import {withRouter} from 'react-router-dom';

class TopBar extends React.Component {

    nextPath(path) {
        this.props.history.push(path);
      }

    render(){
        return(
            <div className="toolbar">
                <img src="../efixlogo.png" className="minilogo" alt="E-FIX"/>
                <form className='searchbar'>
                    <input type="text" placeholder="Buscar algo"></input>
                    <input type="submit" value='Buscar'></input>
                </form>
                <button  className="logOutButton" onClick={() => this.nextPath('/login') }> SALIR </button>
            </div>
        )
    }
}

export default withRouter(TopBar);