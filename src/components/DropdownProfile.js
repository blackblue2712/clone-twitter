import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../public/js/custom";
import { isAuthenticated, signout } from '../controllers/auth';

class DropdownProfile extends Component {
    render() {
        return (
            <li className="position-relative nav-item-dropdown">
                <img className="border-r-half profile-thumb profile-thumb-sm" id="profile-toggle"
                    src={`${this.props.imageURL}`} alt="user-image"
                />
                <div className="user-dropdown" id="user-dropdown">
                    <div className="dropdown-caret position-absolute">
                        <span className="caret-outer position-absolute"></span>
                    </div>
                    <div className="dropdown-content">
                        <ul className="py-3 px-0 dropdown-content-list">
                            <li className="px-3">
                                <Link to={`/user/${isAuthenticated().user._id}`} >
                                    <p className="m-0 lead font-weight-bold">{this.props.username}</p>
                                    <span className="text-muted">@{this.props.email}</span>
                                </Link>
                            </li>
                            <li className="dropdown-line"></li>
                            <li className="hover">
                                <Link className="d-flex align-items-center" to={`/user/${isAuthenticated().user._id}`}><i className="material-icons">person</i>Profile</Link>
                            </li>
                            <li className="hover">
                                <Link className="d-flex align-items-center" to={`/user/edit/${isAuthenticated().user._id}`}><i className="material-icons">settings</i>Edit profile</Link>
                            </li>
                            <li className="hover">
                                <Link
                                    className="d-flex align-items-center"
                                    to="/"
                                    onClick={() => signout( () => {window.location="/signin"})}    
                                >
                                    <i className="material-icons">subdirectory_arrow_left</i>Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>  
            </li>
        )
    }
}

export default DropdownProfile;