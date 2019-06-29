import React, {Component} from 'react';
import { resetPassword } from '../controllers/auth';
class ResetPassword extends Component {

    constructor() {
        super();
        this.state = {
            password: "",
            error: "",
            message: ""
        }

        this.resetPassword = this.resetPassword.bind(this)
    }

    resetPassword(e) {
        e.preventDefault();
        const password = this.state.password;
        const resetPasswordToken = this.props.match.params.resetPasswordToken
        resetPassword(password, resetPasswordToken)
        .then(data => {
            if(data.error) {
                this.setState( {error: data.error} );
            } else {
                this.setState( {message: data.message, newPassword: ""} );
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Reset your Password</h2>

                {this.state.message && (
                    <em className="text-success small">{this.state.message}</em>
                )}
                {this.state.error && (
                    <em className="text-warning small">{this.state.error}</em>
                )}

                <form>
                    <div className="form-group mt-5">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Your new password"
                            value={this.state.password}
                            name="password"
                            onChange={e => {
                                this.setState({
                                    password: e.target.value,
                                    error: "",
                                    message: ""
                                })
                            }}
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.resetPassword}
                        className="btn btn-raised btn-primary"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        )
    }
}

export default ResetPassword;