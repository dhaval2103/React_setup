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
import PageLoader from '../Common/PageLoader';

const FaqGroup = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    const getGroup = () => {
        dispatch(UserService.getGroup())
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            title: res.data[i].title || '-',
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
    const editModal = (text) => {
        setVisible(true)
        if (text) {
            form.setFieldsValue({
                title: text?.title || '',
            })
            setId(text.id)
        } else {
            // form.setFieldsValue({
            //     title: '',
            // })
            form.resetFields();
            setId('')
        }
    }

    // const deleteCms = (text) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "To change this CMS status!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, Change it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             dispatch(UserService.deleteCms(text))
    //                 .then((res) => {
    //                     // getCms();
    //                     ToastMe("CMS status change successfully", 'success')
    //                 })
    //                 .catch((errors) => {
    //                     console.log({ errors })
    //                 })
    //         }
    //     })
    // };

    const onSubmit = (values) => {
        console.log('values', values);
        if (id) {
            values.id = id;
            dispatch(UserService.editGroup(values))
                .then((res) => {
                    getGroup();
                    ToastMe("FAQ Group Updated Successfully", 'success')
                })
            setVisible(false);
            form.setFieldsValue({
                title: '',
            })
            setId('')
                .catch((errors) => {
                    console.log({ errors })
                })
        } else {
            dispatch(UserService.createGroup(values))
                .then((res) => {
                    console.log('res', res);
                    getGroup();
                    ToastMe("FAQ  Group Added Successfully", 'success')
                })
            setVisible(false);
            setId('')
            form.setFieldsValue({
                title: '',
            })
                .catch((errors) => {
                    console.log({ errors })
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
        getGroup();
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
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (text, data) => (
        //         <div>
        //             {data.status === 1 ? <Badge bg=" badge-lg " className='badge-primary light badge-xs' style={{ cursor: 'pointer' }} onClick={() => deleteCms(data.id)} >Active</Badge>
        //                 : <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }} onClick={() => deleteCms(data.id)} >Deactive</Badge>}
        //         </div>
        //     ),
        // },
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
            {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">FAQ Group List</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add FAQ Group
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
            <Modal
                open={visible}
                title={id ? "Edit FAQ Group" : "Add FAQ Group"}
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
                    <label className="label-name">FAQ Group Name</label>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: "Please enter group name" },
                        { max: 50, message: 'You can not enter more than 50 characters' },
                        { pattern: new RegExp(".*\\S.*[a-zA-z0-9 ]"), message: 'Only space is not allowed!' }
                    ]}
                        
                    >
                        <Input placeholder='Enter group name' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default FaqGroup