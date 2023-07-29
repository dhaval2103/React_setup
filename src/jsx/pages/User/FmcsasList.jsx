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
    const [selectedFilter, setSelectedFilter] = useState(null)

    const getBrokerList = (value) => {
        dispatch(UserService.getfmcsas(value))
            .then((res) => {
                console.log(res,"result");
                setData(res?.data)
                // var newArr = [];
                // for (var i = 0; i < res.data.length; i++) {
                //     newArr.push(
                //         {
                //             key: i,
                //             dotNumber: res.data[i].dotNumber,
                //             mcNumber: res.data[i].mc_number ? res.data[i].mc_number :"-",
                //             legalname: res.data[i].legal_name,
                //             phone: res.data[i].phone,
                //             latestupdate: res.data[i].latest_update,
                //             createdAt: res.data[i].createdAt,
                //             isApprove: res.data[i].isApprove,
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
    
    const handleFilterChange = (filterOption) => {
        setSelectedFilter(filterOption);
    };

    const approvePendingUser = (text) => {
        console.log('text',text);
        let data = {};
        data.userid = text.id
        data.isApprove = text.isApprove = 0 ? 1 : 0
        console.log('dataaa',data);
        Swal.fire({
            title: 'Are you sure?',
            text: "To change this User status!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(UserService.changeUserStatus(data))
                    .then((res) => {
                        getBrokerList();
                        ToastMe("User status change successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    };

    const filteredData = useMemo(() => {
    if (selectedFilter === null) return data; // No filter selected, return all data

    // Filter based on the "isApprove" property
    return data.filter((item) => {
        if (selectedFilter === 0) {
        return item.isApprove === 0; // Filter for "Pending" brokers
        } else if (selectedFilter === 1) {
        return item.isApprove === 1; // Filter for "Approved" brokers
        }
        return true;
    });
    }, [data, selectedFilter]);
    
    
    useEffect(() => {
        getBrokerList();
    }, [])
    const viewUser = (text) =>{
        console.log(text,"text");
        props.history.push("/fmcsas-view",{state:text})
    }

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
            title: 'Dot Number',
            dataIndex: 'dotNumber',
            key: 'dotNumber',
        },
        {
            title: 'Mc Number',
            dataIndex: 'mc_number',
            key: 'mc_number',
        },
        {
            title: 'Legal Name',
            dataIndex: 'legal_name',
            key: 'legal_name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },

        {
            title: 'Latest Update',
            dataIndex: 'latest_update',
            key: 'latest_update',
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
                            <Dropdown.Item onClick={() => viewUser(text)}>View</Dropdown.Item>
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
                    <h4 className="card-title">Fmcsas List</h4>
                    {/* <div>
                        <Dropdown>
                        <Dropdown.Toggle variant="primary">
                            Filter by Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleFilterChange(1)}>Approved</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterChange(0)}>Pending</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </div> */}
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

export default User