import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Addcustomer from './Addcustomer.js';
import Editcustomer from './Editcustomer.js';
import Addtraining from './Addtraining.js';
import { CSVLink, CSVDownload } from 'react-csv';


class Customerlist extends Component {
    constructor(props) {
        super(props);

        this.state = { customers: [] };

    }

    componentDidMount() {
        this.loadCustomers();
    }


    //Load customers from REST API
    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(res => res.json())
            .then(resData => {
                this.setState({ customers: resData.content });
            })
    }

    //Delete customers
    onDelClick = (idLink) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(idLink, { method: 'DELETE' })
                            .then(res => this.loadCustomers())
                            .catch(err => console.error(err))
                        toast.success("Delete succeed", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                    }
                },
                {
                    label: 'No',
                }
            ]
        })
    };

    //Add customer 
    addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(res => this.loadCustomers())
            .catch(err => console.error(err))
    }

    //Edit customer
    updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(res => this.loadCustomers())
            .catch(err => console.error(err))
    }

    //Add training to customer
    addTraining = (link, training) => {
        console.log(link);

        fetch('https://customerrest.herokuapp.com/api/trainings/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {'date': this.state.date, 'activity': this.state.activity, 'duration': this.state.duration,'customer': link,
                }
            )
        })
            .then(
                  toast.success("Training added", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
            .catch(err => console.error(err))


        }


        render() {

            return (
                <div className='container'>
                    <h2>Customers</h2>
                    <div className="row">
                        <Addcustomer addCustomer={this.addCustomer} />
                        <CSVLink data={this.state.customers} style={{ margin: 15 }}>Download CSV</CSVLink>
                    </div>
                    <ReactTable
                        data={this.state.customers}
                        filterable

                        columns={[
                            {
                                columns: [
                                    {
                                        Header: "Firstname",
                                        accessor: "firstname"
                                    },
                                    {
                                        Header: "Lastname",
                                        accessor: "lastname"
                                    },
                                    {
                                        Header: "Street address",
                                        accessor: "streetaddress"
                                    },
                                    {
                                        Header: "Post code",
                                        accessor: "postcode"
                                    },
                                    {
                                        Header: "City",
                                        accessor: "city"
                                    },
                                    {
                                        Header: "Email",
                                        accessor: "email"
                                    },
                                    {
                                        Header: "Phone",
                                        accessor: "phone"
                                    },
                                    {
                                        id: 'button',
                                        sortable: false,
                                        Header: "",
                                        accessor: "links[0].href",
                                        filterable: false,
                                        Cell: ({ value }) => (<button className="btn btn-danger" onClick={() => { this.onDelClick(value) }}>Delete</button>)
                                    },
                                    {
                                        id: 'button',
                                        sortable: false,
                                        Header: "",
                                        accessor: "links[0].href",
                                        filterable: false,
                                        Cell: ({ row, value }) => (<Editcustomer updateCustomer={this.updateCustomer} link={value} customer={row} />)
                                    },

                                    {
                                        id: 'button',
                                        sortable: false,
                                        filterable: false,
                                        Header: "",
                                        accessor: "links[0].href",
                                        Cell: ({ row, value }) => (<Addtraining addTraining={this.addTraining} link={value} customer={row} />)
                                      },
                                ]
                            },

                        ]}
                        defaultPageSize={20}
                        style={{
                            height: "600px"
                        }}
                        className="-striped -highlight"
                    />
                    <ToastContainer autoClose={1500} />
                </div>
            );
        }
    }


    export default Customerlist;
