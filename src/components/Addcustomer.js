import React, { Component } from 'react';
import SkyLight from 'react-skylight';


class Addcustomer extends Component {
    constructor(props) {
        super(props);
        this.state = { firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' };
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newCustomer = { firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone }
        this.props.addCustomer(newCustomer);
        this.animated.hide();
    }


    render() {
        return (
            <div>
                <SkyLight
                    hideOnOverlayClicked ref={ref => this.animated = ref}
                    title="Add customer" transitionDuration={5000}>
                    <form>
                        <div className="form-group">
                            <input placeholder="Firstname" className="form-control" name="firstname" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Lastname" className="form-control" name="lastname" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Street address" className="form-control" name="streetaddress" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="City" className="form-control" name="city" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Email" className="form-control" name="email" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Phone" className="form-control" name="phone" onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </form>
                </SkyLight>
                <button style={{ margin: 10 }} className="btn btn-primary" onClick={() => this.animated.show()}>Add customer </button>
            </div>
        );
    };
}

export default Addcustomer;