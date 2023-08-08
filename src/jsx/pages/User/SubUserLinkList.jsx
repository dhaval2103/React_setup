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
    const linkdata = location.state;

    const getBrokerList = () => {
        dispatch(UserService.getLinkList(linkdata))
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            userfirstName: res.data[i].userfirstName,
                            userlastName: res.data[i].userlastName,
                            usercompanyName: res.data[i].usercompanyName,
                            email: res.data[i].email,
                            id: res.data[i]._id,
                            usermobile: res.data[i].usermobile,
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
            title: 'User First name',
            dataIndex: 'userfirstName',
            key: 'userfirstName',
        },
        {
            title: 'User Last name',
            dataIndex: 'userlastName',
            key: 'userlastName',
        },
        {
            title: 'User Company name',
            dataIndex: 'usercompanyName',
            key: 'usercompanyName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Mobile',
            dataIndex: 'usermobile',
            key: 'usermobile',
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

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Sub User Link List</h4>
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