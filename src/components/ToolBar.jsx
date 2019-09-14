import React from 'react';
import '../styles/ToolBar.css';
import {withRouter} from 'react-router-dom';

class ToolBar extends React.Component {

    constructor(props){
        super(props)
        this.handleParentComponentHome = this.handleParentComponentHome.bind(this)
        this.logOut = this.logOut.bind(this)
        this.goResults = this.goResults.bind(this)
    }

    handleParentComponentHome(){
        this.props.handleComponent('home');
    }

    logOut(){
        this.props.history.push('/login');
    }

    goResults(){
        this.props.history.push('/results');
    }

    render(){
        return(
            <div className="toolbar">
                <img src="../efixlogo.png" className="minilogo" alt="E-FIX" onClick={this.handleParentComponentHome}/>
                <form className='searchbar' onSubmit={this.goResults} >
                    <input type="text" placeholder="Buscar algo"></input>
                    <input type="submit" value='Buscar'></input>
                </form>
                <button  className="logOutButton" onClick={this.logOut}> SALIR </button>
            </div>
        )
    }
}

export default withRouter(ToolBar);