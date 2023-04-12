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
    const [sendMessages, setSendMessages] = useState();
    const [chatData, setChatData] = useState();
    const [chatId, setChatId] = useState();

    // connection
    useEffect(() => {
        if (admin) {
            const initChat = () => {
                const client = socketio(SocketUrl, {
                    query: {
                        userId: admin?.id,
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

    useEffect(() => {
        setTimeout(() => {
            if (connected == true && pathName && pathName.path !== undefined && userId !== undefined) {
                chatClient.emit('createConversation', {
                    "from": admin.id,
                    "to": userId
                }, function (data) {
                    setChatId(data.chatId)
                })
            }
        }, 500)
    }, [connected, pathName, userId])

    useEffect(() => {
        if(userId !== undefined){
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

        chatClient.on('message',  function (data) {
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
        <SocketContext.Provider value={{ connected, setPathName, setUserId, setSendMessages, chatData, chatClient }} >
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