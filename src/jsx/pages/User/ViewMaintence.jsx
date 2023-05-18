import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Dropdown, Col } from "react-bootstrap";
import { Modal, Table, Button, Input, Form, DatePicker, Select, TimePicker, Space } from 'antd';
import moment from "moment";
import { Badge } from "react-bootstrap";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import ToastMe from "../Common/ToastMe";
import swal from "sweetalert";

const ViewMaintence = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const [userDetail, setUserDetail] = useState(state?.userDetail);
    const [visibleApprove, setVisibleApprove] = useState(false);
    const [techancian, setTechnician] = useState();
    const [addtechancian, setAddTecnicianName] = useState();
    const [form] = Form.useForm();

    const openapprovemodal = () => {
        setVisibleApprove(true);
    }
    const handleChangeName = (e) => {
        setAddTecnicianName(e);
        form.setFieldsValue({
            technicianId: e
        })
    }

    const approveRejectRequest = (text) => {
        let values = {};
        values.technicianStatus = text;
        values._id = userDetail?._id;
        let status = "";
        if (text == 3) {
            status = "reject";
        } else {
            status = "close"
        }
        swal({
            title: 'Confirm Status Update',
            text: 'Are you sure you want to ' + status + ' this request?',
            icon: 'warning',
            buttons: ['Cancel', 'Confirm'],
            dangerMode: true,
        }).then((confirmed) => {
            if (confirmed) {
                dispatch(UserService.approveRequest(values))
                    .then((res) => {
                        ToastMe(res.data.message, 'success');
                        databyId();

                    })
                    .catch((errors) => {
                        console.log({ errors });
                    });
            } else {
                console.log('Status update cancelled');
            }
        });
    }

    const databyId = () => {
        const id = userDetail?._id;
        dispatch(UserService.listRequestbyId(id))
            .then((res) => {
                setUserDetail(res.data)
                setVisibleApprove(false)
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const onSubmits = (values) => {
        values._id = userDetail?._id;
        dispatch(UserService.approveRequest(values))
            .then((res) => {
                ToastMe('Technician assign successfully', 'success')
                databyId()
                setVisibleApprove(false);
            })
        form.resetFields()
            .catch((errors) => {
                console.log({ errors })
            })
    }
    const getTechnician = () => {
        dispatch(UserService.getTechnician())
            .then((res) => {
                setTechnician(res.data);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }
    useEffect(() => {
        getTechnician();
        databyId();
    }, [])
    return (
        <>
            <Row>
                <Col xl="12">
                    <Card className='table_custom'>
                        <Card.Header>
                            <Card.Title className="text-white">Maintenance Detail</Card.Title>
                            <div className="d-flex align-items-center gap-3">
                                {userDetail?.technicianStatus == 0 ?
                                    <span className="badge badge-primary" >Pending</span> :
                                    userDetail?.technicianStatus === 1 ?
                                        <span className="badge badge-success" >Completed</span> :
                                        userDetail?.technicianStatus === 2 ?
                                            <span className="badge badge-warning" >In progress</span> :
                                            userDetail?.technicianStatus === 3 ?
                                                <span className="badge badge-danger" >Reject</span> :
                                                userDetail?.technicianStatus === 4 ?
                                                    <span className="badge badge-success" >Closed</span> : ''

                                }
                                {userDetail?.technicianStatus == 0 ?
                                    <Dropdown className="drop" drop="end">
                                        <Dropdown.Toggle
                                            variant="danger"
                                            className="light sharp i-false"

                                        >
                                            Change Status
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu-end">
                                            <Dropdown.Item onClick={() => approveRejectRequest(3)}>Reject</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> :
                                    userDetail?.technicianStatus == 1 ?
                                        <Dropdown className="drop" drop="end">
                                            <Dropdown.Toggle
                                                variant="danger"
                                                className="light sharp i-false"

                                            >
                                                Change Status
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-end">
                                                <Dropdown.Item onClick={() => approveRejectRequest(4)}>Closed</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> : ''
                                }
                            </div>

                        </Card.Header>
                        <Card.Body className="mb-0">
                            <Card.Text>
                                <div>
                                    <label className="label-name" style={{ fontWeight: 'bold', fontSize: '16px' }}>Location :&nbsp;</label>
                                    {userDetail?.location ? userDetail?.location : '-'}
                                </div>
                            </Card.Text>
                            <Card.Text>
                                <div>
                                    <label className="label-name" style={{ fontWeight: 'bold', fontSize: '16px' }}>Message :&nbsp;</label>
                                    {userDetail?.message ? userDetail?.message : '-'}
                                </div>
                            </Card.Text>
                            {userDetail?.attachments.length > 0 ?
                                <Card.Text>
                                    <label className="label-name">Attachments:</label>
                                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                                        {
                                            userDetail?.attachments?.map((item, index) => {
                                                return (
                                                    <>
                                                        <div className="img_wrapper" key={index} style={{ marginRight: "10px" }}>
                                                            <img src={process.env.REACT_APP_PROFILE_URL + 'images/' + item}
                                                                style={{ width: "auto", height: "100px", objectFit: "cover" }}
                                                                alt="gallery" />
                                                        </div>
                                                        {/* {/ <img src={process.env.REACT_APP_PROFILE_URL + 'images/' + item} alt="" width="70px" height="70px" /> /} */}
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </Card.Text> : ''}
                        </Card.Body>
                    </Card>
                </Col>
                {userDetail?.technicianStatus == 3 ? '' :
                    <Col xl="12">
                        <Card className='table_custom'>
                            <Card.Header>
                                <Card.Title className="text-white">Assign Technician</Card.Title>
                                {userDetail?.technicianStatus == 0 ?
                                    <Button onClick={() => openapprovemodal(userDetail)}>Assign Technician</Button> : ''}
                            </Card.Header>
                            <Card.Body className="mb-0">

                                {
                                    userDetail?.technician != '-' ?
                                        <div>
                                            <h4>Technician</h4>
                                            <Card.Text>
                                                <div>
                                                    <label className="label-name">Name:</label>
                                                    {userDetail?.technician?.name ? userDetail?.technician?.name : '-'}
                                                </div>
                                            </Card.Text>
                                            <Card.Text>
                                                <div>
                                                    <label className="label-name">Email:</label>
                                                    {userDetail?.technician?.email ? userDetail?.technician?.email : '-'}
                                                </div>
                                            </Card.Text>
                                            <Card.Text>
                                                <div>
                                                    <label className="label-name">About:</label>
                                                    {userDetail?.technician?.about ? userDetail?.technician?.about : '-'}
                                                </div>
                                            </Card.Text>
                                        </div>
                                        : ''
                                }
                                {/* <label className="label-name">Location:</label>
                                    {userDetail?.location ? userDetail?.location : '-'} */}

                            </Card.Body>
                        </Card>
                    </Col>}
            </Row >


            <Modal
                open={visibleApprove}
                title=''
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => {
                    setVisibleApprove(false);
                }}
                footer={[
                    <Button key="cancel" onClick={() => setVisibleApprove(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"

                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onSubmits(values);
                                })
                                .catch((info) => {
                                    console.log("Validate Failed:", info);
                                });
                        }}
                    >
                        Submit
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: "public"
                    }}
                >
                    <label className="label-name">Technician Name</label>
                    <div>
                        <Form.Item
                            name="technicianId"
                            rules={[{ required: true, message: "Please select Technician name!" }]}
                        >
                            <Select
                                placeholder="Select a Technician"
                                name="technicianId"
                                id="technicianId"
                                label="technicianname"
                                value={techancian}
                                onChange={handleChangeName}
                                allowClear
                            >
                                {techancian?.map((option, i) => (
                                    <option key={i} value={option._id}>{option.name}</option>
                                ))}
                            </Select>

                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default ViewMaintence