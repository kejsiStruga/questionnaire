// Functional component dont need state
import React, { Component } from 'react';
import Question from './question';

class Questions extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            questionList: this.props.currentArr,
            answeredList: this.props.answered
        }
        this.handler = this.handler.bind(this)
    }    

    // parent-child communication
    handler() {
        this.props.handler();
        this.setState({
            questionList: [...this.state.questionList, this.props.next]
        })
    }

    render() {
        const questions = this.state.questionList.length > 0 ? (
            this.state.questionList.map(question => {
                if(question!=null) {
                    return (<Question question={question}
                                next={this.state.next}
                                handler={this.handler}
                                key={question.id}
                            />
            )
                }
            })
        ) : (
           <p className="center">No questions available!</p>
        );

        return (
            <div className="questions collection">
                {questions}
            </div>
        );
    }
}

export default Questions;