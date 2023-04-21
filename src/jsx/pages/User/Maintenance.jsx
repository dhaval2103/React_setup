import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Badge, Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import { Modal, Table, Button, Input, Form, Select, Empty } from 'antd';
import moment from 'moment';

const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleApprove, setVisibleApprove] = useState(false);
    const [techancian, setTechnician] = useState();
    const [addtechancian, setAddTecnicianName] = useState();
    const [id, setId] = useState();
    const [form] = Form.useForm();

    const getMaintenance = () => {
        dispatch(UserService.getMaintenance())
            .then((res) => {
                let arr = [];
                for (var i = 0; i < res.data.length; i++) {
                    arr.push(
                        {
                            key: i,
                            location: res.data[i].location,
                            message: res.data[i].message,
                            _id: res.data[i]._id,
                            attachments: res.data[i].attachments,
                            verifyStatus: res.data[i].verifyStatus

                        }
                    )
                }
                setData(arr);
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
            })
            setVisibleApprove(false)
            form.resetFields()
            .catch((errors) => {
                console.log({ errors })
            })
    }
    const approveRequest = (values) => {
        values.verifyStatus = 2
        dispatch(UserService.approveRequest(values))
            .then((res) => {
                ToastMe(res.data.message, 'success')
                getMaintenance();
            })
            setVisibleApprove(false)
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const openapprovemodal = (text) =>{
        setVisibleApprove(true);
        setId(text._id)
    }
    const editModal = (text) => {
        setVisible(true)
    }


    const onSubmit = (values) => {
        values.date = moment(new Date()).format('YYYY-MM-DD');
        values.technicianId = addtechancian;
        dispatch(UserService.addRequest(values))
            .then((res) => {
                getMaintenance();
                ToastMe("Maintance Request Added Successfully", 'success')
            })
        setVisible(false)
        form.resetFields()
            .catch((errors) => {
                console.log({ errors })
            })

    }

    const handleChangeName = (e) => {
        setAddTecnicianName(e);
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
        },
        {
            title: 'Status',
            key: 'verifyStatus',
            render: (text) => {
                if (text.verifyStatus == 0) {
                    return (
                        <span className="badge badge-warning text-dark">Pending</span>
                    )
                } else if (text.verifyStatus == 1) {
                    return (
                        <span className="badge badge-success">Approve</span>
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
                        text.verifyStatus == 0 ?
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="danger"
                                    className="light sharp i-false"
                                >
                                    {svg1}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => openapprovemodal(text)}>Approve</Dropdown.Item>
                                    <Dropdown.Item onClick={() => approveRequest(text, 2)}>Reject</Dropdown.Item>
                                    <Dropdown.Item onClick={() => viewDetail(text)}>View</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> :
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="danger"
                                    className="light sharp i-false"
                                >
                                    {svg1}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => viewDetail(text)}>View</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    }
                </>
            )
        },
    ];


    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Request List</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add Request
                    </Button>
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
                    <label className="label-name">Location</label>
                    <Form.Item
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: "Please enter location!"
                            }
                        ]}
                    >
                        <Input type="textarea" placeholder='Enter location' />
                    </Form.Item>

                    <label className="label-name">Message</label>
                    <Form.Item
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: "Please enter message!"
                            }
                        ]}
                    >
                        <Input type="textarea" placeholder='Enter message' />
                    </Form.Item>
                    <label className="label-name">Technician Name</label>
                    <div>
                        <Form.Item
                            name="category"
                            rules={[{ required: true, message: "Please select Technician name!" }]}
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
                            rules={[{ required: true, message: "Please select Technician name!" }]}
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