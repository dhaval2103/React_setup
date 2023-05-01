import { Form, Input, Button } from "antd";
import React, { useEffect, useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { SocketContext } from "../../../context/Socket";
import PerfectScrollbar from "react-perfect-scrollbar";
import DefaultImage from '../../../images/static-image.jpg'
import PageLoader from "../Common/PageLoader";
import moment from "moment";

const Chat = (props) => {
    const admin = props?.auth;
    const { state } = useLocation();
    const userDetail = state?.userDetail;
    const [form] = Form.useForm();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);
    const { connected, setPathName, setUserId, setSendMessages, chatData } = useContext(SocketContext);
    useEffect(() => {
        setPathName({ path: pathname });
        setUserId(userDetail?.user?._id)
    }, [pathname]);

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

    return (
        <>
            <PageLoader loading={loading} />
            <div className="user_chat_box chatbox card">
                <div className="card-header chat-list-header d-block">
                    <h4 className="mb-1 font-w700 fs-20">Chat with {userDetail?.user?.fullName}</h4>
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
                                                src={userDetail?.profilePic ? userDetail?.profilePic : DefaultImage}
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
            </div>
        </>

    )

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
    };
};
export default connect(mapStateToProps)(Chat);