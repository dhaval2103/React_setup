import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
// import PageTitle from '../../layouts/PageTitle';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';

const User = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const getUserList = () => {
        dispatch(UserService.getUser())
            .then((res) => {
                setData([]);
                for (var i = 0; i < res.data.length; i++) {
                    data.push(
                        {
                            key: i,
                            email: res.data[i].email.text,
                            mobile: res.data[i].mobile.text,
                            fullName: res.data[i].fullName,
                            securityQuestion: res.data[i].securityQuestion,
                            yourQuestion: res.data[i].yourQuestion,
                            answer: res.data[i].answer,
                        }
                    )
                }
                setData(data)
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

    return (
        <>
            {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">User List</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {console.log(data.length)}
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