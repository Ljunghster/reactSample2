import React from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import Menu from '../components/Menu';

class Post extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/create-post',
                { message: e.target.message.value },
                {
                    headers: { Authorization: `jwt ${localStorage.getItem('token')}` }
                }
            );
            e.target.message.value = '';
        } catch (exception) {
            console.error(exception);
        }
    }

    render() {
        return (
            <div>
                <Menu history={this.props.history} />
                <Form onSubmit={this.handleSubmit}>
                    <Form.TextArea name="message" />
                    <Form.Button type="submit">Create Post</Form.Button>
                </Form>
            </div>
        )
    }
}

export default Post;
