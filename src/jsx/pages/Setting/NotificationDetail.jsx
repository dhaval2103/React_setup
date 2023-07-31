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
                    <Card>
                        <Card.Header>
                            <Card.Title style={{fontWeight:700}}>Notification Detail</Card.Title>
                        </Card.Header>
                        <Card.Body className="mb-0">
                            <Card.Text>
                                <div>
                                    <label className="label-name" style={{fontWeight:700}}>Title :&nbsp;</label>
                                    {notification?.title ? notification?.title : '-'}
                                </div>
                            </Card.Text>
                            <Card.Text>
                                <div>
                                    <label className="label-name" style={{fontWeight:700}}>Message :&nbsp;</label>
                                    {notification?.message ? notification?.message : '-'}
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl="12">
                    <Card>
                        <Card.Header>
                            <Card.Title style={{fontWeight:700}}>User Detail</Card.Title>
                        </Card.Header>
                        {notification && notification.users && notification.users.length > 0 ? (
                            notification.users.map((item, index) => (
                                <Card key={index}>
                                    <Card.Body>
                                        <Card.Text>
                                            <div>
                                            <label className="label-name" style={{fontWeight:700}}>First Name :&nbsp;</label>
                                                {item?.firstName}
                                            </div>
                                        </Card.Text>
                                        <Card.Text>
                                            <div>
                                            <label className="label-name" style={{fontWeight:700}}>Last Name :&nbsp;</label>
                                                {item?.lastName}
                                            </div>
                                        </Card.Text>
                                        <Card.Text>
                                            <div>
                                            <label className="label-name" style={{fontWeight:700}}>Email :&nbsp;</label>
                                                {item?.email}
                                            </div>
                                        </Card.Text>
                                        <Card.Text>
                                            <div>
                                            <label className="label-name" style={{fontWeight:700}}>Mobile :&nbsp;</label>
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