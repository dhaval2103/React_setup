import React, { useEffect, useState } from "react";
import socketio from "socket.io-client";
import { connect } from "react-redux";
const SocketUrl = process.env.REACT_APP_BASE_URL;

export const SocketContext = React.createContext();

const SocketContextProvider = (props) => {
    const admin = props?.adminData;
    const [chatClient, setChatClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [pathName, setPathName] = useState({});
    const [userId, setUserId] = useState();
    const [maintenceId, setmaintenceId] = useState();
    const [sendMessages, setSendMessages] = useState();
    const [chatData, setChatData] = useState();
    const [userData, setUserData] = useState();
    const [chatId, setChatId] = useState();
    const [isLive, setLive] = useState(false);

    // connection
    useEffect(() => {
        if (admin) {
            const initChat = () => {
                const client = socketio(SocketUrl, {
                    query: {
                        userId: admin?.id,
                        type: 2
                    },
                    transports: ["websocket"],
                    upgrade: true,
                    reconnection: false,
                    autoConnect: false,
                    forceNew: true,
                });
                if (!client.connected) {
                    client.connect();
                }
                client.on('connect', function () {
                    // console.log('connected')
                    setConnected(true);
                });
                setChatClient(client);
            };
            initChat();
            return () => chatClient?.disconnect();
        }
    }, [admin]);

    // Maintenance chat
    useEffect(() => {
        setTimeout(() => {
            if (connected == true && pathName && pathName.path !== undefined && userId !== undefined && isLive == false) {
                chatClient.emit('createConversation', {
                    "from": admin.id,
                    "to": userId,
                    "chatId": maintenceId
                }, function (data) {
                    setChatId(data?.chatId)
                })
            }
        }, 500)
    }, [connected, pathName, userId, maintenceId, isLive])

    // live chat
    useEffect(() => {
        setTimeout(() => {
            if (connected == true && pathName && pathName.path !== undefined) {
                chatClient.emit('liveConnection', {
                    "isLive": true
                }, function (data) {
                    setUserData(data)
                })
            }
        }, 500)
    }, [connected, pathName])

    useEffect(() => {
        if (connected == true) {
            chatClient.on('liveConnection', function (data) {
                if (data) {
                    setUserData(data)
                }
            })
        }
    }, [connected])

    useEffect(() => {
        setTimeout(() => {
            if (connected == true && userId !== undefined && isLive == true) {
                chatClient.emit('createLiveConversation', {
                    "from": admin.id,
                    "to": userId,
                }, function (data) {
                    setChatId(data.livechatId)
                })
            }
        }, 500)
    }, [connected, userId, isLive])

    useEffect(() => {
        if (userId !== undefined) {
            chatClient.emit('messageStatus', {
                "event": "readAllMessages",
                "from": userId,
                "to": admin.id
            });
        }
    }, [userId, chatData])

    const getMessages = () => {
        chatClient.emit('getMessages', {
            "chatId": chatId,
            "userId": admin.id
        }, function (data) {
            if (data) {
                setChatData(data)
            }
        })

        chatClient.on('message', function (data) {
            if (data) {
                getMessages();
            }
        })
    }

    useEffect(() => {
        if (sendMessages) {
            chatClient.emit('message', {
                "senderId": admin.id,
                "receiverId": userId,
                "chatId": chatId,
                "message": sendMessages.message,
                "senderType": 2,
                "msgType": 1
            }, function (data) {
                getMessages();
            });
        }
    }, [sendMessages])

    useEffect(() => {
        if (chatId != undefined) {
            setTimeout(() => {
                getMessages();
            }, 500);
        }
    }, [chatId])

    return (
        <SocketContext.Provider value={{ connected, setPathName, setUserId, setSendMessages, setLive, setmaintenceId, chatData, userData, chatClient }} >
            {props.children}
        </SocketContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
        adminData: state.auth.auth
    };
};
export default connect(mapStateToProps)(SocketContextProvider);