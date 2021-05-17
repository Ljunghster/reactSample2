import React, { Fragment } from 'react';
import axios from 'axios';
import { Container, Card } from 'semantic-ui-react';
import Post from '../components/Post';
import Comment from '../components/Comment';

class Posts extends React.Component {
    state ={
        isLoading: true,
        posts: [],
        userId: '',
        isUpdating: false,
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

    handlePostUpdate = (event) => {
        event.preventDefault();

        const message = event.target.post.value;
        const postId = event.target.postId.value;

        fetch('/api/posts/' + postId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `jwt ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
               message, 
            })
        })
        .then(() =>  this.setState({ isUpdating: false }))
        .catch(err => {
            console.log(err);
        });
    }

    renderPostUpdateForm = (postId, postMessage) => {

        return(
            <form onSubmit={this.handlePostUpdate}>
                <textarea name="post" defaultValue={postMessage} />
                <input type="hidden" name="postId" value={postId} />
                <button>Submit</button>
            </form>
        )
    }

    render() {
        return (
            <>
            <Container>
                <Post history={this.props.history} />
                {this.state.posts.map(post => {
                    return (
                        <Fragment key={post._id}>
                            <Card>
                                <Card.Description>
                                    {this.state.isUpdating ? this.renderPostUpdateForm(post._id, post.message) :
                                    /* : is false  */ 
                                    (<div onClick={() => { this.setState({ isUpdating: true }) }}>
                                        <p>{post.message}</p>
                                        {post.image ? <img src={post.image} style={{ height: '175px' }} /> : ''}
                                    </div>
                                    )}
                                </Card.Description>
                                <Card.Description>
                                    <Comment
                                        postId={post._id}
                                        userId={this.state.userId}
                                        ownerId={post.userId}
                                    />
                                </Card.Description>
                            </Card>
                            {this.state.userId === post.userId ? <button onClick={() => this.deletePost(post._id)}>Delete</button>: ''}
                        </Fragment>
                    );
                })}
            </Container>
            </>
        );
    }
}

export default Posts;
