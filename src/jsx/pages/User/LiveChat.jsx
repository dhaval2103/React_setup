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

const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { chatClient } = useContext(SocketContext);
    const [id, setId] = useState('');
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        chatClient.on('message', function (data) {
            if (data) {
                getUserList();
            }
        })
    }, [chatClient])

    const getUserList = (value = '') => {
        dispatch(UserService.getUser(value))
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            email: res.data[i].email.text,
                            id: res.data[i]._id,
                            emailVerify: res.data[i].email.verified,
                            mobile: res.data[i].mobile.text,
                            user: res.data[i].user,
                            role: res.data[i].role,
                            mobileVerify: res.data[i].mobile.verified,
                            fullName: res.data[i].fullName,
                            securityQuestion: res.data[i].securityQuestion,
                            yourQuestion: res.data[i].yourQuestion,
                            answer: res.data[i].answer,
                            profilePic: res.data[i].profilePic,
                            readStatusCount: res.data[i].readStatusCount,
                            createdAt: res.data[i].createdAt,
                            isActive: res.data[i].isActive
                        }
                    )
                }
                setData(newArr);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    /* const editModal = (text) => {
        console.log(text);
        setVisible(true)
        form.setFieldsValue({
            duration: text?.duration || '',
            packageName: text?.packageName || '',
            price: text?.price || '',
        })
        setId(text?.id)
    } */

    /* const activeInactiveUser = (text) => {
        let data={};
        data.userid = text
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
                        getUserList();
                        ToastMe("User status change successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    }; */

    const onSubmit = (values) => {
        //   dispatch(UserService.addTechician(values))
        //     .then((res) => {
        //      getUserList();
        //       ToastMe("Techician Added Successfully", 'success')
        //       setVisible(false);
        //       setTest('');
        //       form.resetFields();
        //     })
        //     .catch((errors) => {
        //       console.log(errors)
        //       setTest(errors.errors.email);
        //     })
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
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
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
                            <Dropdown.Item onClick={() => viewChat(text)}>Chat</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];

    const viewUser = (text) => {
        props.history.push("/user-detail", { userDetail: text })
    }
    const viewChat = (text) => {
        props.history.push("/chat", { userDetail: text })
    }
    const handleSearch = (value) => {
        getUserList(value)
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">User List</h4>
                    <div className="search-group">
                        <Input placeholder='Search' onChange={(e) => handleSearch(e.target.value)} prefix={<SearchOutlined className="site-form-item-icon" />} />
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            data && data.length > 0 ?
                                <Table dataSource={data} columns={columnss} /> : <Empty />
                        }
                    </div>
                </div>
            </div>

            <Modal open={visible} title="Add Plan" okText="Submit" cancelText="Cancel"
                onCancel={() => {
                    setVisible(false);
                }}
                footer={[
                    <Button key="cancel" onClick={() => setVisible(false)}> Cancel </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            form.validateFields()
                                .then((values) => {
                                    onSubmit(values);
                                })
                                .catch((info) => {
                                    console.log("Validate Failed:", info);
                                });
                        }}
                    >
                        Submit
                    </Button>
                ]}
            >
                <Form form={form} layout="vertical" name="form_in_modal"
                    initialValues={{
                        modifier: "public"
                    }}
                >
                    <label className="label-name">Full Name</label>
                    <Form.Item name="fullName"
                        rules={[
                            { required: true, message: "Please entre package name!" },
                            { max: 15, message: 'You can not enter more than 15 characters' },
                            { pattern: new RegExp("[a-zA-Z]+$"), message: 'Please enter only characters' }
                        ]}
                    >
                        <Input placeholder='Enter Name' />
                    </Form.Item>

                    <label className="label-name">Email</label>
                    <Form.Item
                        className='mb-2'
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter email!"
                            },
                            {
                                pattern: new RegExp(/^([A-Z0-9a-z._%+-])+\@([A-Za-z0-9.-])+(\.[A-Za-z]{2,4})+$/),
                                message: "'Please enter valid email address!"
                            }
                        ]}
                    >
                        <Input type="text" placeholder='Enter email' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default User