import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Input, Form, Select, Empty } from 'antd';
import { Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';

const Faq = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [form] = Form.useForm();
    const [mainCategory, mainCategorys] = useState('');
    const [valueCategory, setCategory] = useState([]);
    const [getError, setError] = useState('');
    const [isactive, isactives] = useState(false);

    const editModal = (text) => {
        setVisible(true)
        if (text) {
            form.setFieldsValue({
                group: text?.group || '',
                question: text?.question || '',
                answer: text?.answer || '',
            })
            setType(text.type);
            setId(text.id)
        } else {
            // form.setFieldsValue({
            //     group: '',
            //     question: '',
            //     answer: '',
            // })
            form.resetFields();
            setType('');
            setId('')
        }
    }

    const handleChange = (value) => {
        mainCategorys(value)
    }

    /* const deleteCms = (text) => {
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
                        getFaq();
                        ToastMe("CMS Deleted Successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    }; */

    const onSubmit = (values) => {
        values.group = mainCategory;
        // console.log('values', values);
        // if (id) {
        //     values.id = id;
        //     dispatch(UserService.updateCms(values))
        //         .then((res) => {
        //             getFaq();
        //             ToastMe("CMS Updated Successfully", 'success')
        //         })
        //     setVisible(false);
        //     setType('')
        //     setId('')
        //         .catch((errors) => {
        //             console.log({ errors })
        //         })
        // } else {
        dispatch(UserService.addFaq(values))
            .then((res) => {
                console.log('res', res);
                getFaq();
                ToastMe("FAQ Added Successfully", 'success')
            })
            .catch((errors) => {
                console.log({ errors })
            })
        setVisible(false);
        form.setFieldsValue({
            group: '',
            question: '',
            answer: '',
        })
        // }
    }

    const getFaq = (value) => {
        dispatch(UserService.getFaq(value))
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            group: res.data[i].group.title || '-',
                            question: res.data[i].question || '-',
                            answer: res.data[i].answer || '-',
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

    const getSearchValue = (e) => {
        getFaq(e.target.value)
    }

    const mainCategorysfun = (e) => {
        // if(e.target.value == 0){
        // 	setError('Please Select Group');
        // 	isactives(true);
        // }
        // else{
        mainCategorys(e);
        // }
    }

    const getGroup = () => {
        dispatch(UserService.getGroup())
            .then((res) => {
                setCategory(res.data);

            })
            .catch((errors) => {
                console.log(errors);
            })
    }

    // const getGroup = () => {
    //     dispatch(UserService.getGroup)
    //         .then((res) => {
    //             let newArr = [];
    //             for (var i = 0; i < res.data.length; i++) {
    //                 newArr.push(
    //                     {
    //                         key: i,
    //                         group: res.data[i].group.title || '-',
    //                         id: res.data[i]._id || '-',
    //                         createdAt: res.data[i].createdAt || '-'
    //                     }
    //                 )
    //             }
    //             setData(newArr);
    //         })
    //         .catch((errors) => {
    //             console.log({ errors })
    //         })
    // }


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
        getFaq();
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
            title: 'Group',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
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
                            {/* <Dropdown.Item onClick={() => editModal(text)}>Edit</Dropdown.Item> */}
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
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">FAQ List</h4>
                    <div className="d-flex align-items-center gap-3">
                        <Input placeholder='Search....' onChange={(e) => getSearchValue(e)}
                            prefix={<SearchOutlined className="site-form-item-icon" />} />
                        <Button type="primary" onClick={() => editModal()}>
                            Add FAQ
                        </Button>
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
            <Modal
                open={visible}
                title="Add FAQ"
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
                    <label className="label-name">Group Name</label>
                    <div>
                        <Form.Item
                            name="category"
                            rules={[{ required: true, message: "Please select group name!" }]}
                        >
                            <Select
                                placeholder="Select a duration"
                                name="category"
                                id="category"
                                label="category"
                                value={mainCategory}
                                onChange={mainCategorysfun}
                                allowClear
                            >
                                {valueCategory?.map((option, i) => (
                                    <option key={i} value={option._id}>{option.title}</option>
                                ))}
                            </Select>

                        </Form.Item>
                    </div>

                    <label className="label-name">Question</label>
                    <Form.Item
                        name="question"
                        rules={[
                            {
                                required: true,
                                message: "Please enter question!"
                            },
                            {
                                pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
                                message: "Enter only characters"
                            }
                        ]}
                    >
                        <Input type="textarea" placeholder='Enter question' />
                    </Form.Item>

                    <label className="label-name">Answer</label>
                    <Form.Item
                        name="answer"
                        rules={[
                            {
                                required: true,
                                message: "Please enter answer!"
                            },
                            {
                                pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
                                message: "Enter only characters"
                            }
                        ]}
                    >
                        <Input type="textarea" placeholder='Enter answer' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Faq