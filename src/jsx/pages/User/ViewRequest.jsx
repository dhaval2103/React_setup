import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import { Button, Empty, Table } from 'antd';
import moment from "moment";
import dummy from "../../../images/dummy.png";


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
            <Card.Header className=" border-0 pb-0">
              <Card.Title>Card title</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Col md="6 mb-3">
                    <label>Title: </label>
                    <label>GGGGG</label>
                </Col>
                <Col md="6 mb-3">
                    <label>Title: </label>
                    <label>GGGGG</label>
                </Col>
                <Col md="6 mb-3">
                    <label>Title: </label>
                    <label>GGGGG</label>
                </Col>

              </Card.Text>
              <Card.Text>
                <Col md="6 mb-3">
                    <label>Title: </label>
                    <label>GGGGG</label>
                </Col>
                <Col md="6 mb-3">
                    <label>Title: </label>
                    <label>GGGGG</label>
                </Col>
                <Col md="6 mb-3">
                    <label>Title: </label>
                    <label>GGGGG</label>
                </Col>

              </Card.Text>
            </Card.Body>
            <Card.Footer className=" border-0 pt-0">
              <Card.Text className=" d-inline">Card footer</Card.Text>
              <Card.Link href="#" className="float-end">
                Card link
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>
        </Row>
      );
}

export default ViewRequest