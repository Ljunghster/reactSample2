import React from 'react';
import axios from 'axios';
import { Container, Card } from 'semantic-ui-react';
import Post from './Post';

class Posts extends React.Component {
    state ={
        isLoading: true,
        posts: []
    }

    componentDidMount() {
        setInterval(async () => {
            const posts = await axios.get('/api/posts',
                {},
                {
                    headers: {
                        Authorization: `jwt ${localStorage.getItem('token')}`
                    }
                }
            );
            
            this.setState({
                isLoading: false,
                posts: posts.data
            });
        }, 1500);
    }

    render() {
        return (
            <>
            <Container>
                <Post />
                {this.state.posts.map(post => {
                    return (
                        <Card key={post._id}>
                            <Card.Description>
                                <p>{post.message}</p>
                            </Card.Description>
                        </Card>
                    );
                })}
            </Container>
            </>
        );
    }
}

export default Posts;
