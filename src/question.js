import React, { Component } from 'react';
import QuestionDetail from './questiondetail';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            inputValue: 'answeredanswered',
            isOpened: true,
            isValid: false,
            isAnswered: false,
            visibleIcon: 'hidden',
            visibleQuestion: 'visible',
            answers: [], 
            next: {}
        };
        this.handleClick = this.handleClick.bind(this);
        this.toggleCollapsible = this.toggleCollapsible.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChild = this.handleChild.bind(this);
    }

    toggleCollapsible(e) {
        e.preventDefault();
        this.setState({
            isOpened: !this.state.isOpened,
            // visibleQuestion: (this.state.visibleQuestion==='visible') ? 'hidden' : 'visible'
        });
    }

    handleClick() {
        this.setState({
            isOpened: !this.state.isOpened,
            isAnswered: true,
        });
        this.props.handler();
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    handleChild() {
        this.setState({
            visibleIcon: 'visible'
        });
        this.props.handler();
    }

    handleCancel() {
        this.setState({
            inputValue: '',
        });
    }

    render() {
        // console.log(this.props.next);
            return (
                <form>
                    <div 
                         className="collection-item" 
                         key={this.props.question.id}>
                        <div className="row">
                            <div className="col s12" onClick={(e) => this.toggleCollapsible(e)} >
                                <span className="flow-text">{this.props.question.title}
                                </span>  
                            </div>  
                            <i className="small material-icons icon-green" 
                               style={{visibility: this.state.visibleIcon}}>
                                fiber_manual_record
                            </i>    
                        </div>
                        {
                            (this.state.isOpened) ? 
                            (
                                <QuestionDetail 
                                question={this.props.question} 
                                handler={this.handleChild}/>
                            ) : (<div></div>)
                        }
                     
                    </div>
                </form>
            )
    }

}

export default Question;