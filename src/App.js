import React, { Component } from 'react';
import Questions from './questions';
import Summary from './summary';
import questions from './resources/questions.json'

class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: questions,
      next: '',
      answered: [],
      current: 0,
      currentArr: [questions[0]],
      finished: false
    }
    localStorage.clear();
    this.handler = this.handler.bind(this);
  }

  handler () {
      if(this.state.currentArr.length < this.state.questions.length) {
        this.setState({
          currentArr: [...this.state.currentArr, this.state.currentArr.length],
          next: this.state.questions[this.state.currentArr.length]
        });
      } else {
        this.setState({
          finished: true
        })
      }
  }

  render() {
    return (
      <div className="questionnaire-app container">
        <h1 className="center blue-text">Questionnaire</h1>
        {
          !this.state.finished ? (
              <Questions 
                questions = {this.state.questions}
                currentArr={this.state.currentArr}
                next={this.state.questions[this.state.currentArr.length]}
                handler={this.handler}/>
          ) : (
            <Summary />
          )
        }
      </div>
    );
  }
}

export default App;
