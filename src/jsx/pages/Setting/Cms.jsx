import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Input, Form, Select, Empty } from 'antd';
import { Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import Swal from 'sweetalert2';
import moment from 'moment';

const Cms = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [form] = Form.useForm();

    const editModal = (text) => {
        setVisible(true)
        if (text) {
            form.setFieldsValue({
                title: text?.title || '',
                description: text?.description || '',
            })
            setType(text.type);
            setId(text.id)
        } else {
            form.setFieldsValue({
                title: '',
                description: '',
            })
            setType('');
            setId('')
        }
    }

    const handleChange = (value) => {
        setType(value)
    }

    const deleteCms = (text) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(UserService.deleteCms(text))
                    .then((res) => {
                        getCms();
                        ToastMe("CMS Deleted Successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    };

    const onSubmit = (values) => {
        values.type = type;
        if (id) {
            values.id = id;
            dispatch(UserService.updateCms(values))
                .then((res) => {
                    getCms();
                    ToastMe("CMS Updated Successfully", 'success')
                })
            setVisible(false);
            setType('')
            setId('')
                .catch((errors) => {
                    console.log({ errors })
                })
        } else {
            dispatch(UserService.addCms(values))
                .then((res) => {
                    getCms();
                    ToastMe("CMS Added Successfully", 'success')
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

    const getCms = () => {
        dispatch(UserService.getCms())
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            title: res.data[i].title || '-',
                            description: res.data[i].description || '-',
                            type: res.data[i].type || '-',
                            id: res.data[i]._id || '-',
                            createdAt: res.data[i].createdAt || '-'
                        }
                    )
                }
                setData(newArr);
            })
            .catch((errors) => {
                console.log({ errors })
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

    useEffect(() => {
        getCms();
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
                            <Dropdown.Item onClick={() => deleteCms(text)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];

    return (
        <>
            {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">CMS List</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add CMS
                    </Button>
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
            <Modal
                visible={visible}
                title="Add CMS"
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
                    <label class="label-name">Duration</label>
                    <div>
                        <Select
                            label="Title"
                            value={type}
                            style={{ width: 120 }}
                            onChange={handleChange}
                            allowClear
                            options={[{ value: 1, label: 'Terms & Conditions' }, { value: 2, label: 'Privacy Policy' }, { value: 3, label: 'Disclaimer' }]}
                        />
                    </div>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Enter Title"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        hidden
                        label="Id"
                        name="id"
                        value={id}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Enter Description"
                            }
                        ]}
                    >
                        <Input type="textarea" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Cms