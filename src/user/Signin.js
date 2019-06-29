import React, { Component } from 'react';
import { signin, authenticate } from '../controllers/auth';
import Loading from '../components/Loading';
import './custom.css';
class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            message: '',
            alert: '',
            redirectToHome: false
        }

        this.changeHandle = this.changeHandle.bind(this);
        this.subbmitHandle = this.subbmitHandle.bind(this);
    }

    changeHandle(type) {
        return (e) => {
            this.setState({
                [type]: e.target.value
            });
        }
    }

    subbmitHandle(e) {
        e.preventDefault();
        this.setState( {loading: true} );
        const { email, password } = this.state;
        signin({
            email, password
        })
        .then( data => {
            if(data.error) {
                this.setState({
                    message: data.error, alert: 'danger', loading: false
                });
            } else {
                authenticate(data, () => {
                    this.setState( {redirectToHome: true} )
                });
            }
        })
    }

    render() {
        const { loading, message, alert, redirectToHome } = this.state;
        if(redirectToHome) return window.location ="/";

        return (
            <>
                {loading && <Loading />}
                <div className={`alert alert-${alert}`}>{message}</div>
                <div className="container mt-4">
                    <form onSubmit={this.subbmitHandle}>
                        <div className="form-group">
                            <label htmlFor="user-email">Email adress</label>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            <input 
                                type="text"
                                id="user-email"
                                className="form-control"
                                placeholder="example@gamil.com"
                                onChange={this.changeHandle("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter your password you registered"
                                onChange={this.changeHandle("password")}
                            />
                                
                        </div>
                        <button type="submit" className="btn btn-primary btn-raised btn-sm">Submit</button>
                        <p className="mt-3">
                            <a href="/forgot-password" className="text-muted small text-primary">Forgot password?</a>
                        </p>
                    </form>
                </div>
            </>
        );
    }
}

export default Signin;