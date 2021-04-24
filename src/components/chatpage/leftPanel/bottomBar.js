import React, { Component } from 'react'
import {Link } from "react-router-dom";
import  "../../../css/chatpage.css";

 class bottomBar extends Component {
    render() {
        return (
            <div id="bottom-bar" className="bottom-bar">
                <button id="addcontact" className="addcontact"> <Link to = "/peopleList" ><i className="fa fa-user-plus fa-fw" ></i><span>Add Contact</span></Link></button>
                <button id="settings" className="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
            </div>
        )
    }
}

export default bottomBar
