import React, { Component } from 'react';
import {Collapse} from 'react-collapse';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';
import moment from 'moment';

class QuestionDetail extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            nameValue: '',
            isOpened: true,
            // visible: 'hidden',
            next: {},
            checked: '',
            selectedRadioOption: '',
            targetCheckboxesDOM: [],
            checkDate: new Date(),
            time: moment(),
            idxRadio: '',
            checkedItems: [],
            contactNumber: '',
            errors: [],
            answers: [],
            selectedEmployementStatus: 'Health',
            buttonState: 'Submit'
            
        };

        this.handleClick = this.handleClick.bind(this);
        this.toggleCollapsible = this.toggleCollapsible.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onChangeRadio = this.onChangeRadio.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    validateInput(e, question) {
        if(question.validations.length>0 ) {
            var regex = /\d+/g;
            var msg1 = question.validations[0]['message'];
            var min = msg1.match(regex);  // creates array from matches

            var msg2 = question.validations[1]['message'];
            var max = msg2.match(regex);  // creates array from matches

            if((e.target.value.length < min)
                || e.target.value.length == 0
                || (e.target.value.length > max)) {
                this.setState({
                    errors: [...this.state.errors, 
                        msg1, msg2
                    ]
                })
            } else {
                this.setState({
                    errors: []
                });
            }
        }
    }

    handleCheckbox(i, e) {
       if(e.target.checked) {
            this.setState({
                checkedItems: [...this.state.checkedItems, e.target.value],
                // We need it to unselect in case of 'Cancel'
                targetCheckboxesDOM: [...this.state.targetCheckboxesDOM, e.target]
            });
       } else {
           // Otherwise the user has unchecked the checkbox, thereby it should be removed
           // from the checkedItems array
           console.log('Unchecking: ', e.target.value);
           this.setState({
                checkedItems: this.state.checkedItems.filter((item) => {
                    return item != e.target.value
                })
           });
       }
    }

    toggleCollapsible() {
        this.setState({
            isOpened: !this.state.isOpened,
            buttonState: 'Edit'
        });
    }

    updateNameValue(evt) {
        console.log(evt.target.value);
        this.setState({
            nameValue: evt.target.value
        });
        localStorage.setItem('name', evt.target.value);
     
        // this.props.handler({'name': evt.target.value});        
    }

    handleCancel(e, question) {
        console.log(e.target);
        switch(question.type) {
            case "TEXT":
               localStorage.removeItem('name');
               return this.setState({
                    nameValue: '',
                    // visible: 'hidden'
                })

            // case "RADIO": 
            //     return this.setState({
            //         answers: []
            //     })

            case "DATE": 
                localStorage.removeItem('birthdate');
                return this.setState({
                    time: moment()
                })
            
            case "CHECKBOX":
                localStorage.removeItem('inssurances');
                console.log(this.state.targetCheckboxesDOM);
              
                this.state.targetCheckboxesDOM.map((checkbox, i) => {
                   console.log(checkbox.checked= !checkbox.checked)
                });

                return this.setState({
                    checkedItems: [],
                    targetCheckboxesDOM: []
                })

            case "NUMBER":
                localStorage.removeItem('contactNumber');
                return this.setState({
                    contactNumber: ''
                })
        } 
    }

    onChangeRadio(i, selectedRadioOption){
        console.log(selectedRadioOption);
        this.setState({
            checked:i,
            selectedRadioOption: selectedRadioOption,
        });
        localStorage.setItem('gender', this.state.selectedRadioOption);
        localStorage.setItem('checked', this.state.checked);
    }

    handleSelect(e) {
        this.setState({
            checkedItem: e.target.value
        });
    }

    handleClick() {
        if(localStorage.getItem("name") == undefined
            && this.state.nameValue != '') {
            localStorage.setItem('name', this.state.nameValue);
        }

        if(localStorage.getItem("gender") == undefined
            || this.state.selectedRadioOption != '') {
            localStorage.setItem('gender', this.state.selectedRadioOption);
        }

        if(localStorage.getItem("birthdate") == undefined
            && this.state.time instanceof moment
            && this.state.time.year() < moment().year()) {
                let bday = this.state.time.day() + '-' 
                            + this.state.time.month + '-'
                            + this.state.time.year
            localStorage.setItem('birthdate', moment(this.state.time, 'yyyy-mm-dd').calendar());
        }

        if(localStorage.getItem("inssurances") == undefined
            && this.state.checkedItems.length > 0) {
            localStorage.setItem('inssurances', JSON.stringify(this.state.checkedItems));
        }

        // this.state.selectedEmployementStatus
        if(localStorage.getItem("employmentStatus") == undefined
            || this.state.selectedEmployementStatus != 'Employee') {
            localStorage.setItem('employmentStatus', this.state.selectedEmployementStatus);
        }

        if(localStorage.getItem("contactNumber") == undefined
            && this.state.contactNumber != '') {
            localStorage.setItem('contactNumber', this.state.contactNumber);
        }

        console.log(this.state.selectedRadioOption);
        this.setState({
            isOpened: false,
            isAnswered: true
        });
        this.props.handler();
    }

    handleNumber(e) {
        this.setState({
            contactNumber: (e.target.value)
        });
        // this.props.handler({"contactNumber": e.target.value});
    }

    section() {
        switch(this.props.question.type) {
            case 'TEXT':
                if(localStorage.getItem("name")!=undefined) {
                    this.state.nameValue = localStorage.getItem("name");
                   
                }
                return (
                  <div>
                    <div className="input-field col s6">
                        <input placeholder="Enter your name" 
                            id="first_name" 
                            type="text" 
                            className="validate"
                            value={this.state.nameValue}
                            onKeyDown={e => this.validateInput(e, this.props.question)}
                            onChange={(e) => this.updateNameValue(e)} 
                            />
                    </div>
                  </div>
                );            
            case 'RADIO': 
                return ( 
                    <div>
                        {
                            this.props.question.options.map((option, i) => {
                                if(localStorage.getItem('gender') != undefined) {
                                    if(option['text'] === localStorage.getItem('gender')) {
                                        this.state.checked = i;
                                        console.log("RADIO: ", localStorage.getItem('gender'));
                                    }
                                }
                                return <label className="radio-label" key={option['key']}>
                                    <input 
                                        type="radio"
                                        className={this.props.question.title}
                                        checked={ (this.state.checked === i) ? true : false }
                                        key={option['key']}
                                        onChange={this.onChangeRadio.bind(this,i, option['text'])}
                                        value={option['text']}/>
                                    {option['text']}
                                </label>
                            })
                        }
                    </div>
                );
            
            case 'DATE':
                // REF: https://steemit.com/react/@maxiee/rc-calendar-beginner-tutorial-a-beautiful-react-calendar-component
                const calendar = (<Calendar/>);
                return (
                    <div>
                        <DatePicker
                            animation="slide-up"
                            value={this.state.time}
                            disabled={false}
                            calendar={calendar}
                            onChange={value => this.setState({time: value})}
                        >{
                            ({value}) => {
                                return (
                                    <input 
                                        value={value ? value.format('YYYY-MM-DD') : ''}
                                        onChange={(e) => {this.setState({time: value})}}
                                        style={{marginLeft:'1rem'}}
                                    />
                                )
                            }
                        }</DatePicker>
                    </div>
                );
            case 'CHECKBOX': {
                return (
                    <div>
                      {
                        this.props.question.options.map((option, i) => {
                            return (
                                <div key={option['key']} className="checkbox-div">              
                                    <label htmlFor={option['text']} 
                                            key={option['key']}
                                            className="label-checkbox">
                                    <input
                                        id={option['text']}
                                        type="checkbox" 
                                        key={i}
                                        onChange={(e) => this.handleCheckbox(i, e)}
                                        value={option['text']}
                                    />
                                    {option['text']}
                                    </label>    
                                </div>
                            );
                        })
                      }
                    </div>
                );
            }

            case 'SELECT': {
                return (
                    <div>
                        <select className="browser-default" 
                            value={this.state.selectedEmployementStatus}
                            onChange={(e) => { this.setState({
                                selectedEmployementStatus: e.target.value
                            })} }>
                            {
                                this.props.question.options.map((option, i) => {
                                    return (<option 
                                                key={option['key']}
                                                value={option['text']}>
                                                {option['text']}
                                            </option>)
                                })
                            }
                        </select>
                    </div>
                );
            }
            case 'NUMBER': {
                // console.log(this.state);
                return (
                    <input
                        type="number"
                        placeholder="Please insert you contact number"
                        onInput={() => this.handleNumber}
                        style={{marginLeft:'1rem'}}
                        onChange={()=>{}}
                        value={this.state.contactNumber}
                        onKeyDown={e => this.validateInput(e, this.props.question)}
                    />
                );
            }

            default: 
                return (<div>Other case</div>);
        }
    }

    render() {
        return (
            // console.log(this.state.nameValue);
            <Collapse isOpened={this.state.isOpened}>
                <div className="row content-wrapper">
                    <div className="col s12">
                        <span>{this.props.question.description}
                        </span>  
                    </div>

                    {this.section()}
                
                    <div className="col s12">
                        <a onClick={this.handleClick} 
                        className="waves-effect waves-light btn-large"
                        disabled={this.state.errors.length>0}
                        >
                        {this.state.buttonState}
                        </a>
                        <a></a>
                        <a onClick={(e) => this.handleCancel(e, this.props.question)} 
                                    className="cancel" href="#">Cancel</a>
                    </div>
                </div>
            </Collapse>
        );
    }
}

export default QuestionDetail;