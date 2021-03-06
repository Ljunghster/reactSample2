import React from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

class Signup extends React.Component {
    handleSubmit = async (event) => {
        event.preventDefault()

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await axios.post('/api/users/register', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            this.props.history.push('/')
        } catch (error) {
            console.log(error);
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
                        <button type="submit">Signup</button>
                    </div>
                </form>
            </>
        )
    }
}

export default Signup;
