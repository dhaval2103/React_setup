import React, { useEffect, useState } from "react";
// import { Socket } from "socket.io-client";
// import { authStore } from "./AuthProvider";
import socketio from "socket.io-client";
// import ChatStore from "./ChatStore";
import { connect } from "react-redux";
const SocketUrl = process.env.REACT_APP_BASE_URL;
// import setChatLogs from "./ChatStore";
// const SocketUrl = 'http://192.168.0.144:7010';

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
    // const [lastId, setLastId] = useState(null)
    // const setChatLogs = ChatStore((state) => state.setChatLogs);
    // const appendChatLogs = ChatStore(state => state.appendChatLogs);
    // const updateMessageStatus = ChatStore((state) => state.updateMessageStatus)
    // const disputeData = ChatStore((state) => state.disputeData);

    // connection
    useEffect(() => {
        if (admin) {
            const initChat = () => {
                const client = socketio(SocketUrl, {
                    query: {
                        userId: admin.id,
                        type: "3"
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
                    console.log('connected')
                    setConnected(true);
                });
                setChatClient(client);

            };
            initChat();
            return () => chatClient?.disconnect();
        }
    }, [admin]);

    useEffect(() => {
        if (connected && pathName && pathName.path !== undefined) {
            chatClient.emit('createConversation', {
                "from": admin.id,
                "to": userId
            }, function (data) {
                setChatId(data.chatId)
                // get user messages
            })
        }
    }, [connected, pathName])

    const getMessages = () => {
        chatClient.emit('getMessages', {
            "chatId": chatId,
            "userId": admin.id
        }, function (data) {
            setChatData(data)
        })
    }

    useEffect(() => {
        if (chatId) {
            getMessages();
        }
    }, [chatId])

    useEffect(() => {
        if (sendMessages) {
            chatClient.emit('message', {
                "senderId": admin.id,
                "receiverId": userId,
                "chatId": chatId,
                "message": sendMessages.message,
                "senderType": 1,
                "msgType": 1
            }, function (data) {
                getMessages();
            });
        }
    }, [sendMessages])

    // useEffect(() => {
    //     if (connected == true) {

    //         chatClient.emit('getMessagesByLastId', {
    //             "chatId": "b81cda11-b229-46f6-bb01-ab67c77f6a71",
    //             "lastId": "642fd2821d6bc791c9e5737b",
    //             "userId": "641a8ea2a3d4415154cc0846"
    //         }, function (data) {
    //             console.log(888888888, data)
    //         })

    //         // const paramsObj = { disputeId: pathName.disputeId }
    //         // if (lastId) {
    //         //     paramsObj.lastId = lastId
    //         // }
    //         // chatClient.emit('getMessagesByLastId', paramsObj, (data) => {
    //         //     chatClient.emit('messageStatus', {
    //         //         "event": "readAllMessages",
    //         //         "from": disputeData.admin_id,
    //         //         "to": pathName.disputeId
    //         //     });
    //         //     const recievedMsg = data ? data.map(element => {
    //         //         return ({
    //         //             chatLogId: element.mId,
    //         //             chatSenderId: element.senderId,//sender_id
    //         //             chatLogTimeStamp: element.createdAt,
    //         //             chatLogText: element.message,
    //         //             chatDatabaseId: element._id,
    //         //             ChatSenderType: element.senderType,
    //         //             ChatDisputeId: element.disputeId,
    //         //             ChatMessageType: element.msgType,
    //         //             chatReadStatus: element.readStatus
    //         //         })
    //         //     }) : []
    //         //     if (recievedMsg.length) {
    //         //         setChatLogs(recievedMsg, pathName.disputeId, lastId);
    //         //     }
    //         // });
    //     }
    // }, [connected]);


    // useEffect(() => {
    //     if (connected) {
    //         chatClient.emit('listChats', { userId: user.id }, function (data) {
    //             if (data) {
    //                 console.log("data", data);
    //             }
    //         })
    //     }
    // }, [connected]);

    return (
        <SocketContext.Provider value={{ connected, setPathName, setUserId, setSendMessages, chatData }} >
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