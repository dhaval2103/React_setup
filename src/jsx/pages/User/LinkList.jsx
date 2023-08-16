import React, { useEffect, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import moment from 'moment';
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const linkdata = location.state;

    const getBrokerList = () => {
        dispatch(UserService.getLinkList(linkdata))
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            userfirstName: res.data[i].firstName,
                            userlastName: res.data[i].lastName,
                            usercompanyName: res.data[i].usercompanyName,
                            email: res.data[i].email,
                            id: res.data[i]._id,
                            usermobile: res.data[i].usermobile,
                            createdAt: res.data[i].createdAt,
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
    
    useEffect(() => {
        getBrokerList();
    },[])

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
            title: 'User First name',
            dataIndex: 'userfirstName',
            key: 'userfirstName',
        },
        {
            title: 'User Last name',
            dataIndex: 'userlastName',
            key: 'userlastName',
        },
        {
            title: 'User Company name',
            dataIndex: 'usercompanyName',
            key: 'usercompanyName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Mobile',
            dataIndex: 'usermobile',
            key: 'usermobile',
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
    ];

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Link List</h4>
                </div>
                <div className="card-body">
                <div className="table-responsive">
                    <Table columns={columnss} className='table_custom' dataSource={data} />
                    {/* {data.length === 0 && <Empty />} */}
                </div>
                </div>
            </div>
        </>
    )
}

export default User