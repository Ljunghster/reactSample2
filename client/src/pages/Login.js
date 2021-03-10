import React from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

class Login extends React.Component {
    handleSubmit = async event => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password
            });
            localStorage.setItem('token', data.token);
            this.props.history.push('/');
        } catch(err) {
            console.error(err)
        }
    }

    render() {
        return (
            <>
                <Menu history={this.props.history} />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </>
        )
    }
}

export default Login;
