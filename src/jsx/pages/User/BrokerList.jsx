import React, { useContext, useEffect, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button, Empty, Form, Input, Modal, Table } from 'antd';
import { Badge, Dropdown } from "react-bootstrap";
import moment from 'moment';
import { SocketContext } from '../../../context/Socket';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import ToastMe from '../Common/ToastMe';
import PhoneInput from "react-phone-input-2";
import dummy from "../../../images/dummy.png";
import 'react-phone-input-2/lib/style.css';
import startsWith from 'lodash.startswith';
import PageLoader from '../Common/PageLoader';


const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { chatClient } = useContext(SocketContext);
    const [id, setId] = useState(null);
    const [phoneValue, setPhoneValue] = useState();
    const [visible, setVisible] = useState(false);
    const [userImg, setUserImg] = useState('');
    const [imageName, setImageName] = useState();
    const [form] = Form.useForm();
    const [isDefaultCountryCode, setIsDefaultCountryCode] = useState('in');
    const [phoneNo, setPhoneNo] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [phoneVelidation, setPhoneVlidation] = useState('')

    const getBrokerList = (value) => {
        dispatch(UserService.getBroker(value))
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            firstName: res.data[i].firstName,
                            lastName: res.data[i].lastName,
                            companyName: res.data[i].companyName,
                            email: res.data[i].email,
                            id: res.data[i]._id,
                            mobile: res.data[i].mobile,
                            createdAt: res.data[i].createdAt,
                            isApprove: res.data[i].isApprove,
                        }
                    )
                }
                setData(newArr);
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const pendingBroker = (text) => {

    }

    const approveBroker = (text) => {
        
    }
    
    useEffect(() => {
        getBrokerList();
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
            title: 'Is Approve',
            dataIndex: 'isApprove',
            key: 'isApprove',
            render: (text, data) => (
                <div>
                    {data.isApprove === 1 ? <Badge bg=" badge-lg " className='badge-primary light badge-xs' style={{ cursor: 'pointer' }}>Approve</Badge>
                        : <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }}>Pending</Badge>}
                </div>
            ),
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
        {
            title: 'Actions',
            key: 'actions',
            render: (text) => (
                <>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="danger"
                            className="light sharp i-false badge_label"
                        >
                            {svg1}
                            {
                                text.readStatusCount > 0 ?
                                    <span className="badge light text-white bg-danger rounded-circle">{text.readStatusCount}</span> : ''
                            }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => pendingBroker(text)}>Pending Broker</Dropdown.Item>
                            <Dropdown.Item onClick={() => approveBroker(text)}>Approve Broker</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Broker List</h4>
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

export default User