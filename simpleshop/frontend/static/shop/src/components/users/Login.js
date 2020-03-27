import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLoginFetch } from '../../actions/auth'

class Login extends Component {
    state = {
        username: "",
        password: "",
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.userLoginFetch(this.state)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    errorMessage = () => {
        if (this.props.auth.loginError === true) {
            return (
                <div className="alert alert-primary">
                    Username or password not found.
                </div>
            )
        }
    }

    render() {
        // redirect to Home if isLoggedI is true
        if (this.props.auth.isLoggedIn === true) {
            this.props.history.push('/')
        }

        return (
            <div className='row'>
                <h1 className='text-center col-md-12'>Login</h1>
                <div className='row col-md-12'>
                    <form action='' method='post' className='col-md-4 offset-4' onSubmit={this.handleSubmit}>
                        { this.errorMessage() }
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name='username' className="form-control" placeholder="Email" value={this.state.username} onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name='password' className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <button type='submit' className='btn btn-info'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: user => dispatch(userLoginFetch(user))
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)