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
            setData(requestDetail)
        }
    }

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
                                                {(data?.userfirstName) + ' ' + (data?.userlastName)}
                                            </Title>
                                            <Paragraph className=' mb-0'>
                                                {data?.usercompanyName}
                                            </Paragraph>
                                        </div>
                                    </div>
                                    <Paragraph className='paragraph'>
                                        {data?.status == 0 ? <Badge bg="badge-lg" className='badge-warning light' style={{ cursor: 'pointer'  , fontSize:"15px"}}>Pending</Badge> 
                                        : data?.status == 1 ? <Badge bg="badge-lg" className='badge-success light ' style={{ cursor: 'pointer'  , fontSize:"15px"}}>Completed</Badge> 
                                        : data?.status == 2 ? <Badge bg="badge-lg" className='badge-danger light' style={{ cursor: 'pointer' , fontSize:"15px" }}>Rejected</Badge> 
                                        : data?.status == 3 ? <Badge bg="badge-lg" className='badge-info light ' style={{ cursor: 'pointer' , fontSize:"15px" }}>Incompleted</Badge> 
                                        : data?.status == 4 ? <Badge bg="badge-lg" className='badge-danger light ' style={{ cursor: 'pointer'  , fontSize:"15px"}}>Expired</Badge> 
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
                                                    {data?.firstName ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Last Name:
                                                </Title>
                                                <Paragraph>
                                                    {data?.lastName ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Email:
                                                </Title>
                                                <Paragraph>
                                                    {data?.email ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Mobile No:
                                                </Title>
                                                <Paragraph>
                                                    {data?.mobile ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Ticket Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.ticketNumber ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Tracking Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.trackingNumber ?? '-'}
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
                                                    {data?.mcNumber ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Dot Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.dotNumber === "" ? '--' : data?.dotNumber}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    FMCSA Legal Name:
                                                </Title>
                                                <Paragraph>
                                                    {data?.fmcsa?.legal_name ?? '-'}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    FMCSA Dot Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.fmcsa?.dotNumber ?? '-'}
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