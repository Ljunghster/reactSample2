import React from 'react';
import axios from 'axios';

class HighScore extends React.Component {
    state = {
        isLoading: true,
        scores: []
    }

    componentDidMount() {
        axios.get('/api/scores')
            .then(scores => {
                console.log(scores)
                this.setState({
                    isLoading: false,
                    scores: scores.data
                })
            })
    }

    componentDidUpdate() {
        if (!this.state.isLoading) {
            this.submitNewScore();
        }
    }

    submitNewScore = () => {
        const urlParams = new URLSearchParams(window.location.search);

        if(urlParams.get('score') && urlParams.get('time')) {
            const name = prompt('Enter your name');

            axios.post('/api/scores', {
                name,
                score: Number(urlParams.get('score')),
                time: Number(urlParams.get('time'))
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return <img src="https://i.pinimg.com/originals/f6/65/6a/f6656aa6fdb6b8f905dea0bcc2d71dd8.gif" />
        }

        return (
            <>
            {this.state.scores.map(score => (
                <div key={score._id}>
                    <p>Name: {score.name}</p>
                    <p>Score: {score.score}</p>
                </div>
            ))}
            </>
        );

    }
}

export default HighScore;
