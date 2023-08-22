import React, { useEffect, useMemo, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import {  Empty, Table } from 'antd';
import { Dropdown } from "react-bootstrap";
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';
import moment from 'moment';


const User = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState(null)

    const getBrokerList = (value) => {
        dispatch(UserService.getfmcsas(value))
            .then((res) => {
                var newArr = [];
                res.data.map((element, index) => {
                  return  newArr.push({key: index,...element});
                })
                setData(newArr)
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }
    



    const filteredData = useMemo(() => {
    if (selectedFilter === null) return data; // No filter selected, return all data

    // Filter based on the "isApprove" property
    return data.filter((item) => {
        if (selectedFilter === 0) {
        return item.isApprove === 0; // Filter for "Pending" brokers
        } else if (selectedFilter === 1) {
        return item.isApprove === 1; // Filter for "Approved" brokers
        }
        return true;
    });
    }, [data, selectedFilter]);
    
    
    useEffect(() => {
        getBrokerList();
    },[])

    const viewUser = (text) =>{
        props.history.push("/FMCSAS-view",{state:text})
    }

    const svg1 = (
        <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24"></rect>
                <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                <circle fill="#000000" cx="19" cy="12" r="2"></circle>
            </g>
        </svg>
    );

    const columnss = [
        {
            title: 'ID',
            dataIndex: "key",
            key: "key",
            render: (text) => <div>{text + 1}</div>,
        },
        {
            title: 'Dot Number',
            dataIndex: 'dotNumber',
            key: 'dotNumber',
            render:(data)=>(
                data === '' || data === null ? "-" : data
            )
        },
        {
            title: 'Mc Number',
            dataIndex: 'mc_number',
            key: 'mc_number',
            render:(data)=>(
                data === '' || data === null ? "-" : data
            )
        },
        {
            title: 'Legal Name',
            dataIndex: 'legal_name',
            key: 'legal_name',
            render:(data)=>(
                data === '' || data === null ? "-" : data
            )
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render:(data)=>(
                data === '' || data === null ? "-" : data
            )
        },

        {
            title: 'Latest Update',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render:(data)=>(
                data === '' || data === null ? "-" : moment(data).format('DD/MM/YYYY')
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text) => (
                <>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="danger"
                            className="light sharp i-false badge_label"
                        >
                            {svg1}
                            {
                                text.readStatusCount > 0 ?
                                    <span className="badge light text-white bg-danger rounded-circle">{text.readStatusCount}</span> : ''
                            }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => viewUser(text)}>View</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">FMCSAS List</h4>
                    {/* <div>
                        <Dropdown>
                        <Dropdown.Toggle variant="primary">
                            Filter by Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleFilterChange(1)}>Approved</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterChange(0)}>Pending</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </div> */}
                </div>
                <div className="card-body">
                <div className="table-responsive">
                    {filteredData && filteredData.length > 0 ? (
                    <Table dataSource={filteredData} columns={columnss} className='table_custom' />
                    ) : (
                    <Empty />
                    )}
                </div>
                </div>
            </div>
        </>
    )
}

export default User