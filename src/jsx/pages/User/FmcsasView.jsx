import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import {Button, Empty, Table, Avatar, Divider, Typography } from 'antd';
import { useLocation } from "react-router-dom"; 
import { UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import moment from "moment";


const FmcsasView = (props) => {
  const location = useLocation()
  console.log("location", location.state);
  const data = location?.state?.state;

  return (
    <>
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
                                               {data?.legal_name}
                                            </Title>
                                            <Paragraph className=' mb-0'>
                                               {data?.entity_type}
                                            </Paragraph>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <div className="card_body">
                                    <Row gutter={12}>
                                    <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    MC Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.mc_number ? data?.mc_number :"-"}
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
                                                Operating status:
                                                </Title>
                                                <Paragraph>
                                                    {data?.operating_status}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Aurthority Date:
                                                </Title>
                                                <Paragraph>
                                                   {data?.mcs_150_form_date}
                                                </Paragraph>
                                            </Typography>
                                        </Col>

                                    </Row>
                                    <Divider />
                                    <Row gutter={12}>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                Power units:
                                                </Title>
                                                <Paragraph>
                                                    {data?.power_units}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    No . of inspections:
                                                </Title>
                                                <Paragraph>
                                                    {data?.states_inspections?.driver?.inspections}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Created on:
                                                </Title>
                                                <Paragraph>
                                                    {moment(data?.createdAt).format("DD/MM/YYYY")}
                                                </Paragraph>
                                            </Typography>
                                        </Col>

                                    </Row>
                                    <Row gutter={12}>
                                        <Col xs={24} md={24} lg={24}>
                                            <Typography>
                                                <Title level={5}>
                                                Power units:
                                                </Title>
                                                <Paragraph>
                                                    {data?.physical_address}
                                                </Paragraph>
                                            </Typography>
                                        </Col>

                                    </Row>
                                    <Row gutter={12}>
                                    <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                   Internal Tracking Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.mc_mx_ff_numbers ? data?.mc_mx_ff_numbers :"-"}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                Mobile Number:
                                                </Title>
                                                <Paragraph>
                                                    {data?.phone}
                                                </Paragraph>
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={8} lg={6}>
                                            <Typography>
                                                <Title level={5}>
                                                    Link Up Geo Location:
                                                </Title>
                                                <Paragraph>
                                                   {data?.mailing_address}
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
    </>
  );
};

export default FmcsasView;
