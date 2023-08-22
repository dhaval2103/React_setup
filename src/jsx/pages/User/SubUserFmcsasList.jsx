import React, {useEffect, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import {  Empty, Table } from 'antd';
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
        dispatch(UserService.getSubUserFmcsasList(linkdata))
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            dotNumber: res.data[i].dotNumber,
                            entity_type: res.data[i].entity_type,
                            legal_name: res.data[i].legal_name,
                            mc_number: res.data[i].mc_number,
                            mc_mx_ff_numbers: res.data[i].mc_mx_ff_numbers,
                            mcs_150_form_date: res.data[i].mcs_150_form_date,
                            phone: res.data[i].phone,
                            physical_address: res.data[i].physical_address,
                            userfirstName: res.data[i].userfirstName,
                            userlastName: res.data[i].userlastName,
                            usercompanyName: res.data[i].usercompanyName,
                            email: res.data[i].email,
                            id: res.data[i]._id,
                            usermobile: res.data[i].usermobile,
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
            title: 'Dot number',
            dataIndex: 'dotNumber',
            key: 'dotNumber',
        },
        {
            title: 'Entity type',
            dataIndex: 'entity_type',
            key: 'entity_type',
        },
        {
            title: 'Legal name',
            dataIndex: 'legal_name',
            key: 'legal_name',
        },
        {
            title: 'MC number',
            dataIndex: 'mc_number',
            key: 'mc_number',
        },
        {
            title: 'Mc Mx Ff nuumber',
            dataIndex: 'mc_mx_ff_numbers',
            key: 'mc_mx_ff_numbers',
        },
        {
            title: 'Form date',
            dataIndex: 'mcs_150_form_date',
            key: 'mcs_150_form_date',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Physical address',
            dataIndex: 'physical_address',
            key: 'physical_address',
        },
    ];

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Sub User FMCSAS List</h4>
                </div>
                <div className="card-body">
                <div className="table-responsive">
                    <Table columns={columnss} className='table_custom' dataSource={data} />
                    {data.length === 0 && <Empty />}
                </div>
                </div>
            </div>
        </>
    )
}

export default User