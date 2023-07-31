import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Select, Input, Space, Form, Empty, AutoComplete } from 'antd';
import { Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import Swal from 'sweetalert2';
import moment from "moment";
import PageLoader from '../Common/PageLoader';


const UserNotification = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');
    const [userData, setuserData] = useState([]);
    const [userId, setuserId] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    const editModal = (text) => {
        setVisible(true)
        setuserId([])
        if (text) {
            setId(text.id)
            form.setFieldsValue({
                title: text.title,
                message: text.message,
            })
        } else {
            // form.setFieldsValue({
            //     title: '',
            //     message: '',
            // })
            form.resetFields();
        }
    }

    const onSubmit = (values) => {
        const notificationData = {
            ...values,
            userId: userId, // Send the array of selected user IDs
          };
        dispatch(UserService.sendUserNotification(notificationData))
            .then((res) => {
                getNotificationlist();
                form.resetFields();
                setuserId([])
                ToastMe(res.data.message, 'success')
            })
        setVisible(false)
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const getNotificationlist = () => {
        let notification_type = 2;
        dispatch(UserService.getNotificationlist(notification_type))
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            title: res.data[i].notification.title || '-',
                            message: res.data[i].notification.body || '-',
                            status: res.data[i].status || '-',
                            id: res.data[i]._id || '-',
                            users: res.data[i].users || '-',
                        }
                    )
                }
                setData(newArr);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const getAllUser = (value = '') => {
        dispatch(UserService.getAllUser(value))
            .then((res) => {
                const newArr = [];
                for (let i = 0; i < res.data.length; i++) {
                    newArr.push({
                        label: res.data[i].firstName,
                        value: res.data[i]._id,
                    });
                }
                setuserData(newArr);
                setLoading(false);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const viewDetail = (text) => {
        props.history.push("/notification-detail", { notification: text })
    }

    const handleChangeName = (selectedUsers) => {
        setuserId(selectedUsers);
    form.setFieldsValue({
      userId: selectedUsers, // Update the userId field value in the form
    });
    }

    useEffect(() => {
        getNotificationlist();
        getAllUser();
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
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
                            <Dropdown.Item onClick={() => editModal(text)}>Resend</Dropdown.Item>
                            <Dropdown.Item onClick={() => viewDetail(text)}>View</Dropdown.Item>
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
                    <h4 className="card-title">Notification</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add Notification
                    </Button>
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
            <Modal open={visible} title={id ? "Resend Notification" : "Add Notification"} okText="Submit" cancelText="Cancel"
                onCancel={() => {
                    setVisible(false);
                }}
                onOk={() => {
                    form.validateFields().then((values) => {
                      onSubmit(values);
                    });
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

                    <label className="label-name">Title</label>
                    <Form.Item name="title"
                        rules={[{ required: true, message: "Please enter title" }, { max: 50, message: 'You can not enter more than 50 characters' }]}
                    >
                        <Input type="text" placeholder='Enter Title' />
                    </Form.Item>

                    <label className="label-name">Message</label>
                    <Form.Item
                        name="message"
                        rules={[{ required: true, message: "Please enter message" }]}
                    >
                        <Input type="text" placeholder='Enter Message' />
                    </Form.Item>
                    <label className="label-name">Select User</label>
                    <div>
                        <Form.Item
                            name="userId"
                            rules={[{ required: true, message: "Please select User name" }]}
                        >
                            <Space
                                style={{
                                    width: '100%',
                                }}
                                direction="vertical"
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please select"
                                    value={userId}
                                    onChange={handleChangeName}
                                    options={userData}
                                    filterOption={(inputValue, option) =>
                                        option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Space>

                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default UserNotification