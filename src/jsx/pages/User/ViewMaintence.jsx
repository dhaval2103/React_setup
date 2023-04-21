import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import { Empty, Table } from 'antd';
import moment from "moment";
import { Badge } from "react-bootstrap";

const ViewMaintence = () => {
    const { state } = useLocation();
    const userDetail = state?.userDetail;

    return (
        <>
            <Row>
                <Col xl="12">
                    <Card className="text-white bg-dark">
                        <Card.Header>
                            <Card.Title className="text-white">Maintenance Detail</Card.Title>
                            {userDetail?.verifyStatus == 0 ? 
                                <span className="badge badge-warning text-dark">Pending</span> :
                                userDetail?.verifyStatus == 1 ?
                                <span className="badge badge-success">Complete</span>:
                                <span className="badge badge-danger">Reject</span>
                            }
                        </Card.Header>
                        <Card.Body className="mb-0">
                            <Card.Text>
                                <div>
                                    <label className="label-name">Location:</label>
                                    {userDetail?.location ? userDetail?.location : '-'}
                                </div>
                            </Card.Text>
                            <Card.Text>
                                <div>
                                    <label className="label-name">Message:</label>
                                    {userDetail?.message ? userDetail?.message : '-'}
                                </div>
                            </Card.Text>
                            {userDetail?.attachments.length > 0 ?
                            <Card.Text>
                                <label className="label-name">Attachments:</label>
                                <div>
                                    {
                                        userDetail?.attachments?.map((item) => {
                                            return (
                                                <>
                                                    <img src={process.env.REACT_APP_PROFILE_URL + 'images/' + item} alt="" width="70px" height="70px" />
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </Card.Text>:''}

                        </Card.Body>
                    </Card>
                </Col>

            </Row >
        </>
    )
}

export default ViewMaintence