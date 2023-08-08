import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


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
    const [selectedFilter, setSelectedFilter] = useState(null);
    const location = useLocation();
    const subUserdata = location.state;
    
    const getBrokerList = () => {
        dispatch(UserService.getCarrierSubUserList(subUserdata))
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            firstName: res.data[i].firstName,
                            lastName: res.data[i].lastName,
                            companyName: res.data[i].companyName,
                            dotNumber: res.data[i].dotNumber,
                            mcNumber: res.data[i].mcNumber,
                            email: res.data[i].email,
                            id: res.data[i]._id,
                            mobile: res.data[i].mobile,
                            createdAt: res.data[i].createdAt,
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
    
    const FmcsasListData = (text) => {
        props.history.push("/sub-user-fmcsas-list",{state:text})
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
            title: 'Dot number',
            dataIndex: 'dotNumber',
            key: 'dotNumber',
        },
        {
            title: 'MC number',
            dataIndex: 'mcNumber',
            key: 'mcNumber',
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
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, data) => (
                <>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="danger"
                            className="light sharp i-false badge_label"
                        >
                            {svg1}
                            
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => FmcsasListData(data)}>Fmcsas List</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            ),
        },
    ];

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Sub User List</h4>
                </div>
                <div className="card-body">
                <div className="table-responsive">
                    <Table columns={columnss} className='table_custom' dataSource={data} />
                    {/* {data.length === 0 && <Empty />} */}
                </div>
                </div>
            </div>
        </>
    )
}

export default User