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
            for (var i = 0; i < userDetail?.user; i++) {
                newArr.push(
                    {
                        key: i,
                        id: userDetail?.user[i]?._id,
                        firstName: userDetail?.user[i]?.firstName,
                        lastName: userDetail?.user[i]?.lastName,
                        companyName: userDetail?.user[i]?.companyName,
                        dotNumber: userDetail?.user[i]?.dotNumber,
                        email: userDetail?.user[i]?.email?.text,
                        mobile: userDetail?.user[i]?.mobile?.text,
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
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Company name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Dot number',
            dataIndex: 'dotNumber',
            key: 'dotNumber',
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
                <Col xl="8">
                    <div className="custome_card bg-dark text-white mb-4">
                        <div class="row gy-4">
                            <div class="col-md-12 col-lg-4">
                                <div class="text_content">
                                    <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-user" aria-hidden="true"></i> &nbsp; {userDetail?.firstName ? userDetail?.firstName : '-'}</p>
                                    <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-user" aria-hidden="true"></i> &nbsp; {userDetail?.lastName ? userDetail?.lastName : '-'}</p>
                                    <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-user" aria-hidden="true"></i> &nbsp; {userDetail?.companyName ? userDetail?.companyName : '-'}</p>
                                    <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-user" aria-hidden="true"></i> &nbsp; {userDetail?.dotNumber ? userDetail?.dotNumber : '-'}</p>
                                    <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp; {userDetail?.email ? userDetail?.email : '-'}</p>
                                    <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-phone-square" aria-hidden="true"></i> &nbsp; {userDetail?.mobile ? userDetail?.mobile : '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ViewUser