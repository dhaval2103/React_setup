import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Input, Form, Empty } from 'antd';
import { Dropdown, Badge } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import Swal from 'sweetalert2';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Cms = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [description, setDescription] = useState();
    const [id, setId] = useState('');
    const [form] = Form.useForm();

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
                            status: res.data[i].status || '-',
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

    const editModal = (text) => {
        setVisible(true)
        if (text) {
            form.setFieldsValue({
                title: text?.title || '',
                description: text?.description || '',
            })
            setDescription(text.description)
            setId(text.id)
        } else {
            form.setFieldsValue({
                title: '',
                description: '',
            })
            setDescription('');
            setId('')
        }
    }

    const deleteCms = (text) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "To change this CMS status!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(UserService.deleteCms(text))
                    .then((res) => {
                        getCms();
                        ToastMe("CMS status change successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    };

    const onSubmit = (values) => {
        if (description !== '<p><br></p>') {
            values.description = description;
        }
        if (id) {
            values.id = id;
            dispatch(UserService.updateCms(values))
                .then((res) => {
                    getCms();
                    ToastMe("CMS Updated Successfully", 'success')
                    setVisible(false);
                    setDescription('')
                    setId('')
                })
                .catch(({ errorData }) => {
                    for (const e in errorData.errors) {
                        form.setFields([
                            {
                                name: e,
                                touched: false,
                                errors: [errorData.errors[e]],
                            },
                        ]);
                    }
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
            setDescription('')
            form.setFieldsValue({
                title: '',
                description: '',
            })
        }
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
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text) => (
        //         <div>
        //             {text ? text.substring(0, 200) + ' . . . . .' : ''}
        //         </div>
        //     ),
        // },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, data) => (
                <div>
                    {data.status === 1 ? <Badge bg=" badge-lg " className='badge-primary light badge-xs' style={{ cursor: 'pointer' }} onClick={() => deleteCms(data.id)} >Active</Badge>
                        : <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }} onClick={() => deleteCms(data.id)} >Deactive</Badge>}
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

    const handleEditor = (data) => {
        setDescription(data)
    }

    return (
        <>
            {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">CMS List</h4>
                    {/* <Button type="primary" onClick={() => editModal()}>
                        Add CMS
                    </Button> */}
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
                open={visible}
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
                    {/* <label className="label-name">Select Topic</label>
                    <div>
                        <Select
                            label="Title"
                            value={type}
                            style={{ width: 120 }}
                            onChange={handleChange}
                            allowClear
                            options={[{ value: 1, label: 'Terms & Conditions' }, { value: 2, label: 'Privacy Policy' }, { value: 3, label: 'Disclaimer' }]}
                        />
                    </div> */}
                    <label className="label-name">Title</label>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: "Please enter title" }]}
                    >
                        <Input placeholder='Enter title' />
                    </Form.Item>
                    <Form.Item hidden label="Id" name="id" value={id} >
                        <Input />
                    </Form.Item>
                    <label className="label-name">Description</label>
                    <Form.Item
                        name='description'
                        rules={[{ required: true, message: "Please add description" }]}
                    >
                        <ReactQuill name='description' theme="snow" value={description} onChange={handleEditor} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Cms