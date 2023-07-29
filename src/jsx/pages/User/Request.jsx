import React, { useContext, useEffect, useMemo, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button, Empty, Form, Input, Modal, Table } from 'antd';
import { Badge, Dropdown } from "react-bootstrap";
import { SocketContext } from '../../../context/Socket';
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';


const Request = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { chatClient } = useContext(SocketContext);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState(null);


    const getRequestList = (value) => {
        dispatch(UserService.getRequest(value))
            .then((res) => {
                setData(res.data)
                var newArr = [];
                // for (var i = 0; i < res.data.length; i++) {
                //     newArr.push(
                //         {
                //             key: i,
                //             firstName: res.data[i].firstName,
                //             lastName: res.data[i].lastName,
                //             trackingNumber: res. [i].trackingNumber,
                //             ticketNumber: res.data[i].ticketNumber,
                //             mobile: res.data[i].mobile,
                //             // createdAt: res.data[i].createdAt,
                //             id: res.data[i]._id,
                //         }
                //     )
                // }
                // setData(newArr);
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
            render: (text = 0) => (
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, data) => (
                <div>
                    {data.status == 0 ? <Badge bg=" badge-lg " className='badge-warning light badge-xs' style={{ cursor: 'pointer' }}>Pending</Badge>
                        : data.status == 1 ? <Badge bg=" badge-lg " className='badge-success light badge-xs' style={{ cursor: 'pointer' }}>Completed</Badge>
                            : data.status == 2 ? <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }}>Rejected</Badge>
                                : data.status == 3 ? <Badge bg=" badge-lg " className='badge-info light badge-xs' style={{ cursor: 'pointer' }}>Incompleted</Badge>
                                    : data.status == 4 ? <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }}>Expired</Badge>
                                        : ''}
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, data) => (
                <div>
                    <Button to="" onClick={() => viewUser(data)}>View</Button>
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
        props.history.push("/request-detail", { requestDetail: text })
    }

    const handleFilterChange = (filterOption) => {
        setSelectedFilter(filterOption);
    };

    const filteredData = useMemo(() => {
        if (selectedFilter === null) return data; // No filter selected, return all data

        // Filter based on the "isApprove" property
        return data.filter((item) => {
            console.log(selectedFilter,'item');
            if (selectedFilter === 0) {
                return item.status === 0; // Filter for "Pending" brokers
            } else if (selectedFilter === 1) {
                return item.status === 1; // Filter for "completed" brokers
            } else if (selectedFilter == 2) {
                return item.status === 2; // Filter for "Rejected" brokers
            } else if (selectedFilter == 3) {
                return item.status === 3; // Filter for "Incompleted" brokers
            } else if (selectedFilter == 4) {
                return item.status === 4; // Filter for "Expired" brokers
            }
            return true;
        });
    }, [data, selectedFilter]);

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
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary">
                                Filter by Status
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleFilterChange(0)}>Pending</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange(1)}>Completed</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange(2)}>Rejected</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange(3)}>Incompleted</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange(4)}>Expired</Dropdown.Item>
                                {/* Add more filter options here */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {filteredData && filteredData.length > 0 ? (
                            <Table dataSource={filteredData} columns={columnss} className='table_custom' />
                        ) : (
                            <Empty />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Request