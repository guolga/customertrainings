import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import moment from 'moment';
import { CSVLink, CSVDownload } from 'react-csv';


class Traininglist extends Component {
    constructor(props) {
        super(props);

        this.state = { trainings: [] };

    }

    componentDidMount() {
        this.loadTrainings();
    }


    //Load trainings from REST API
    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(res => res.json())
            .then(resData => {
                this.setState({ trainings: resData });
            })
    }

    //Delete trainings
    onDelClick = (value) => {
        const link = 'https://customerrest.herokuapp.com/api/trainings/' + value;

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(link, { method: 'DELETE' })
                            .then(res => this.loadTrainings())
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



    render() {

        return (
            <div className='container'>
                <h2>Trainings</h2>
                <div className="row">
                    <CSVLink data={this.state.trainings} style={{ margin: 15 }}>Download CSV</CSVLink>
                </div>
                <ReactTable
                    data={this.state.trainings}
                    filterable

                    columns={[
                        {
                            columns: [
                                {
                                    id: 'date',
                                    Header: "Date",
                                    accessor: d => { return new Date(d.date).toLocaleDateString() }
                                },
                                {
                                    Header: "Duration in min",
                                    accessor: "duration"
                                },
                                {
                                    Header: "Activity",
                                    accessor: "activity"
                                },
                                {
                                    Header: "Customer",
                                    accessor: "customer.lastname"
                                },
                                {
                                    id: 'button',
                                    sortable: false,
                                    Header: "",
                                    accessor: "links[0].href",
                                    filterable: false,
                                    Cell: ({ value }) => (<button className=" btn btn-danger" onClick={() => { this.onDelClick(value) }}>Delete</button>)
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


export default Traininglist;
