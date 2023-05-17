import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SettingService from "../../../services/setting"
import ToastMe from "../Common/ToastMe";
import PageLoader from "../Common/PageLoader";
import PhoneInput from "react-phone-input-2";
import startsWith from 'lodash.startswith';

const ContactUs = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [contactData, setContactData] = useState();
    const [loading, setLoading] = useState(true);
    const [phoneNo, setPhoneNo] = useState('');
    const [phoneVelidation, setPhoneVlidation] = useState('')
    const [isDefaultCountryCode, setIsDefaultCountryCode] = useState('in');


    const getContactList = () => {
        dispatch(SettingService.getContactList())
            .then((res) => {
                setLoading(false);
                setContactData(res.data[0])
                setPhoneNo(res.data[0].mobile);

            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const handlePhoneValue = (value, data) => {

        setPhoneNo(value);

        let phone = value.slice(data.dialCode.length);

        let dataValue = '' + phone;
        setPhoneVlidation('')
        if (dataValue.length < 7) {
            setPhoneVlidation('Enter valid mobile number')
        }
    };

    const onFinish = (data) => {
        data.mobile = phoneNo;
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
            <PageLoader loading={loading} />
            <Col xl="12">
                <Card className='table_custom'>
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
                                        rules={[{ required: true, message: "Please enter support email" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className="col-6">
                                    <label className="label-name">Support Mobile</label>
                                    <Form.Item
                                        className='mb-2'
                                        name="mobile"
                                        rules={[{ required: true, message: 'Please enter your mobile number' }]}
                                    >
                                        <PhoneInput
                                            country={isDefaultCountryCode}
                                            countryCodeEditable={false}
                                            disableCountryCode={false}
                                            enableAreaCodes={false}
                                            inputclassName="input-control form-control"
                                            enableSearch={true}
                                            onChange={handlePhoneValue}
                                            value={phoneNo || undefined}
                                            isValid={(inputNumber, country, countries) => {
                                                return countries.some((country) => {
                                                    return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                                                });
                                            }}
                                        />

                                    </Form.Item>
                                    <span style={{ color: 'red' }}>{phoneVelidation}</span><br></br>
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