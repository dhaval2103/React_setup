import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Badge, Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import { Modal, Table, Button, Input, Form, DatePicker, Select, TimePicker, Space, Empty } from 'antd';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import PageLoader from '../Common/PageLoader';

const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleApprove, setVisibleApprove] = useState(false);
    const [techancian, setTechnician] = useState();
    const [addtechancian, setAddTecnicianName] = useState();
    const [test, setTest] = useState('');
    const [id, setId] = useState();
    const [form] = Form.useForm();
    const [userData, setuserData] = useState([]);
    const [userId, setuserId] = useState();
    const [loading, setLoading] = useState(true);

    const onDateChange = (date, dateString) => {
        form.setFieldsValue({
            date: dateString
        })
    };
    const onTimeChange = (date, dateString) => {
        form.setFieldsValue({
            time: moment(date.$d, 'hh:mm').format('hh:mm A')
        })
    };

    const getSearchValue = (e) => {
        getMaintenance(e.target.value)
    }

    const getMaintenance = (value) => {
        dispatch(UserService.getMaintenance(value))
            .then((res) => {
                let arr = [];
                for (var i = 0; i < res.data.length; i++) {
                    arr.push(
                        {
                            key: i,
                            location: res?.data[i]?.location,
                            message: res?.data[i]?.message,
                            _id: res?.data[i]?._id,
                            attachments: res?.data[i]?.attachments,
                            verifyStatus: res?.data[i]?.verifyStatus,
                            technicianStatus: res?.data[i]?.verifyStatus,
                            user: res?.data[i]?.user,
                            technician: res?.data[i]?.technician || '-',
                        }
                    )
                }
                setData(arr);
                setLoading(false);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }
    const onSubmits = (values) => {
        values.verifyStatus = 1
        values._id = id
        dispatch(UserService.approveRequest(values))
            .then((res) => {
                ToastMe(res.data.message, 'success')
                getMaintenance();
                setVisibleApprove(false)
                form.resetFields()
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }
    const editModal = (text) => {
        setVisible(true)
        setTest('')
        setuserId('')
        form.resetFields()
    }

    const onSubmit = (values) => {
        dispatch(UserService.addRequest(values))
            .then((res) => {
                getMaintenance();
                ToastMe("Maintance Request Added Successfully", 'success')
                setVisible(false)
                setTest('')
                setuserId('')
                form.resetFields()
            })
            .catch((errors) => {
                setTest(errors.errorData.date);
                ToastMe(errors.errorData.date, 'error')
            })

    }

    const handleChangeName = (e) => {
        setAddTecnicianName(e);
        form.setFieldsValue({
            technicianId: e
        })
    }
    const getTechnician = () => {
        dispatch(UserService.getTechnician())
            .then((res) => {
                setTechnician(res.data);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }
    const handleChangeUserName = (e) => {
        setuserId(e);
        form.setFieldValue('userId', e)
    }
    const getUser = (value = '') => {
        dispatch(UserService.getUser(value))
            .then((res) => {
                const newArr = [];
                for (let i = 0; i < res.data.length; i++) {
                    newArr.push({
                        label: res.data[i].fullName,
                        value: res.data[i]._id,
                    });
                }
                setuserData(newArr);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const viewDetail = (text) => {
        props.history.push("/view-maintence", { userDetail: text })
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

    useEffect(() => {
        getMaintenance();
        getTechnician();
        getUser();
    }, [])

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
            render: (text) => {
                if (text.length > 40) {
                    return (
                        <div className='col-6'>
                            {text.substring(0, 40) + "...."}
                        </div>
                    )
                } else {
                    return (
                        <div className='col-6'>
                            {text}
                        </div>
                    )
                }
            }
        },
        {
            title: 'Status',
            key: 'verifyStatus',
            render: (text) => {
                if (text.technicianStatus == 0) {
                    return (
                        <span className="badge badge-primary">Pending</span>
                    )
                } else if (text.technicianStatus == 1) {
                    return (
                        <span className="badge badge-success">Completed</span>
                    )
                } else if (text.technicianStatus == 2) {
                    return (
                        <span className="badge badge-warning">In progress
                        </span>
                    )
                } else {
                    return (
                        <span className="badge badge-danger">Reject</span>
                    )
                }
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text) => (
                <>
                    {
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="danger"
                                className="light sharp i-false"
                            >
                                {svg1}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => viewDetail(text)}>View</Dropdown.Item>
                                <Dropdown.Item onClick={() => viewChat(text)}>Chat</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </>
            )
        },
    ];

    const viewChat = (text) => {
        props.history.push("/chat", { userDetail: text })
    }

    const generateHours = () => {
        const now = moment();
        const selectedDate = form.getFieldValue('date');
        if (selectedDate && moment(selectedDate).isSame(now, 'day')) {
          return [...Array(now.hour())].map((_, i) => i);
        }
        return [];
      };
      
      const generateMinutes = (selectedHour) => {
        const now = moment();
        const selectedDate = form.getFieldValue('date');
        if (selectedDate && moment(selectedDate).isSame(now, 'day') && selectedHour === now.hour()) {
          return [...Array(now.minute())].map((_, i) => i);
        }
        return [];
      };
      
      
    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Request List</h4>
                    <div className="d-flex align-items-center gap-3"> <Input placeholder='Search....' onChange={(e) => getSearchValue(e)} prefix={<SearchOutlined className="site-form-item-icon" />} />
                        <Button type="primary" onClick={() => editModal()}>
                            Add Request
                        </Button>
                    </div>
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

            <Modal
                open={visible}
                title='Add Request'
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => {
                    setVisible(false);
                }}
                footer={[
                    <Button key="cancel" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"

                        onClick={() => {
                            form
                                .validateFields()
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

                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: "public"
                    }}

                >
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
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    showSearch
                                    placeholder="Please select"
                                    value={userId}
                                    onChange={handleChangeUserName}
                                    options={userData}
                                    filterOption={(inputValue, option) =>
                                        option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Space>

                        </Form.Item>
                    </div>
                    <label className="label-name">Location</label>
                    <Form.Item
                        name="location"
                        rules={[
                            { required: true, message: "Please enter location" },
                            { max: 50, message: 'You can not enter more than 50 characters' },
                            { pattern: new RegExp(".*\\S.*[a-zA-z0-9 ]"), message: 'Only space is not allowed' }
                        ]}
                    >
                        <Input type="text" placeholder='Enter location' />
                    </Form.Item>
                    <label className="label-name">Select Date</label>
                    <Form.Item
                        name="date"
                        rules={[
                            { required: true, message: "Please enter date" }]}
                        className='form_item_datepicker mb-2'
                    >
                        <Space direction="vertical" className='d-block w-100'>
                            <DatePicker onChange={onDateChange} disabledDate={(current) => current && current < moment().startOf('day')} className='' />
                        </Space>
                    </Form.Item>
                    {/* <span style={{ color: 'red' }}>{test}</span><br></br> */}
                    <label className="label-name">Select Time</label>
                    <Form.Item
                        name="time"
                        rules={[
                            { required: true, message: "Please enter time" }
                        ]}
                        className='form_item_datepicker'
                    >
                        <Space direction="vertical" className='d-block w-100'>
                            <TimePicker format={'HH:mm'} onChange={onTimeChange}
                               disabledHours={() => generateHours()}
                               disabledMinutes={(selectedHour) => generateMinutes(selectedHour)}
                            />
                        </Space>
                    </Form.Item>

                    <label className="label-name">Message</label>
                    <Form.Item
                        name="message"
                        rules={[
                            { required: true, message: "Please enter message" },
                            { pattern: new RegExp(".*\\S.*[a-zA-z0-9 ]"), message: 'Only space is not allowed' }
                        ]}
                    >
                        <Input.TextArea type="text" placeholder='Enter message' />
                    </Form.Item>
                    <label className="label-name">Technician Name</label>
                    <div>
                        <Form.Item
                            name="technicianId"
                            rules={[{ required: true, message: "Please select Technician name" }]}
                        >
                            <Select
                                placeholder="Select a Technician"
                                name="technicianId"
                                id="technicianId"
                                label="technicianname"
                                value={techancian}
                                onChange={handleChangeName}
                                allowClear
                            >
                                {techancian?.map((option, i) => (
                                    <option key={i} value={option._id}>{option.name}</option>
                                ))}
                            </Select>

                        </Form.Item>
                    </div>
                </Form>
            </Modal>

            <Modal
                open={visibleApprove}
                title=''
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => {
                    setVisibleApprove(false);
                }}
                footer={[
                    <Button key="cancel" onClick={() => setVisibleApprove(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"

                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onSubmits(values);
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
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: "public"
                    }}
                >
                    <label className="label-name">Technician Name</label>
                    <div>
                        <Form.Item
                            name="technicianId"
                            rules={[{ required: true, message: "Please select Technician name" }]}
                        >
                            <Select
                                placeholder="Select a Technician"
                                name="technicianId"
                                id="technicianId"
                                label="technicianname"
                                value={techancian}
                                onChange={handleChangeName}
                                allowClear
                            >
                                {techancian?.map((option, i) => (
                                    <option key={i} value={option._id}>{option.name}</option>
                                ))}
                            </Select>

                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default User