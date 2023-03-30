import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { Badge, Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';

const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const getMaintenance = () => {
        dispatch(UserService.getMaintenance())
            .then((res) => {
                setData([]);
                for (var i = 0; i < res.data.length; i++) {
                    data.push(
                        {
                            key: i,
                            location: res.data[i].location,
                            message: res.data[i].message,
                            _id: res.data[i]._id,
                            verifyStatus: res.data[i].verifyStatus

                        }
                    )
                }
                setData(data);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }
    const approveRequest = (text, verifyStatus) => {
        text.verifyStatus = verifyStatus
        dispatch(UserService.approveRequest(text))
            .then((res) => {
                ToastMe(res.data.message,'success')
                getMaintenance()
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    useEffect(() => {
        getMaintenance();
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
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text) => (
                <>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="danger"
                            className="light sharp i-false"
                        >
                            {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {text.verifyStatus == 0 ?
                                <>
                                    <Dropdown.Item onClick={() => approveRequest(text, 1)}>Approve</Dropdown.Item>
                                    <Dropdown.Item onClick={() => approveRequest(text, 2)}>Reject</Dropdown.Item>
                                </>
                                : 
                                <>
                                <Dropdown.Item disabled onClick={() => approveRequest(text, 1)}>Approve</Dropdown.Item>
                                <Dropdown.Item disabled onClick={() => approveRequest(text, 2)}>Reject</Dropdown.Item>
                            </>}

                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];


    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Request List</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            data && data.length > 0 &&
                            <Table dataSource={data} columns={columnss} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default User