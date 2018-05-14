import React, { Component } from 'react';
import moment from 'moment';
import SkyLight from 'react-skylight';


class Addtraining extends Component {
    constructor(props){
        super(props);
        this.state={date: '', duration: '', activity: '', customer: this.props.link};
    }
    

    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newTraining = {date: moment(this.state.date, 'DD/MM/YYYY', true).format(), duration: this.state.duration, activity: this.state.activity}
        this.props.addTraining(newTraining);
        this.animated.hide();
    }


    render() {
        return (
            <div>
                <SkyLight
                    hideOnOverlayClicked ref={ref => this.animated = ref}
                    title="Add training" transitionDuration={5000}>
                    <form>
                        <div className="form-group">
                        <input placeholder="Date" className="form-control" name="date" placeholder='DD/MM/YYYY' onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Duration" className="form-control" name="duration" value={this.state.duration} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                        <input placeholder="Customer" className="form-control" name="customer"  readOnly={true} onChange={this.handleChange}/>
                        </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                        </form>
        </SkyLight>
        <button className="btn btn-primary" onClick={() => this.animated.show()}>Add training </button>
            </div>
        );
    };
}

export default Addtraining;