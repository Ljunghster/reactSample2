import React from 'react';
import axios from 'axios';
import { Container, Card } from 'semantic-ui-react';
import Post from './Post';
import Comment from './Comment';

class Posts extends React.Component {
    state ={
        isLoading: true,
        posts: [],
        userId: ''
    }

    componentDidMount() {
        setInterval(async () => {
            const posts = await axios.get('/api/posts',
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

        (async () => {
            const {data} = await axios.get('/api/user', {
                headers: { Authorization: `jwt ${localStorage.getItem('token')}` }
            });

            this.setState({
                userId: data._id
            });
        })();
    }

    deletePost = async (postId) => {
        await axios.delete('/api/posts/' + postId, {
            headers: {
                Authorization: `jwt ${localStorage.getItem('token')}`,
            },
        });
    }

    render() {
        return (
            <>
            <Container>
                <Post />
                {this.state.posts.map(post => {
                    return (
                        <>
                            <Card key={post._id}>
                                <Card.Description>
                                    <p>{post.message}</p>
                                </Card.Description>
                                <Card.Description>
                                    <Comment postId={post._id} />
                                </Card.Description>
                            </Card>
                            {this.state.userId === post.userId ? <button onClick={() => this.deletePost(post._id)}>Delete</button>: ''}
                        </>
                    );
                })}
            </Container>
            </>
        );
    }
}

export default Posts;
