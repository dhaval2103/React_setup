import { Form, Input, Button } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
// import { SendOutlined } from "@ant-design/icons";
// import io from "socket.io-client";
import { SocketContext } from "../../../context/Socket";
// const socketURL = process.env.REACT_APP_BASE_URL;

const Chat = (props) => {
    // const authId = props.auth.id;
    const { state } = useLocation();
    const userDetail = state?.userDetail;
    const [form] = Form.useForm();
    const { pathname } = useLocation();
    const { connected, setPathName, setUserId, setSendMessages, chatData } = useContext(SocketContext);

    useEffect(() => {
        setPathName({ path: pathname });
        setUserId(userDetail.id)
    }, [pathname]);

    const sendMessage = (values) => {
        setSendMessages(values)
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title"></h4>
                </div>
                <div className="card-body">
                    {
                        chatData?.map((chat, i) => {
                            // console.log(chat.senderType)
                            if (chat.senderType == 2) {
                                return (
                                    <div className="right" key={i}>
                                        {chat.message}
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="left" key={i}>
                                        {chat.message}
                                    </div>
                                )
                            }
                        })
                    }
                    <div className="row">
                        <Form form={form} layout="vertical" name="form_in_modal"
                            initialValues={{
                                modifier: "public"
                            }}
                        >
                            <Form.Item name="message"
                                rules={[{ required: true, message: "Please entre message!" }]}
                            >
                                <Input type="text" placeholder="Type a message" />
                            </Form.Item>
                            <Button
                                key="submit"
                                type="primary"
                                onClick={() => sendMessage(form.getFieldValue())}
                            >
                                send
                            </Button>
                        </Form>
                    </div>
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