import React, { Component } from 'react';
import Loading from '../components/Loading';
import { signup } from '../controllers/auth'
import './custom.css';
class Signup extends Component {
    constructor() {
        super();
        this.state ={
            username: '',
            email: '',
            password: '',
            error: '',
            loading: false,
            message: '',
            alert: ''
        }

        this.chageHandle = this.chageHandle.bind(this);
    }

    chageHandle (type) {
        return (e) => {
            this.setState({
                [type]: e.target.value
            })
        }
    }

    submitHandle = (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;
        this.setState({
            loading: true
        });

        signup({
            username, email, password
        })
        .then( data => {
            console.log(data)
            if(data.error) {
                this.setState( {loading: false, message: data.error, alert: 'danger'} );
            } else {
                this.setState( {loading: false, message: data.message, alert: 'success'} );
                document.getElementById("signup-form").reset();
            }
        })
    }
    
    render() {
        const { loading, message, alert } = this.state;
        return (
            <>
                {loading && <Loading />}
                <div className={`alert alert-${alert}`}>{message}</div>
                <div className="container mt-4">
                    <form onSubmit={this.submitHandle} id="signup-form">
                        <div className="form-group">
                            <label htmlFor="user-email">Email adress</label>
                            <input 
                                type="text"
                                id="user-email"
                                className="form-control"
                                placeholder="example@gamil.com"
                                onChange={this.chageHandle("email")}
                                // value={}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="user-name">User name</label>
                            <input 
                                type="text"
                                id="user-name"
                                className="form-control"
                                placeholder="Enter your user name"
                                onChange={this.chageHandle("username")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                onChange={this.chageHandle("password")}
                            />
                                
                        </div>
                        <button type="submit" className="btn btn-primary btn-raised btn-sm">Submit</button>
                    </form>
                </div>
            </> 
        );
    }
}

export default Signup;