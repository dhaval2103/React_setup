import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import { Button, Empty, Table, Avatar, Divider, Typography } from 'antd';
import moment from "moment";
import dummy from "../../../images/dummy.png";
import { } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';


const ViewRequest = () => {
    const { state } = useLocation();
    const requestDetail = state?.requestDetail;
    const [data, setData] = useState([]);

    const getDetail = () => {
        if (requestDetail) {
            // var newArr = [];
            // for (var i = 0; i < requestDetail?.user.length; i++) {
            //     newArr.push(
            //         {
            //             key: i,
            //             email: requestDetail?.user[i]?.email?.text,
            //             id: requestDetail?.user[i]?._id,
            //             mobile: requestDetail?.user[i]?.mobile?.text,
            //             role: requestDetail?.user[i]?.role,
            //             fullName: requestDetail?.user[i]?.fullName,
            //             createdAt: requestDetail?.user[i]?.createdAt
            //         }
            //     )
            // }
            setData(requestDetail)
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
        <Row>
            <Col xl="Col-lg-12">
                <Card>
                    <div className="main_test_wrapper">
                        <div className='container'>
                            <div className="request_detail_card">
                                <div className="card_header d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <Avatar size={64} icon={<UserOutlined />} />
                                        <div className="text_content">
                                            <Title level={5} className=''>
                                                Thomos John
                                            </Title>
                                            <Paragraph className=' mb-0'>
                                                Thomos Trucking LLC
                                            </Paragraph>
                                        </div>
                                    </div>
                                    <Paragraph className='paragraph'>
                                        expired
                                    </Paragraph>
                                </div>
                                <Divider />
                                {/* <div className="card_body">
                                    <Row gutter={12}>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    1212343434
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    1212343434
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    1212343434
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    1212343434
                                                </Paragraph>
                                            </Typography>
                                        </Col>

                                    </Row>
                                    <Divider />
                                    <Row gutter={12}>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    1212343434
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    1212343434
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    1212343434
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    1212343434
                                                </Paragraph>
                                            </Typography>
                                        </Col>

                                    </Row>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    );
}

export default ViewRequest