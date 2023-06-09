import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";

const NotificationDetail = () => {
    const { state } = useLocation();
    const notification = state?.notification;

    return (
        <>
            <Row className='table_custom'>
                <Col xl="12">
                    <Card className="text-white bg-dark">
                        <Card.Header>
                            <Card.Title className="text-white">Notification Detail</Card.Title>
                        </Card.Header>
                        <Card.Body className="mb-0">
                            <Card.Text>
                                <div>
                                    <label className="label-name">Title:</label>
                                    {notification?.title ? notification?.title : '-'}
                                </div>
                            </Card.Text>
                            <Card.Text>
                                <div>
                                    <label className="label-name">Message:</label>
                                    {notification?.message ? notification?.message : '-'}
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl="12">
                    <Card className="text-white bg-dark">
                        <Card.Header>
                            <Card.Title className="text-white">User Detail</Card.Title>
                        </Card.Header>
                        <Card.Body className="mb-0">
                            {notification?.users.length > 0 ?
                                <Card.Text>
                                    <div>
                                        {
                                            notification?.users?.map((item, index) => {
                                                return (
                                                    <>
                                                        <div key={index}>
                                                            <Card.Text>
                                                                <div>
                                                                    <label className="label-name">User Name:</label>
                                                                    {item?.fullName}
                                                                </div>
                                                            </Card.Text>
                                                            <Card.Text>
                                                                <div>
                                                                    <label className="label-name">Email:</label>
                                                                    {item?.email?.text}
                                                                </div>
                                                            </Card.Text>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </Card.Text> : ''}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default NotificationDetail