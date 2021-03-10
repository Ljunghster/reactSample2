import React from 'react';
import axios from 'axios';
import { Menu as SUIMenu } from 'semantic-ui-react';

class Menu extends React.Component {
    state = {
        username: ''
    }

    async componentDidMount() {
        const {data} = await axios.get('/api/user', {
            headers: { Authorization: `jwt ${localStorage.getItem('token')}` }
        });
        this.setState({ username: data.email })
    }

    home = () => {
        this.props.history.push('/');
    }

    viewPosts = () => {
        this.props.history.push('/posts/view');
    }

    logOut = () => {
        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    render() {
        return (
            <SUIMenu>
                <SUIMenu.Item
                    name="home"
                    onClick={this.home}
                >
                    Home
                </SUIMenu.Item>

                {localStorage.getItem('token') ? (
                    <>
                        <SUIMenu.Item
                            name='posts'
                            onClick={this.viewPosts}
                        >
                            View Posts
                        </SUIMenu.Item>

                        <SUIMenu.Item
                            name='username'
                        >
                            Hello, {this.state.username}!
                        </SUIMenu.Item>
                
                        <SUIMenu.Item
                            name='logOut'
                            onClick={this.logOut}
                        >
                            Log out
                        </SUIMenu.Item>
                    </>
                ) : ''}
                

            </SUIMenu>
        )
    }
}

export default Menu;
