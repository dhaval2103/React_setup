import { Form, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { SendOutlined } from "@ant-design/icons";
import io from "socket.io-client";
const socketURL = process.env.REACT_APP_BASE_URL;

const Chat = (props) => {
    const authId = props.auth.id
    const { state } = useLocation();
    const userDetail = state?.userDetail;
    const [form] = Form.useForm();
    const [converstiondata, setConverstionData] = useState([]);
    const [chatData, setChatData] = useState([])
    const [chatId, setChatId] = useState('')
    const [connected, setConnected] = useState(false);
    const [chatClient, setChatClient] = useState(null);
    const { pathname } = useLocation();

    useEffect(() => {
        if (authId) {
            const socketConnection = () => {
                const client = io(socketURL, {
                    query: {
                        userId: userDetail?.id,
                        type: 1
                    },
                    transports: ["websocket"],
                    upgrade: true,
                    reconnection: false,
                    autoConnect: false,
                    forceNew: true,
                });

                if (!client.connected) {
                    client.connect();
                    // console.log('connect')
                }
                client.on('connect', function () {
                    setConnected(true);
                });
                setChatClient(client)
            }
            socketConnection()
            return () => chatClient?.disconnect();
        }

    }, [authId])

    const sendMessage = (values) => {
        if (values.message != null) {
            chatClient.emit('message', {
                "senderId": authId,
                "receiverId": userDetail?.id,
                "chatId": chatId,
                "message": values.message,
                "senderType": 1,
                "msgType": 1
            }, function (data) {
                chatClient.emit('getMessages', {
                    "chatId": chatId,
                    "userId": authId
                }, function (data) {
                    // console.log(data)
                    setChatData(data)
                })
            });
        }
    }



    useEffect(() => {
        if (connected && pathname?.includes('chat')) {
            chatClient.emit('createConversation', {
                "from": authId,
                "to": userDetail?.id
            }, function (data) {
                // console.log(data)
                setChatId(data.chatId)
            });
        }
        if (connected && pathname?.includes('chat')) {
            chatClient.emit('getMessages', {
                "chatId": chatId,
                "userId": authId
            }, function (data) {
                // console.log(data)
                setChatData(data)
            })
        }

        // chatClient.on('getMessages', {
        //     "chatId": chatId,
        //     "userId": authId
        // }, function (data) {
        //     // console.log(data)
        //     setChatData(data)
        // })


    }, [connected, pathname, chatId])

    // useEffect(() => {
    //     socketConnection();
    // }, [])

    return (

        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title"></h4>
                </div>
                <div className="card-body">
                    {
                        chatData?.map((chat, i) => {
                            console.log(chat.senderType)
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