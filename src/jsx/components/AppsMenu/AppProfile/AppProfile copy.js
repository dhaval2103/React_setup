import React, { Fragment, useState, useReducer, useEffect } from "react";
// import { Button, Dropdown, Modal, Tab, Nav, Form } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Button, Form, Input } from 'antd';
import { Edit2 } from 'iconsax-react';
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";


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
	// const [state, dispatch] = useReducer(reducer, initialState);
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
		data['image'] = imageName;
		// setButtonLoading(true)
		dispatch(UserService.updateUserProfile(data, props?.adminData))
			.then((res) => {
				// setButtonLoading(false)
				ToastMe("Profile Updated Successfully", 'success');
				setTimeout(() => {
					window.location.reload();
				}, 500)
			})
			.catch((errors) => {
				// setButtonLoading(false)
				console.log({ errors })
			})
	};
	const previewUserImageOnChange = (ev) => {
		let userImgSrc = URL.createObjectURL(ev.target.files[0]);
		let filesPath = ev.target.files[0];
		setUserImg(userImgSrc);
		const image = new FormData();
		image.append('image', filesPath);
		dispatch(UserService.uploadUserProfile(image))
			.then((res) => {
				if (res.data) {
					setImageName(res.data.imageWithName)
				}
				getProfile();
			})
			.catch((errors, statusCode) => {
				setUserImg('')
				ToastMe(errors.errorData, "error");
			});
	}
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
			username: user?.name,
			about: user?.about,
			email: user?.email,
			mobile: user?.mobile,
			admin_id: user?._id
		});
		setImageName(user?.image)
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
								<div className="profile-photo" 
									// style={{ position: 'relative', width: '400px', height: '200px' ,margin: '0 auto' }}
								>
									<div className="img_wrapper">
										<img
											src={user?.image != '' ? user?.image : dummy}
											className="img-fluid rounded-circle custome_imag"
											// style={{ width: '200%',height: '40%',objectFit: 'cover',borderRadius: '50%'}}
											alt="profile"
										/>
									</div>
									<label htmlFor='file-input-control' className="edit_btn" 
									style={{
											position: 'absolute', marginTop:'-20px', right: '0', display: 'flex',
											justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', backgroundColor: '#fff' ,
											borderRadius: '50%', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', cursor: 'pointer', zIndex: '1'
										}}>
										<a role={"button"} style={{display: 'flex',justifyContent: 'center',alignItems: 'center',width: '100%',height: '100%'}}>
											<Edit2 size="20" color="#333230" />
											<div className="col d-none" style={{position: 'absolute',top: '0',left: '0',width: '100%',height: '100%',opacity: '0'}}>
												<Input type="file" name='image' className="file-input-control"
												style={{
													position: 'absolute',top: '0',left: '0',width: '100%',height: '100%',cursor: 'pointer',opacity: '0',zIndex: '-1'
												}} 
												id='file-input-control' onChange={previewUserImageOnChange} accept="image/*" />
											</div>
										</a>
									</label>
								</div>

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
													name="username"
													rules={[{ required: true, message: 'Please enter your name!' }]}
												>
													<Input placeholder="Name" className='input-control' />
												</Form.Item>
												<Form.Item label="Username" name="admin_id" noStyle>
													<Input type="hidden" />
												</Form.Item>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group mb-3">
												<label htmlFor="" className="fs14 fw500 lh-1 mb-2"><b>About</b></label>
												<Form.Item
													name="about"
													rules={[{ required: true, message: 'Please enter your about!' }]}
												>
													<Input placeholder="About" className='input-control' />
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
													<Input disabled={true} placeholder="Email" className='input-control' />
												</Form.Item>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group mb-3">
												<label htmlFor="" className="fs14 fw500 lh-1 mb-2"><b>Mobile Number</b></label>
												<Form.Item
													name="mobile"
													rules={[{ required: true, message: 'Please enter your email address!' }]}
												>
													<Input disabled={true} placeholder="Mobile Number" className='input-control' />
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

			{/* send Modal */}
			{/* <Modal className="modal fade" show={state.sendMessage} onHide={()=>dispatch({type:'sendMessage'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Send Message</h5>
					<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'sendMessage'})}>
						
					</Button>
				</div>
				<div className="modal-body">
					<form className="comment-form" onSubmit={(e) => { e.preventDefault(); dispatch({type:'sendMessage'}); }}>
						<div className="row">
							<div className="col-lg-6">
								<div className="form-group mb-3">
									<label htmlFor="author" className="text-black font-w600">  Name <span className="required">*</span> </label>
									<input type="text" className="form-control" defaultValue="Author" name="Author" placeholder="Author" />
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-3">
									<label htmlFor="email" className="text-black font-w600"> Email <span className="required">*</span></label>
									<input type="text" className="form-control" defaultValue="Email" placeholder="Email" name="Email"/>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="form-group mb-3">
									<label htmlFor="comment" className="text-black font-w600">Comment</label>
									<textarea rows={8} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="form-group mb-3">
									<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Modal> */}
			{/* Post Modal */}
			{/* <Modal show={state.post} className="modal fade" id="postModal" onHide={() => dispatch({type:'postModal'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Post</h5>
					<Button variant=""  type="button" className="close" data-dismiss="modal" onClick={() => dispatch({type:'postModal'})} >
						<span>×</span>
					</Button>
					
				</div>
				<div className="modal-body">
					<textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control mb-2 bg-transparent" placeholder="Please type what you want...." defaultValue={""}/>
					<Link className="btn btn-primary btn-rounded mt-1" to="/app-profile">Post</Link>
				</div>
			</div>
		</Modal> */}
			{/* Link Modal */}
			{/* <Modal show={state.link}  className="modal fade post-input" id="linkModal" onHide={() => dispatch({type:'linkModal'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Social Links</h5>
					<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'linkModal'})}>
					</button>
				</div>
				<div className="modal-body">
					<Link className="btn-social me-1 facebook" to="/app-profile"><i className="fab fa-facebook-f" /></Link>
					<Link className="btn-social me-1 google-plus" to="/app-profile"> <i className="fab fa-google-plus" /></Link>
					<Link className="btn-social me-1 linkedin" to="/app-profile"><i className="fab fa-linkedin" /></Link>
					<Link className="btn-social me-1 instagram" to="/app-profile"> <i className="fab fa-instagram" /></Link>
					<Link className="btn-social me-1 twitter" to="/app-profile"><i className="fab fa-twitter" /></Link>
					<Link className="btn-social me-1 youtube" to="/app-profile"><i className="fab fa-youtube" /></Link>
					<Link className="btn-social whatsapp" to="/app-profile"><i className="fab fa-whatsapp" /></Link>
				</div>
			</div>
		</Modal> */}
			{/* Camera Modal */}
			{/* <Modal show={state.camera}  className="modal fade" id="cameraModal" onHide={() => dispatch({type:'cameraModal'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Upload images</h5>
					<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'cameraModal'})}>
					</button>
				</div>
				<div className="modal-body">
					<div className="input-group mb-3">
							<span className="input-group-text">Upload</span>
						<div className="form-file">
							<input type="file" className="form-file-input"/>
						</div>
					</div>
				</div>
			</div>
		</Modal> */}
			{/* Reply Modal */}
			{/* <Modal   show={state.reply}  className="modal fade" id="replyModal" onHide={()=>dispatch({type:'replyModal'})}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Post Reply</h5>
					<button type="button" className="btn-close"  onClick={() => dispatch({type:'replyModal'})}></button>
				</div>
				<div className="modal-body">
					<form>
						<textarea className="form-control" rows="4" >Message</textarea>
						<Form.Control as="textarea" rows="4"  placeholder="Message"/>
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-danger light"  onClick={() => dispatch({type:'replyModal'})}>Close</button>
					<button type="button" className="btn btn-primary">Reply</button>
				</div>
			</div>
		</Modal> */}

		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		adminData: state.auth.auth
	};
};
export default connect(mapStateToProps)(AppProfile);
