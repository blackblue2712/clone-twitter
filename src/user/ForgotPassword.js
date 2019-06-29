import React, {Component} from 'react';
import {forgotPassword} from '../controllers/auth';
class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            message: "",
            error: '',
            email: ''
        }
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    forgotPassword(e) {
        e.preventDefault();
        let email = this.state.email;
        forgotPassword(email)
        .then( (result) => {
            if(result.message) this.setState( {message: result.message} )
            if(result.error) this.setState( {error: result.error} )
        });
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Ask for Password Reset</h2>

                {this.state.message && (
                    <em className="text-success small text-muted">{this.state.message}</em>
                )}
                {this.state.error && (
                    <em className="text-warning small ">{this.state.error}</em>
                )}

                <form>
                    <div className="form-group mt-5">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email address"
                            value={this.state.email}
                            name="email"
                            onChange={e =>
                                this.setState({
                                    email: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.forgotPassword}
                        className="btn btn-raised btn-primary btn-sm"
                    >
                        Send Password Rest Link
                    </button>
                </form>
            </div>
        )
    }
}

export default ForgotPassword;