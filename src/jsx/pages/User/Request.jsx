import React, { useContext, useEffect, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button, Empty, Form, Input, Modal, Table } from 'antd';
import { SocketContext } from '../../../context/Socket';
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';


const Request = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { chatClient } = useContext(SocketContext);
    const [loading, setLoading] = useState(true);


    const getRequestList = (value) => {
        dispatch(UserService.getRequest(value))
            .then((res) => {
                console.log(res.data);
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            firstName: res.data[i].firstName,
                            lastName: res.data[i].lastName,
                            trackingNumber: res.data[i].trackingNumber,
                            ticketNumber: res.data[i].ticketNumber,
                            mobile: res.data[i].mobile,
                            // createdAt: res.data[i].createdAt,
                            id: res.data[i]._id,
                        }
                    )
                }
                console.log(newArr,'sdsd');
                setData(newArr);
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    useEffect(() => {
        getRequestList();
    }, [])

    const svg1 = (
        <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24"></rect>
                <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                <circle fill="#000000" cx="19" cy="12" r="2"></circle>
            </g>
        </svg>
    );

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
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        // {
        //     title: 'Company name',
        //     dataIndex: 'companyName',
        //     key: 'companyName',
        // },
        {
            title: 'Tracking Number',
            dataIndex: 'trackingNumber',
            key: 'trackingNumber',
        },
        {
            title: 'Ticket Number',
            dataIndex: 'ticketNumber',
            key: 'ticketNumber',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobile',
            key: 'mobileNumber',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, data) => (
                <div>
                    <Button to="">View
                                    </Button>
                </div>
            ),
        },
        // {
        //     title: 'Created At',
        //     dataIndex: 'createdAt',
        //     key: 'createdAt',
        //     render: (text) => (
        //         <div>
        //             {moment(text).format("DD MMM YYYY h:mm A")}
        //         </div>
        //     ),
        // },
    ];

    const viewUser = (text) => {
        props.history.push("/user-detail", { userDetail: text })
    }
    const handleSearch = (e) => {
        getRequestList(e.target.value)
    }

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Request List</h4>
                    {/* <div className="d-flex align-items-center gap-3">
                        <Input placeholder='Search....' onChange={(e) => handleSearch(e)} prefix={<SearchOutlined className="site-form-item-icon" />} />
                        <Button type="primary" onClick={() => editModal()}>
                            Add User
                        </Button>
                    </div> */}
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            data && data.length > 0 ?
                                <Table dataSource={data} columns={columnss} className='table_custom' /> : <Empty />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Request