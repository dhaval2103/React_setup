import React, { Fragment, useState, useReducer, useEffect } from "react";
// import { Button, Dropdown, Modal, Tab, Nav, Form } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { Edit2 } from "iconsax-react";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";


import UserService from "../../../../services/user";
import PageTitle from "../../../layouts/PageTitle";
import ToastMe from "../../../pages/Common/ToastMe";
import dummy from "../../../../images/dummy.png";

const initialState = false;
const reducer = (state, action) => {
  switch (action.type) {
    case "sendMessage":
      return { ...state, sendMessage: !state.sendMessage };
    case "postModal":
      return { ...state, post: !state.post };
    case "linkModal":
      return { ...state, link: !state.link };
    case "cameraModal":
      return { ...state, camera: !state.camera };
    case "replyModal":
      return { ...state, reply: !state.reply };
    default:
      return state;
  }
};

const ChangePassword = (props) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const [userImg, setUserImg] = useState("");
  const [imageName, setImageName] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setnewPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilitynew = () => {
    setnewPassword(!newPassword);
  };
  const togglePasswordVisibilityconfirm = () => {
    setconfirmPassword(!confirmPassword);
  };

  const getProfile = () => {
    dispatch(UserService.getProfile())
      .then((res) => {
        setUser(res.data);
      })
  };
  const onFinish = (data) => {
    data["image"] = imageName;
    // setButtonLoading(true)
    dispatch(UserService.changepassword(data, props?.adminData))
      .then((res) => {
        ToastMe("Change passwode Successfully", "success");
        props.history.push("/dashboard");
      })
      .catch((errors) => {
        // setButtonLoading(false)
     return   ToastMe(errors?.errorData?.errors?.new_password, "success");
      });
  };
  const previewUserImageOnChange = (ev) => {
    let userImgSrc = URL.createObjectURL(ev.target.files[0]);
    let filesPath = ev.target.files[0];
    setUserImg(userImgSrc);
    const image = new FormData();
    image.append("image", filesPath);
    dispatch(UserService.uploadUserProfile(image))
      .then((res) => {
        if (res.data) {
          setImageName(res.data.imageWithName);
        }
        getProfile();
      })
      .catch((errors, statusCode) => {
        setUserImg("");
        ToastMe(errors.errorData, "error");
      });
  };
  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };

  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      username: user?.name,
      about: user?.about,
      email: user?.email,
      mobile: user?.mobile,
      admin_id: user?._id,
    });
    setImageName(user?.image);
  }, [user]);
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content">
                <div
                  className="cover-photo rounded"
                  style={{ height: "350px" }}
                ></div>
              </div>
              <div className="profile-info">

                <Form
                  name="basic"
                  form={form}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete="off"
                  className="w-75 m-auto"
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <label htmlFor="" className="fs14 fw500 lh-1 mb-2">
                          <b>Current Password</b>
                        </label>
                        <Form.Item
                          name="old_password"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your password!",
                            },
                          ]}
                        >
                          <Input.Password
                            placeholder="Cuurent Password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeOutlined />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                            className="input-control"
                            value={showPassword}
                            onChange={togglePasswordVisibility}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <label htmlFor="" className="fs14 fw500 lh-1 mb-2">
                          <b>New Password</b>
                        </label>
                        <Form.Item
                          name="new_password"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your New Password",
                            },
                            {
                              min: 6,
                              message: "Password Minimum Length 6",
                            },
                            {
                              max: 50,
                              message: "Password Maximum Length 50",
                            },
                            {
                              pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/,
                              message:
                                "Password must contain a capital letter, small letter, Number & a special.",
                            },
                          ]}
                        >
                          <Input.Password
                            placeholder="New password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeOutlined />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                            className="input-control"
                            value={newPassword}
                            onChange={togglePasswordVisibilitynew}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <label htmlFor="" className="fs14 fw500 lh-1 mb-2">
                          <b>Confirm Password</b>
                        </label>
                        <Form.Item
                          name="confirm_password"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your Confirm Password",
                            },
                            {
                              pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/,
                              message:
                                "Password must contain a capital letter, small letter, Number & a special .",
                            },
                            {
                              min: 6,
                              message: "Password Minimum Length 6",
                            },
                            {
                              max: 50,
                              message: "Password Maximum Length 50",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("new_password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  "The confirm password and new password fields must match."
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password
                            placeholder="Confirm password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeOutlined />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                            className="input-control"
                            value={confirmPassword}
                            onChange={togglePasswordVisibilityconfirm}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="profile_card_widget">
                    <div className="row justify-content-center">
                      <div className="col-lg-6">
                        {/* <button type="submit" className="button button-2 w-100 fs18 fw600">Save</button> */}
                        <Button
                          htmlType="submit"
                          className="button  suceess button-2 w-100 fs18 fw600"
                        >
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
    adminData: state.auth.auth,
  };
};
export default connect(mapStateToProps)(ChangePassword);
