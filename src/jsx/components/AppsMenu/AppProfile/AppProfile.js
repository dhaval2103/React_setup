import React, { Fragment, useState, useReducer, useEffect } from "react";
// import { Button, Dropdown, Modal, Tab, Nav, Form } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Button, Form, Input } from 'antd';
import { Edit2 } from 'iconsax-react';
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import profile from "../../../../images/profile/profile.png";
import UserService from "../../../../services/user";
import PageTitle from "../../../layouts/PageTitle";
import ToastMe from "../../../pages/Common/ToastMe";
import dummy from "../../../../images/dummy.png";


const initialState = false;
const reducer = (state, action) => {
	switch (action.type) {
		case 'sendMessage':
			return { ...state, sendMessage: !state.sendMessage }
		case 'postModal':
			return { ...state, post: !state.post }
		case 'linkModal':
			return { ...state, link: !state.link }
		case 'cameraModal':
			return { ...state, camera: !state.camera }
		case 'replyModal':
			return { ...state, reply: !state.reply }
		default:
			return state
	}
}

const AppProfile = (props) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState();
	const [form] = Form.useForm();
	const [userImg, setUserImg] = useState('');
	const [imageName, setImageName] = useState();

	const getProfile = () => {
		dispatch(UserService.getProfile())
			.then((res) => {
				setUser(res.data);
			})
			.catch((errors) => {
				console.log({ errors })
			})
	}

	const onFinish = (data) => {
		dispatch(UserService.updateUserProfile(data, props?.adminData))
			.then((res) => {
				ToastMe("Profile Updated Successfully", 'success');
				// setTimeout(() => {
				// 	window.location.reload();
				// }, 500)
				props.history.push('/dashboard');
			})
			.catch((errors) => {
				console.log({ errors })
			})
	};

	const options = {
		settings: {
			overlayColor: "#000000",
		},
	};

	useEffect(() => {
		getProfile();
	}, [])

	useEffect(() => {
		form.setFieldsValue({
			name: user?.name,
			email: user?.email,
			mobile: user?.mobile,
			admin_id: user?._id
		});
	}, [user])
	return (
		<Fragment>
			<div className="row">
				<div className="col-lg-12">
					<div className="profile card card-body px-3 pt-3 pb-0">
						<div className="profile-head">
							<div className="photo-content">
								<div className="cover-photo rounded" style={{height: '350px' }}></div>
							</div>
							<div className="profile-info">
								<Form
									name="basic"
									form={form}
									initialValues={{ remember: true }}
									onFinish={onFinish}
									autoComplete="off"
									className="mx-auto"
								>
									<div className="row">
										<div className="col-lg-6">
											<div className="form-group mb-3">
												<label htmlFor="" className="fs14 fw500 lh-1 mb-2"><b>Name</b></label>
												<Form.Item
													name="name"
													rules={[{ required: true, message: 'Please enter your name!' }]}
												>
													<Input placeholder="Name" className='input-control' />
												</Form.Item>
												<Form.Item label="name" name="admin_id" noStyle>
													<Input type="hidden" />
												</Form.Item>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group mb-3">
												<label htmlFor="" className="fs14 fw500 lh-1 mb-2"><b>Email Address</b></label>
												<Form.Item
													name="email"
													rules={[{ required: true, message: 'Please enter your email address!' }]}
												>
													<Input disabled={false} placeholder="Email" className='input-control' />
												</Form.Item>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group mb-3">
												<label htmlFor="" className="fs14 fw500 lh-1 mb-2"><b>Mobile Number</b></label>
												<Form.Item
													name="mobile"
													rules={[{ required: true, message: 'Please enter your mobile number!' }]}
												>
													<Input disabled={false} placeholder="Mobile Number" className='input-control' />
												</Form.Item>
											</div>
										</div>
									</div>
									<div className="profile_card_widget">
										<div className="row justify-content-center">
											<div className="col-lg-6">
												{/* <button type="submit" className="button button-2 w-100 fs18 fw600">Save</button> */}
												<Button htmlType='submit' className="button button-2 w-100 fs18 fw600">
													Save
												</Button>
											</div>
										</div>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		adminData: state.auth.auth
	};
};
export default connect(mapStateToProps)(AppProfile);
