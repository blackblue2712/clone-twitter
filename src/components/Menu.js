import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../controllers/auth';
import { getUser } from '../controllers/user';

import './custom.css';
import DropdownProfile from './DropdownProfile';

class Menu extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            photo: '',
            email: '',
            error: '',
            loading: false
        }

        this.isActive = this.isActive.bind(this);
        this.loadProfile = this.loadProfile.bind(this);
    }

    isActive(history, path) {
        if(history.location.pathname === path) {
            return "active";
        }
        return "";
    }

    loadProfile(userId) {
        getUser(userId)
        .then( data => {
            if(data.error) this.setState({error: data.error, loading: false})
            else this.setState({
                username: data.username,
                photo: data.photo,
                email: data.email
            })
        })
    }

    componentDidMount () {
        if(isAuthenticated().token) {
            const userId = isAuthenticated().user._id;
            this.loadProfile(userId);
        }
    }


    render() {
        const {username, photo, email} = this.state;
        return (
            <nav className="navbar navbar-expand-sm  py-0 menu-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav d-flex align-items-center w-100">
                            <li className={`nav-item ${this.isActive(this.props.history, "/")}`}>
                                <Link className="nav-link" to="/">
                                    <i className="material-icons">code</i>Home
                                </Link>
                            </li>
                            
                            <li className="ml-auto pull-right">
                                <ul className="navbar-nav d-flex align-items-center w-100">
                                    <li className="">
                                        <form>
                                            <input className="form-control" type="text" name="name" placeholder="Search Liar" />
                                        </form>
                                    </li>
                                    {!isAuthenticated() ?
                                        <>
                                            <li className={`nav-item ${this.isActive(this.props.history, "/signup")}`}>
                                                <Link className="nav-link" to="/signup"><i className="material-icons">arrow_upward</i>Sign up</Link>
                                            </li>
                                            <li className={`nav-item ${this.isActive(this.props.history, "/signin")}`}>
                                                <Link className="nav-link" to="/signin"><i className="material-icons">subdirectory_arrow_right</i>Sign in</Link>
                                            </li>
                                        </>
                                    :
                                        <>
                                            <DropdownProfile imageURL={photo} email={email} username={username} />
                                        </>
                                    }     
                                    
                                </ul>
                                
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>
            
        );
    }
}

export default withRouter(Menu);


