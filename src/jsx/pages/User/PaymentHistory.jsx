import React, { useEffect, useState } from 'react'
import UserService from '../../../services/user';
import PageLoader from '../Common/PageLoader';
import { useDispatch } from 'react-redux';
import { Empty, Table } from 'antd';

const PaymentHistory = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const getPaymentHistory = () => {
        dispatch(UserService.getPaymentHistory())
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res?.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            planName: res?.data[i].subscribeUsers.plan.packageName || '-',
                            fullName: res?.data[i].user.fullName || '-',
                            mobile: res?.data[i].user.mobile || '-',
                            email: res?.data[i].user.email || '-',
                            userId: res?.data[i].userId || '-',
                            image: res?.data[i].image || '-',
                            id: res?.data[i]._id || '-',
                            createdAt: res?.data[i].createdAt || '-'
                        }
                    )
                }
                setLoading(false)
                setData(newArr);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

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
            title: 'Name',
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
            title: 'PackageName',
            dataIndex: 'planName',
        },
    ];

    useEffect(() => {
        getPaymentHistory();
    }, [])
    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Payment History</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            data && data.length > 0 ?
                                <Table dataSource={data} columns={columnss} className='table_custom' /> : <Empty />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentHistory
