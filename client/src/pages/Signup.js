import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
    handleSubmit = async (event) => {
        event.preventDefault()

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            await axios.post('/api/users/register', {
                email,
                password
            });
            this.props.history.push('/')
        } catch (error) {
                console.log(error);
        }
    }

    render() {
        return (
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
        )
    }
}

export default Signup;
