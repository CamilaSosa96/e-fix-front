import React from 'react';
import '../styles/TopBar.css';

class TopBar extends React.Component {

    render(){
        return(
            <div className="toolbar">
                <img src="../efixlogo.png" className="minilogo" alt="E-FIX"/>
            </div>
        )
    }
}

export default TopBar;