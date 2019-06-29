import React, { Component } from 'react';
import "./custom.css";
import { getUser, updateUser } from '../controllers/user';
import { isAuthenticated } from '../controllers/auth';
import Loading from '../components/Loading';
import { Link } from "react-router-dom";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            fileSize: 0,
            loading: false,
            error: '',
            message: ''
        };

        this.loadProfile = this.loadProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidValue = this.isValidValue.bind(this);
    }

    loadProfile(userId) {
        this.setState({ loading: true} );
        getUser(userId)
        .then( (user) => {
            if(!user || user.error || user._id != isAuthenticated().user._id) {
            } else {
                this.setState({
                    username: user.username,
                    photo: user.photo
                })
            }
            this.setState({ loading: false} );
        })
    }

    isValidValue() {
        const { password, username, fileSize } = this.state;
        if (username.length === 0) {
            this.setState( {error: "Name is required", loading: false} );
            return false;
        }
        if (fileSize > 1000000) {
            this.setState( {error: "The file size must less than 100kb", loading: false} );
            return false;
        }
        if (password.length >= 1 && password.length < 6) {
            this.setState({error: "Password must contain at least 6 characters", loading: false});
            return false;
        }
        if(!/\d+/.test(password) && password.length >= 6) {
            this.setState({error: "Password must contain at least one numeric", loading: false});
            return false;
        }
        return true
    }

    handleChange(type) {
        return (e) => {
            
            if(type === "photo") {
                this.setState({
                    [type]: e.target.files[0],
                    fileSize: e.target.files[0].size
                });
                this.userData.set(type, e.target.files[0]);
            } else {
                this.setState({
                    [type]: e.target.value,
                });
                this.userData.set(type, e.target.value);
            }
            
            
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true} );
        if( this.isValidValue() ) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            updateUser(userId, token, this.userData)
            .then( () => {
                this.setState( {loading: false} );
            })
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.loadProfile(userId);
        this.userData = new FormData();

        let buttonAvatar = document.getElementById("button-choose-image");
        
        if (buttonAvatar) {
            let inputAvatar = document.getElementById("profile-avatar");
            buttonAvatar.addEventListener("click", () => {
                inputAvatar.click();
            });

            inputAvatar.addEventListener("change", (e) => {
                if (inputAvatar.files && inputAvatar.files[0]) {
                    this.preview_image(e);
                }
            })

        }
    }

    preview_image = (event) => {
        let reader = new FileReader();
        reader.onload = function () {
            let inputAvatar = document.getElementById('profile-avatart-image');
            inputAvatar.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    

    render() {
        const { username, password, photo, loading } = this.state;
        const userId = isAuthenticated().user._id;
        return (
            <>
            {loading && <Loading />}
                <div className="container mt-4">
                    
                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">
                            <img id="profile-avatart-image" className="profile-avatart-image border-r-half"
                            src={`${photo}`} alt="user-image"
                        />
                            <button className="button-choose-image" id="button-choose-image"><i className="material-icons">photo_library</i></button>
                        </legend>
                        <div className="control-group mt-4">
                            <form onSubmit={this.handleSubmit} className="form-group profile-edit-form" name="profile-edit-form">
                                <div className="form-group">
                                    <label className="control-label input-label">Username :</label>
                                    <input type="text" className="form-control" name="username" 
                                        value={username}
                                        onChange={this.handleChange('username')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="control-label input-label">Password :</label>
                                    <input type="password" className="form-control" name="password"
                                        value={password}
                                        onChange={this.handleChange('password')}
                                    />
                                </div>
                                <input type="file" className="d-none" name="profile-avatar" id="profile-avatar"
                                    onChange={this.handleChange('photo')}
                                />
                                <button type="submit" className="btn btn-raised btn-sm btn-primary mr-4">Save change</button>
                                <Link to={`/user/${userId}`}><button type="button" className="btn btn-raised btn-sm">Cancel</button></Link>
                            </form>
                        </div>
                    </fieldset>
                </div>
            </>
        )
    }
}

export default EditProfile;