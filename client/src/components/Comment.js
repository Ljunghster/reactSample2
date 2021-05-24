import React from 'react';
import axios from 'axios';

class Comment extends React.Component {
    state = {
        isLoading: true,
        comments: [],
    }

    componentDidMount() {
        setInterval(async () => {
            const postComments = await axios.get(`/api/comments/${this.props.postId}`,
                {
                    headers: {
                        Authorization: `jwt ${localStorage.getItem('token')}`
                    }
                }
            );

            this.setState({
                isLoading: false,
                comments: postComments.data.reverse()
            });
        }, 1000);
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`/api/comments/${this.props.postId}`,
                { comment: e.target.comment.value },
                {
                    headers: { Authorization: `jwt ${localStorage.getItem('token')}` }
                },
            );
            e.target.comment.value = '';
        } catch (err) {
            alert(err.message);
        }
    }

    deleteComment = async (commentId) => {
        await axios.delete(`/api/comments/${commentId}`, {
            headers: { Authorization: `jwt ${localStorage.getItem('token')}` }
        });
    }

    render() {
        console.log('userid ', this.props.userId);

        this.state.comments.forEach(comment => {
            console.log('Comment UserId ', comment.userId)
        })

        //console.log(this.state.comments);

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="comment" />
                    <button type="submit">Create Comment</button>
                </form>
                <h6>Comments</h6>
                <ul>
                    {this.state.comments.map(({ _id, comment, userId }) => (
                        <li key={_id}>
                            <span>{comment}</span>
                            {this.props.userId == userId || this.props.userId === this.props.ownerId ? <button type="button" onClick={() => this.deleteComment(_id)}>X</button> : ''}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default Comment;
