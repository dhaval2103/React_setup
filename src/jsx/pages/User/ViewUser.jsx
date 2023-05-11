import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import { Empty, Table } from 'antd';
import moment from "moment";
import dummy from "../../../images/dummy.png";


const ViewUser = () => {
    const { state } = useLocation();
    const userDetail = state?.userDetail;
    const [data, setData] = useState([]);

    const getDetail = () => {
        if (userDetail) {
            var newArr = [];
            for (var i = 0; i < userDetail?.user.length; i++) {
                newArr.push(
                    {
                        key: i,
                        email: userDetail?.user[i]?.email?.text,
                        id: userDetail?.user[i]?._id,
                        mobile: userDetail?.user[i]?.mobile?.text,
                        role: userDetail?.user[i]?.role,
                        fullName: userDetail?.user[i]?.fullName,
                        createdAt: userDetail?.user[i]?.createdAt
                    }
                )
            }
            setData(newArr)
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
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
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
            title: 'Role',
            dataIndex: 'role',
            render: (text) => {
                if (text == 1) {
                    return (
                        <span>Master</span>
                    )
                } else if (text == 2) {
                    return (
                        <span >User</span>
                    )
                }
                else if (text == 3) {
                    return (
                        <span >Pro</span>
                    )
                } else {
                    return (
                        <span >-</span>
                    )
                }
            }
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
        <>
            <Row>
                <Col xl="6">
                    <div className="custome_card bg-dark text-white mb-4">
                    <div class="row gy-4">
                        <div class="col-md-12 col-lg-4">
                            <div class="img_wrapper_h100">
                            <img src={userDetail?.profilePic ? userDetail?.profilePic : dummy}  class="imaga_fluid" alt="" />
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-8">
                            <div class="text_content">
                                <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-user" aria-hidden="true"></i> &nbsp; {userDetail?.fullName ? userDetail?.fullName : '-'}</p>
                                <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp; {userDetail?.email ? userDetail?.email : '-'}</p>
                                <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-flag" aria-hidden="true"></i> &nbsp; {userDetail?.countryCode ? userDetail?.countryCode : '-'}</p>
                                <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-phone-square" aria-hidden="true"></i> &nbsp; {userDetail?.mobile ? userDetail?.mobile : '-'}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </Col>
                {/* <Col xl="6">
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
                </Col> */}
            </Row>

           { userDetail?.role == 1 ?<div className="card">
                <div className="card-header">
                    <h4 className="card-title">Shared User</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            data && data.length > 0 ?
                                <Table dataSource={data} columns={columnss} /> : <Empty />
                        }
                    </div>
                </div>
            </div> :''}

        </>
    )
}

export default ViewUser