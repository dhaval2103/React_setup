import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Input, Form, Select, Empty, InputNumber } from 'antd';
import { Badge, Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import Swal from 'sweetalert2';
import SubscriptionService from '../../../services/subscription';
import moment from "moment";
import PageLoader from '../Common/PageLoader';

const ManageSubscriptions = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    const editModal = (text) => {

        setVisible(true)
        if (text) {
            form.setFieldsValue({
                duration: text?.duration || '',
                packageName: text?.packageName || '',
                price: text?.price || '',
            })
            setType(text?.duration);
            setId(text?.id)
        } else {
            // form.setFieldsValue({
            //     duration: '',
            //     packageName: '',
            //     price: '',
            // })
            form.resetFields();
            setType('');
            setId('')
        }
    }

    const handleChange = (value) => {
        setType(value)
    }
    const onSubmit = (values) => {
        values.duration = type;
        if (id) {
            values.id = id;
            dispatch(SubscriptionService.editSubscriptionPlan(values))
                .then((res) => {
                    getSubscription();
                    ToastMe("Suscription plan updated successfully", 'success')
                    setVisible(false);
                    setType('')
                    setId('')
                })
                .catch((errors) => {
                    console.log({ errors })
                })
        } else {
            dispatch(SubscriptionService.addSubscriptionPlan(values))
                .then((res) => {
                    getSubscription();
                    ToastMe("Suscription plan added successfully", 'success')
                })
                .catch((errors) => {
                    console.log({ errors })
                })
            setVisible(false);
            setType('')
            form.setFieldsValue({
                title: '',
                description: '',
            })
        }
    }

    const getSubscription = () => {
        dispatch(SubscriptionService.getSubscription())
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            packageName: res.data[i].packageName || '-',
                            price: res.data[i].price || '-',
                            duration: res.data[i].duration || '-',
                            status: res.data[i].status || '-',
                            id: res.data[i]._id || '-',
                            createdAt: res.data[i].createdAt || '-'
                        }
                    )
                }
                setData(newArr);
                setLoading(false);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    useEffect(() => {
        getSubscription();
    }, [])

    const changeStatus = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "To change this plan status!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(SubscriptionService.changeSubscriptionStatus(id))
                    .then((res) => {
                        getSubscription();
                        ToastMe(res.data.message, 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
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
            title: 'Package Name',
            dataIndex: 'packageName',
            key: 'packageName',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (text) => (
                <div>
                    {text == 1 ? '1 Month' : text == 2 ? '3 Month' : text == 3 ? '6 Month' : '12 Month'}
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => (
                <div>
                    {text + ' KD'}
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, data) => (
                <div>
                    {text == 1 ? <Badge bg=" badge-lg " className='badge-primary light badge-xs' style={{ cursor: 'pointer' }} onClick={() => changeStatus(data.id)} >Active</Badge>
                        : <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }} onClick={() => changeStatus(data.id)} >Deactive</Badge>}
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
                            className="light sharp i-false"
                        >
                            {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => editModal(text)}>Edit</Dropdown.Item>
                            {/* <Dropdown.Item onClick={() => deleteCms(text)}>Delete</Dropdown.Item> */}
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
                    <h4 className="card-title">Subscriptions Plan List</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add Plan
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
            <Modal open={visible} title={id ? "Edit Plan" : "Add Plan"} okText="Submit" cancelText="Cancel"
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
                    {/* <div>
                        <label className="label-name">Duration</label>
                        <Form.Item
                            name="duration"
                            rules={[{ required: true, message: "Please select plan duration!" }]}
                        >
                            <Select className="select-control" value={type} style={{ width: 120 }} onChange={handleChange}
                                options={[
                                    { value: 1, label: '1 Month' },
                                    { value: 2, label: '3 Month' },
                                    { value: 3, label: '6 Month' },
                                    { value: 4, label: '12 Month' }]} />
                        </Form.Item>
                    </div> */}
                    <label className="label-name">Duration</label>
                    <div>
                        <Form.Item
                            name="duration"
                            rules={[{ required: true, message: "Please select plan duration!" }]}
                        >
                            <Select
                                placeholder="Select a duration"
                                name="duration"
                                id="duration"
                                label="Duration"
                                value={type}
                                onChange={handleChange}
                                allowClear
                                options={[
                                    { value: 1, label: '1 Month' },
                                    { value: 2, label: '3 Month' },
                                    { value: 3, label: '6 Month' },
                                    { value: 4, label: '12 Month' }]}
                            />

                        </Form.Item>
                    </div>

                    <label className="label-name">Package Name</label>
                    <Form.Item name="packageName"
                        rules={[
                            { required: true, message: "Please entre package name!" },
                            { max: 50, message: 'You can not enter more than 50 characters' },
                            { pattern: new RegExp(".*\\S.*[a-zA-z0-9 ]"), message: 'Only space is not allowed!' }
                        ]}
                    >
                        <Input placeholder='Enter Package Name' />
                    </Form.Item>

                    <label className="label-name">Price</label>
                    <Form.Item
                        name="price"
                        rules={[{ required: true, message: "Please enter price!" },
                        { pattern: new RegExp("^[1-9]"), message: 'Price should be greater then 1.' }]}
                    >
                        <Input type='number' max={5} placeholder='Enter Price' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ManageSubscriptions