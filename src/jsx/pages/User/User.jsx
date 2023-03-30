import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { Badge, Dropdown } from "react-bootstrap";

const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    
    const getUserList = () => {
        dispatch(UserService.getUser())
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            email: res.data[i].email.text,
                            emailVerify: res.data[i].email.verified,
                            mobile: res.data[i].mobile.text,
                            mobileVerify: res.data[i].mobile.verified,
                            fullName: res.data[i].fullName,
                            securityQuestion: res.data[i].securityQuestion,
                            yourQuestion: res.data[i].yourQuestion,
                            answer: res.data[i].answer,
                        }
                    )
                }
                setData(newArr);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    useEffect(() => {
        getUserList();
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
            title: 'Email Verified',
            dataIndex: 'emailVerify',
            key: 'emailVerify',
            render: (text) => (
                <div>
                    <Badge as="a" href="" bg="primary badge-circle">
                        {text === true ? <i class="fa fa-check" aria-hidden="true"></i> : <i class="fa fa-times" aria-hidden="true"></i>}
                    </Badge>
                </div>
            )
        },
        {
            title: 'Mobile Verified',
            dataIndex: 'mobileVerify',
            key: 'mobileVerify',
            render: (text) => (
                <div>
                    <Badge as="a" href="" bg="primary badge-circle">
                        {text === true ? <i class="fa fa-check" aria-hidden="true"></i> : <i class="fa fa-times" aria-hidden="true"></i>}
                    </Badge>
                </div>
            )
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
                            <Dropdown.Item onClick={() => viewUser(text)}>View</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];

    const viewUser = (text) => {
        props.history.push("/user-detail", { userDetail: text })
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">User List</h4>
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