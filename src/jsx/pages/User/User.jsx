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
import PhoneInput from "react-phone-input-2";
import dummy from "../../../images/dummy.png";
import 'react-phone-input-2/lib/style.css';
import startsWith from 'lodash.startswith';
import PageLoader from '../Common/PageLoader';


const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { chatClient } = useContext(SocketContext);
    const [id, setId] = useState('');
    const [phoneValue, setPhoneValue] = useState();
    const [visible, setVisible] = useState(false);
    const [userImg, setUserImg] = useState('');
    const [imageName, setImageName] = useState();
    const [form] = Form.useForm();
    const [isDefaultCountryCode, setIsDefaultCountryCode] = useState('in');
    const [phoneNo, setPhoneNo] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        chatClient.on('message', function (data) {
            if (data) {
                getUserList();
            }
        })
    }, [chatClient])

    const handlePhoneValue = (value, data) => {
        setPhoneNo(value.slice(data.dialCode.length));
        setCountryCode(data.dialCode);
    };

    const previewUserImageOnChange = (ev) => {
        let userImgSrc = URL.createObjectURL(ev.target.files[0]);
        let filesPath = ev.target.files[0];
        setUserImg(userImgSrc);
        const image = new FormData();
        image.append('image', filesPath);
        dispatch(UserService.uploadUserProfile(image))
            .then((res) => {
                if (res.data) {
                    setUserImg('');
                    setImageName(res.data.imageWithName)
                }
            })
            .catch((errors, statusCode) => {
                setUserImg('')
                ToastMe(errors.errorData, "error");
            });
    }

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
                            profilePic: res.data[i].profilePic,
                            image: res.data[i].image,
                            answer: res.data[i].answer,
                            readStatusCount: res.data[i].readStatusCount,
                            createdAt: res.data[i].createdAt,
                            isActive: res.data[i].isActive,
                            countryCode: res.data[i].countryCode
                        }
                    )
                }
                setData(newArr);
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const editModal = (text) => {
        let number = text?.countryCode + text?.mobile;
        form.setFieldsValue({
            email: text?.email || '',
            mobile: number || '',
            fullName: text?.fullName || '',
        })
        setVisible(true)
        setImageName(text?.image)
        setUserImg('')
        setCountryCode(text?.countryCode)
        setPhoneNo(text?.mobile)
        setId(text?.id)
    }

    const activeInactiveUser = (text) => {
        let data = {};
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
    };

    const onSubmit = (values) => {
        values.profilePic = imageName;
        values.user_id = id;
        values.countryCode = countryCode;
        values.mobile = phoneNo;
        dispatch(UserService.updateUser(values))
            .then((res) => {
                getUserList();
                ToastMe("User Updated Successfully", 'success')
                setVisible(false);
                setPhoneNo('');
                setCountryCode('');
                // form.resetFields();
            })
            .catch((errors) => {
                console.log(errors)
            })
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
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text) => {
                if (text == 1) {
                    return (
                        <span>Master</span>
                    )
                } else if (text == 2) {
                    return (
                        <span >User</span>
                    )
                }
                else if (text == 3) {
                    return (
                        <span >Pro</span>
                    )
                } else {
                    return (
                        <span >-</span>
                    )
                }
            }
        },
        {
            title: 'Email Verified',
            dataIndex: 'emailVerify',
            key: 'emailVerify',
            render: (text) => (
                <div>
                    <Badge as="a" bg="primary badge-circle">
                        {text === true ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>}
                    </Badge>
                </div>
            )
        },
        {
            title: 'Mobile Verified',
            dataIndex: 'mobileVerify',
            key: 'mobileVerify',
            render: (text) => (
                <div>
                    <Badge as="a" bg="primary badge-circle">
                        {text === true ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>}
                    </Badge>
                </div>
            )
        },
        {
            title: 'Profile',
            dataIndex: 'profilePic',
            key: 'profilePic',
            render: (text) => (
                <div className='col-6'>
                    <img src={text == '-' ? dummy : text} alt="" width="70px" height="70px" />
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, data) => (
                <div>
                    {data.isActive === 1 ? <Badge bg=" badge-lg " className='badge-primary light badge-xs' style={{ cursor: 'pointer' }} onClick={() => activeInactiveUser(data.id)} >Active</Badge>
                        : <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }} onClick={() => activeInactiveUser(data.id)} >Deactive</Badge>}
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
                            {/* <Dropdown.Item onClick={() => viewChat(text)}>Chat</Dropdown.Item> */}
                            <Dropdown.Item onClick={() => editModal(text)}>Edit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];

    const viewUser = (text) => {
        props.history.push("/user-detail", { userDetail: text })
    }
    // const viewChat = (text) => {
    //     props.history.push("/chat", { userDetail: text })
    // }
    const handleSearch = (value) => {
        getUserList(value)
    }

    return (
        <>
          <PageLoader loading={loading} />
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

            <Modal open={visible} title="Edit User" okText="Submit" cancelText="Cancel"
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
                            { max: 30, message: 'You can not enter more than 15 characters' },
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
                    {/* <label class="label-name">Mobile Number</label> */}
                    <Form.Item
                        name="mobile"
                        rules={[{ required: true, message: 'Please enter your mobile number!' }]}
                    >
                        {/* <PhoneInput
                            country={'us'}
                            onChange={(e) => handlePhoneValue(e)}
                        /> */}

                        <PhoneInput
                            country={isDefaultCountryCode}
                            countryCodeEditable={false}
                            disableCountryCode={false}
                            enableAreaCodes={false}
                            inputclassName="input-control form-control"
                            enableSearch={true}
                            onChange={handlePhoneValue}
                            value={phoneNo || undefined}
                            isValid={(inputNumber, country, countries) => {
                                return countries.some((country) => {
                                    return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                                });
                            }}
                        />
                    </Form.Item>
                    <label className="label-name">Profile</label>
                    <Form.Item
                        className='mb-2'
                        name="image"
                    >
                        <Input type="file" name='image' className="file-input-control" id='file-input-control' onChange={previewUserImageOnChange} accept="image/*" />
                    </Form.Item>
                    {userImg != '' ? <img src={userImg} style={{ width: "20%" }} alt="gallery" /> : ''}
                    {imageName != '' ? <img src={process.env.REACT_APP_PROFILE_URL + 'images/' + imageName} style={{ width: "20%" }} alt="gallery" /> : ''}
                </Form>
            </Modal>
        </>
    )
}

export default User