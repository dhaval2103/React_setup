import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import { Button, Empty, Table, Avatar, Divider, Typography } from 'antd';
import moment from "moment";
import dummy from "../../../images/dummy.png";
import { } from 'antd'
import { Badge, Dropdown } from "react-bootstrap";
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
    console.log(data, 'data');
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
                                                {(data?.userfirstName) + ' ' + (data?.userlastName)}
                                            </Title>
                                            <Paragraph className=' mb-0'>
                                                {data?.usercompanyName}
                                            </Paragraph>
                                        </div>
                                    </div>
                                    <Paragraph className='paragraph'>
                                        {data?.status == 0 ? <Badge bg=" badge-lg " className='badge-warning light badge-xs' style={{ cursor: 'pointer' }}>Pending</Badge> 
                                        : data?.status == 1 ? <Badge bg=" badge-lg " className='badge-success light badge-xs' style={{ cursor: 'pointer' }}>Completed</Badge> 
                                        : data?.status == 2 ? <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }}>Rejected</Badge> 
                                        : data?.status == 3 ? <Badge bg=" badge-lg " className='badge-info light badge-xs' style={{ cursor: 'pointer' }}>Incompleted</Badge> 
                                        : data?.status == 4 ? <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }}>Expired</Badge> 
                                        : ''}
                                    </Paragraph>
                                </div>
                                <Divider />
                                <div className="card_body">
                                    <Row gutter={12}>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    First Name:
                                                </Title>
                                                <Paragraph>
                                                    {data?.firstName}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Last Name:
                                                </Title>
                                                <Paragraph>
                                                    {data?.lastName}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Email:
                                                </Title>
                                                <Paragraph>
                                                    {data?.email}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Mobile No:
                                                </Title>
                                                <Paragraph>
                                                    {data?.mobile}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Ticket Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.ticketNumber}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Tracking Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.trackingNumber}
                                                </Paragraph>
                                            </Typography>
                                        </Col>

                                    </Row>
                                    <Divider />
                                    <Row gutter={12}>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    From:
                                                </Title>
                                                <Paragraph>
                                                    {data?.fromstates?.name ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    To:
                                                </Title>
                                                <Paragraph>
                                                   {data?.tostates?.name ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.mcNumber}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Dot Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.dotNumber}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    FMCSA Legal Name:
                                                </Title>
                                                <Paragraph>
                                                    {data?.fmcsa?.legal_name}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    FMCSA Dot Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.fmcsa?.dotNumber}
                                                </Paragraph>
                                            </Typography>
                                        </Col>

                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    );
}

export default ViewRequest