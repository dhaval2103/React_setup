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
                                    <label className="label-name">Title :&nbsp;</label>
                                    {notification?.title ? notification?.title : '-'}
                                </div>
                            </Card.Text>
                            <Card.Text>
                                <div>
                                    <label className="label-name">Message :&nbsp;</label>
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
                        {notification && notification.users && notification.users.length > 0 ? (
                            notification.users.map((item, index) => (
                                <Card key={index} className="text-white bg-dark mb-3">
                                    <Card.Body>
                                        <Card.Text>
                                            <div>
                                            <label className="label-name">First Name :&nbsp;</label>
                                                {item?.firstName}
                                            </div>
                                        </Card.Text>
                                        <Card.Text>
                                            <div>
                                            <label className="label-name">Last Name :&nbsp;</label>
                                                {item?.lastName}
                                            </div>
                                        </Card.Text>
                                        <Card.Text>
                                            <div>
                                            <label className="label-name">Email :&nbsp;</label>
                                                {item?.email}
                                            </div>
                                        </Card.Text>
                                        <Card.Text>
                                            <div>
                                            <label className="label-name">Mobile :&nbsp;</label>
                                                {item?.mobile}
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                            ) : (
                                <div>No users to display</div>
                            )}
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default NotificationDetail