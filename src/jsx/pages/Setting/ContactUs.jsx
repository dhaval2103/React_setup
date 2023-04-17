import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SettingService from "../../../services/setting"
import ToastMe from "../Common/ToastMe";

const ContactUs = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [contactData, setContactData] = useState();

    const getContactList = () => {
        dispatch(SettingService.getContactList())
            .then((res) => {
                setContactData(res.data[0])
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const onFinish = (data) => {
        dispatch(SettingService.addSupportEmailMobile(data))
            .then((res) => {
                ToastMe(res.data.message, 'success')
            })
            .catch(({ errorData }) => {
                for (const e in errorData.errors) {
                    form.setFields([
                        {
                            name: e,
                            touched: false,
                            errors: [errorData.errors[e]],
                        },
                    ]);
                }
            })
    }

    useEffect(() => {
        getContactList();
    }, [])

    useEffect(() => {
        if (contactData) {
            form.setFieldsValue({
                email: contactData.email,
                mobile: contactData.mobile
            })
        }
    }, [contactData])

    return (
        <>
            <Col xl="12">
                <Card>
                    <Card.Header className=" border-0 pb-0">
                        <Card.Title>Contact Us</Card.Title>
                    </Card.Header>
                    <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
                        <Card.Body>
                            <div className="row">
                                <div className="col-6">
                                    <label className="label-name">Support Email</label>
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: "Please enter support email!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className="col-6">
                                    <label className="label-name">Support Mobile</label>
                                    <Form.Item
                                        name="mobile"
                                        rules={[{ required: true, message: "Please enter support phone number!" }]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                </div>
                            </div>
                            <Button type="submit" className="float-end me-2 btn-xl" variant="primary">
                                Save
                            </Button>
                        </Card.Body>
                        <Card.Footer className=" border-0 pt-0">
                            <Card.Text className=" d-inline"></Card.Text>
                        </Card.Footer>
                    </Form>
                </Card>
            </Col>
        </>
    )
}

export default ContactUs