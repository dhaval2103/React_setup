import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";

const ViewUser = () => {
    const { state } = useLocation();
    const userDetail = state?.userDetail;
    
    return (
        <>
            <Row>

                <Col xl="6">
                    <Card className="text-white bg-dark">
                        <Card.Header>
                            <Card.Title className="text-white">User Detail</Card.Title>
                        </Card.Header>
                        <Card.Body className="mb-0">
                            <Card.Text>
                                <i class="fa fa-user" aria-hidden="true"></i> {userDetail?.fullName ? userDetail?.fullName : '-'}
                            </Card.Text>
                            <Card.Text>
                                <i class="fa fa-envelope" aria-hidden="true"></i> {userDetail?.email ? userDetail?.email : '-'}
                            </Card.Text>
                            <Card.Text>
                                <i class="fa fa-phone-square" aria-hidden="true"></i> {userDetail?.mobile ? userDetail?.mobile : '-'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl="6">
                    <Card className="text-white bg-dark">
                        <Card.Header>
                            <Card.Title className="text-white">Security Question/Answer</Card.Title>
                        </Card.Header>
                        <Card.Body className="mb-0">
                            <Card.Text>
                                Q: {userDetail?.securityQuestion ? userDetail?.securityQuestion : '-'}
                            </Card.Text>
                            <Card.Text>
                                A: {userDetail?.answer ? userDetail?.answer : '-'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl="6">
                    <Card className="text-white bg-dark">
                        <Card.Header>
                            <Card.Title className="text-white">User Question/Answer</Card.Title>
                        </Card.Header>
                        <Card.Body className="mb-0">
                            <Card.Text>
                                Q: {userDetail?.yourQuestion ? userDetail?.yourQuestion : '-'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default ViewUser