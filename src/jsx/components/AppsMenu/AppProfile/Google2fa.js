import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Form, Input } from 'antd';
import ToastMe from "../../../pages/Common/ToastMe";
import { enableGoogle2FA, disableGoogle2FA, verifyGoogle2FA } from "../../../../../src/services/user/userService";
import UserService from "../../../../services/user";

const Google2fa = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [secret, setSecret] = useState('');
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');
  const [googleStatus, setGoogleStatus] = useState('');
  
  const getProfile = () => {
    if (props.adminData) {
      setUser(props.adminData); // Set the user state only when adminData is available
      setIs2FAEnabled(props.adminData?.google2fa_status === 1);
      setSecret(props.adminData?.google2fa_secret || '');
    }
  };

  const getGoogleStatus = () => {
		dispatch(UserService.getProfile())
			.then((res) => {
				setGoogleStatus(res.data);
			})
			.catch((errors) => {
				console.log({ errors })
			})
	}

  useEffect(() => {
    getProfile();
  }, [props.adminData]);

  useEffect(() => {
    form.setFieldsValue({
      username: user?.name,
      about: user?.about,
      email: user?.email,
      mobile: user?.mobile,
      admin_id: user?._id
    });
    setIs2FAEnabled(user?.google2fa_status === 1);
    setSecret(user?.google2fa_secret || '');
    getGoogleStatus();
  }, [user]);

  const enable2FA = () => {
    if (googleStatus.google2fa_status == 1) {
      ToastMe("Your 2FA is already enabled", 'info');
    } else {
      enableGoogle2FA(user.email)
        .then(response => {
          setIs2FAEnabled(true);
          setSecret(response.data.secret_key);
          setQRCodeDataURL(response.data.qrCodeDataURL);
          ToastMe("Google 2FA Enabled", 'success');
        })
        .catch(error => {
          ToastMe("Failed to Enable Google 2FA", 'error');
        });
    }
  };

  const disable2FA = () => {
    disableGoogle2FA()
      .then(response => {
        setIs2FAEnabled(false);
        setSecret('');
        ToastMe("Google 2FA Disabled", 'success');
      })
      .catch(error => {
        ToastMe("Failed to Disable Google 2FA", 'error');
      });
  };

  const verify2FA = (values) => {
    verifyGoogle2FA(values)
      .then(response => {
        ToastMe("Google 2FA Code Verified", 'success');
        props.history.push('/dashboard');
      })
      .catch(error => {
        ToastMe("Invalid Google 2FA Code", 'error');
      });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content">
			  	      {qrCodeDataURL ? <img src={qrCodeDataURL} alt="Google 2FA QR Code" /> : <img src={qrCodeDataURL} alt="Google 2FA QR Code" hidden/>}
              </div>
              <div className="profile-info">
                {/* Your existing code for profile info */}
                <div className="profile_card_widget">
                  {is2FAEnabled ? (
                    <Button onClick={disable2FA} className="button button-danger button-2 w-100 fs18 fw600" hidden>
                      Disable Google 2FA
                    </Button>
                  ) : (
                    <Button onClick={enable2FA} className="button button-success button-2 w-100 fs18 fw600">
                      Enable Google 2FA
                    </Button>
                  )}
                </div>
				        <Form for={form} onFinish={verify2FA}>
                  {is2FAEnabled && (
                    <div className="form-group mb-3">
                      <label htmlFor="" className="fs14 fw500 lh-1 mb-2"><b>Google 2FA Code</b></label>
                      <Form.Item
                        name="google2faCode"
                        rules={[{ required: true, message: 'Please enter your Google 2FA code' }]}
                      >
                        <Input type="text" placeholder="Google 2FA Code" className='input-control' />
                      </Form.Item>
                      <Button type="primary" htmlType="submit" className="button  button-success button-2 w-100 fs18 fw600">
                        Verify Google 2FA
                      </Button>
                    </div>
                  )}
				        </Form>
                {/* Your existing code for other profile info */}
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
    adminData: state.auth.auth // Adjust this according to your actual Redux store setup
  };
};

export default connect(mapStateToProps)(Google2fa);
