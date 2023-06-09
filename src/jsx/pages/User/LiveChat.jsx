import React, { useContext, useEffect, useRef, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button, Empty, Form, Input, Modal, Table } from 'antd';
import { Col, Row } from "react-bootstrap";
import moment from 'moment';
import { SocketContext } from '../../../context/Socket';
import { SearchOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router';
import PerfectScrollbar from "react-perfect-scrollbar";
import DefaultImage from '../../../images/static-image.jpg'
import { connect } from 'react-redux';
import PageLoader from '../Common/PageLoader';

const LiveChat = (props) => {
    const admin = props?.auth;
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { chatClient } = useContext(SocketContext);
    const [id, setId] = useState('');
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState();
    const [form] = Form.useForm();
    const { pathname } = useLocation();
    // const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    const { connected, setPathName, setUserId, setSendMessages, setLive, chatData, userData } = useContext(SocketContext);

    useEffect(() => {
        setPathName({ path: pathname });
        // setUserId(userData?.id)
    }, []);

    const updateScrollHandel = useRef()
    const updateScrollHeight = updateScrollHandel.current

    const scrollUpdateHandel = () => {
        if (updateScrollHeight) {
            updateScrollHeight.scrollTop = updateScrollHeight.scrollHeight
        }
    }

    setTimeout(() => {
        setLoading(false);
    }, 1000)

    useEffect(() => {
        scrollUpdateHandel()
    }, [chatData, updateScrollHeight]);

    const sendMessage = (values) => {
        if (values.message.trim().length > 0) {
            setSendMessages(values)
        }
        form.resetFields();
        scrollUpdateHandel()
    }

    const createChat = (text) => {
        setUser(text)
        setUserId(text.id);
        setLive(true);
    }

    // useEffect(() => {
    //     chatClient.on('liveConnection', {
    //         "isLive": true
    //     }, function (data) {
    //         console.log(data);
    //     })
    // }, [])

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
        var newArr = [];
        for (var i = 0; i < userData?.length; i++) {
            newArr.push(
                {
                    key: i,
                    email: userData[i].email.text,
                    id: userData[i]._id,
                    emailVerify: userData[i].email.verified,
                    mobile: userData[i].mobile.text,
                    user: userData[i].user,
                    role: userData[i].role,
                    mobileVerify: userData[i].mobile.verified,
                    fullName: userData[i].fullName,
                    securityQuestion: userData[i].securityQuestion,
                    yourQuestion: userData[i].yourQuestion,
                    answer: userData[i].answer,
                    profilePic: userData[i].profilePic,
                    readStatusCount: userData[i].readStatusCount,
                    createdAt: userData[i].createdAt,
                    isActive: userData[i].isActive
                }
            )
        }
        setData(newArr);
    }, [userData])

    const columnss = [
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text, data) => (
                <>
                    <div style={{ display: 'flex' }} onClick={() => createChat(data)}>{text}</div>
                </>
            )
        },
        // {
        //     title: 'Actions',
        //     key: 'actions',
        //     render: (text) => (
        //         <>
        //             <Dropdown>
        //                 <Dropdown.Toggle
        //                     variant="danger"
        //                     className="light sharp i-false badge_label"
        //                 >
        //                     {svg1}
        //                     {
        //                         text.readStatusCount > 0 ?
        //                             <span className="badge light text-white bg-danger rounded-circle">{text.readStatusCount}</span> : ''
        //                     }
        //                 </Dropdown.Toggle>
        //                 <Dropdown.Menu>
        //                     <Dropdown.Item onClick={() => viewChat(text)}>Chat</Dropdown.Item>
        //                 </Dropdown.Menu>
        //             </Dropdown>
        //         </>
        //     )
        // },
    ];

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

    const handleChat = (data) => {
        console.log(data)
    }


    return (
        <>
            <Row>
                <Col xl="3">
                    <div className="card">
                        <div className="card-header">
                            {/* <h4 className="card-title">User List</h4> */}
                            <div className="search-group">
                                <Input placeholder='Search' prefix={<SearchOutlined className="site-form-item-icon" />} />
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                {
                                    data && data.length > 0 ?
                                        <Table dataSource={data} columns={columnss} pagination={false} /> : <Empty />
                                }
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl="8">
                    <PageLoader loading={loading} />
                    <div className="user_chat_box chatbox card">
                        {
                            user && chatData ? <>
                                <div className="card-header chat-list-header d-block">
                                    <h4 className="mb-1 font-w700 fs-20">Chat with {user?.fullName}</h4>
                                    <p className="mb-0 text-success fs-14">Online</p>
                                </div>
                                <PerfectScrollbar containerRef={el => (updateScrollHandel.current = el)} className={`card-body msg_card_body dlab-scroll ps ps--active-y`} id="DZ_W_Contacts_Body3" >
                                    {
                                        chatData?.map((chat, i) => {
                                            if (chat?.senderType == 2) {
                                                return (
                                                    <div className="d-flex justify-content-end mb-3 left" key={i}>
                                                        <div className="">
                                                            <div className="msg_cotainer_send">
                                                                {chat.message}
                                                            </div>
                                                            <span className="msg_time_send mt-1 d-inline-block lh-1">{moment(chat?.createdAt).format('HH:mm A')}</span>
                                                        </div>
                                                        {console.log(admin)}
                                                        <div className="img_cont_msg">
                                                            <img
                                                                src={admin?.profileImage ? admin?.profileImage : DefaultImage}
                                                                className="rounded-circle user_img_msg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="d-flex justify-content-start mb-3 right" key={i}>
                                                        <div className="img_cont_msg">
                                                            <img
                                                                src={user?.profilePic ? user?.profilePic : DefaultImage}
                                                                className="rounded-circle user_img_msg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="">
                                                            <div className="msg_cotainer">
                                                                {chat.message}
                                                            </div>
                                                            <span className="msg_time mt-1 d-inline-block lh-1">{moment(chat?.createdAt).format('HH:mm A')}</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }


                                </PerfectScrollbar>
                                <div className="card-footer type_msg">
                                    <Form form={form} layout="vertical" name="form_in_modal"
                                        initialValues={{
                                            modifier: "public"
                                        }}
                                    >
                                        <Form.Item name="message" className="mb-0"
                                        // rules={[{ required: true, message: "Please entre message!" }]}
                                        >
                                            <Input type="text" placeholder="Type a message" onKeyDown={(e) => e.keyCode === 13 && sendMessage(form.getFieldValue())} suffix={
                                                <Button
                                                    key="submit"
                                                    type="primary"
                                                    onClick={() => sendMessage(form.getFieldValue())}
                                                >
                                                    send
                                                </Button>
                                            } />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </> : ''
                        }
                    </div>

                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    };
};
export default connect(mapStateToProps)(LiveChat);