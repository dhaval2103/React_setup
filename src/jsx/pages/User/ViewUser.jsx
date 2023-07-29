import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col, Button } from "react-bootstrap";
import { Empty, Table } from 'antd';
import moment from "moment";
import dummy from "../../../images/dummy.png";
import UserService from '../../../services/user';


const ViewUser = () => {
    const { state } = useLocation();
    const userDetail = state?.userDetail;
    const [data, setData] = useState([]);
    
    const [expandedIndices, setExpandedIndices] = useState([]);

    // Function to toggle the FMCSA details for a specific user
    const toggleFMCSA = (index) => {
        setExpandedIndices((prevIndices) => {
        const newIndices = [...prevIndices];
        newIndices[index] = !newIndices[index]; // Toggle the state for the clicked user
        return newIndices;
        });
    };

    useEffect(() => {
        getDetail();
    }, [])

    const getDetail = () => {
        if (userDetail) {
            // Call the API to fetch carrier details by dotNumber
            UserService.carrierDetails({ dotNumber: userDetail?.dotNumber })
                .then((res) => {
                    console.log('res',res);
                    setData(res.data); // Update the state with fetched data
                })
                .catch((error) => {
                    console.log(error);
                    setData([]); // If an error occurs, reset the data to an empty array
                });
        }
    }

    const columnss = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            render: (text) => (
                <div>
                    {text + 1}
                </div>
            ),
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Company name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Dot number',
            dataIndex: 'dotNumber',
            key: 'dotNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => (
                <div>
                    {moment(text).format("DD MMM YYYY h:mm A")}
                </div>
            ),
        },
    ];

    useEffect(() => {
        getDetail();
    }, [])

    return (
        <Row>
            {data.map((carrierData, index) => (
                <Col key={index} md={8} lg={6} className="mb-4">
                    <div className="card custome_card bg-dark text-white">
                        <div className="card-body">
                            <h5 className="card-title mb-4">
                                {carrierData.user?.firstName ? carrierData?.user.firstName : "-"}
                            </h5>
                            <p className="card-text">
                                Last Name: {carrierData.user?.lastName ? carrierData.user?.lastName : "-"}
                            </p>
                            <p className="card-text">
                                Company Name:{" "}
                                {carrierData.user?.companyName ? carrierData.user?.companyName : "-"}
                            </p>
                            <p className="card-text">
                                DOT Number: {carrierData.user?.dotNumber ? carrierData.user?.dotNumber : "-"}
                            </p>
                            <p className="card-text">
                                Email: {carrierData.user?.email ? carrierData.user?.email : "-"}
                            </p>
                            <p className="card-text">
                                Mobile: {carrierData.user?.mobile ? carrierData.user?.mobile : "-"}
                            </p>
                            <hr />
                            <Button variant="primary" onClick={() => toggleFMCSA(index)}>
                                {expandedIndices[index] ? "Hide FMCSA Details" : "Show FMCSA Details"}
                            </Button>
                            {expandedIndices[index] && (
                                <div className="fmcsa-details">
                                    <h6 className="card-subtitle mt-3"></h6>
                                    <p className="card-text">
                                        Entity Type:{" "}
                                        {carrierData?.entity_type
                                        ? carrierData?.entity_type
                                        : "-"}
                                    </p>
                                    <p className="card-text">
                                        Legal Name:{" "}
                                        {carrierData?.legal_name
                                        ? carrierData?.legal_name
                                        : "-"}
                                    </p>
                                    <p className="card-text">
                                        Mailing Address:{" "}
                                        {carrierData?.mailing_address
                                        ? carrierData?.mailing_address
                                        : "-"}
                                    </p>
                                    <p className="card-text">
                                        MC/MX/FF Numbers:{" "}
                                        {carrierData?.mc_mx_ff_numbers
                                        ? carrierData?.mc_mx_ff_numbers
                                        : "-"}
                                    </p>
                                    <p className="card-text">
                                        MC Number:{" "}
                                        {carrierData?.mc_number
                                        ? carrierData?.mc_number
                                        : "-"}
                                    </p>
                                    <p className="card-text">
                                        MCS-150 Form Date:{" "}
                                        {carrierData?.mcs_150_form_date
                                        ? moment(carrierData?.mcs_150_form_date).format(
                                            "DD MMM YYYY"
                                            )
                                        : "-"}
                                    </p>
                                    <p className="card-text">
                                        Phone:{" "}
                                        {carrierData?.phone ? carrierData?.phone : "-"}
                                    </p>
                                    <p className="card-text">
                                        Physical Address:{" "}
                                        {carrierData?.physical_address
                                        ? carrierData?.physical_address
                                        : "-"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
}

export default ViewUser