/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import firebase from '../utils/firebase';

import Menu from './Menu';


class Post extends React.Component {
    state = {
        image: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/create-post',
                {
                    message: e.target.message.value,
                    image: this.state.image,
                },
                {
                    headers: { Authorization: `jwt ${localStorage.getItem('token')}` }
                }
            );
            e.target.message.value = '';
            e.target.file.value=''
        } catch (exception) {
            console.error(exception);
        }
    }

    uploadFile = (event) => {
        const [file] = event.target.files;
        const ext = file.name?.substring(file.name.lastIndexOf('.') + 1, file.name.length) || file.name;

        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'svg' && ext !== 'gif' && ext !== 'png') {
            alert('Sorry, you can only upload images.');
            return;
        }

        if (file && file.name) {
            const storage = firebase.storage();
            // get file name from input type file
            const imageRef = storage.ref(`images/${event.target.files[0].name}`);
            
            imageRef.put(event.target.files[0])
            .then(file => imageRef.getDownloadURL())
            .then(url => {
                console.log(url)
                this.setState({ image: url });
            })
        }
    }

    render() {
        return (
            <div>
                <Menu history={this.props.history} />
                <Form onSubmit={this.handleSubmit}>
                    <Form.TextArea name="message" />
                    <input type="file" name="file" onChange={this.uploadFile} />
                    <Form.Button type="submit">Create Post</Form.Button>
                </Form>
            </div>
        )
    }
}

export default Post;
