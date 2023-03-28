import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
// import PageTitle from '../../layouts/PageTitle';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';

const User = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState();
    const [data, setData] = useState([]);

    const getUserList = () => {
        dispatch(UserService.getUser())
            .then((res) => {
                setData([]);
                setUserData(res.data);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    useEffect(() => {
        getUserList();
    }, [])

    const columnss = [
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
            title: 'Security Question',
            dataIndex: 'securityQuestion',
            key: 'securityQuestion',
        },
        {
            title: 'Your Question',
            dataIndex: 'yourQuestion',
            key: 'yourQuestion',
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
        },
        {
            title: 'Actions',
            key: 'actions',
        },
    ];

    useEffect(() => {
        if (userData) {
            for (var i = 0; i < userData.length; i++) {
                data.push(
                    {
                        key: i,
                        email: userData[i].email.text,
                        mobile: userData[i].mobile.text,
                        fullName: userData[i].fullName,
                        securityQuestion: userData[i].securityQuestion,
                        yourQuestion: userData[i].yourQuestion,
                        answer: userData[i].answer,
                    }
                )
            }
        }
    }, [userData, columnss])

    useEffect(() => {
        if (data) {
            setData(data)
        }
    }, [data])

    return (
        <>
            {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">User List</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            data.length > 0 &&
                            <Table dataSource={data} columns={columnss} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default User