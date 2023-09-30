import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';

// image
import logo from "../../icons/logo.png";
import loginbg from "../../images/bg-login.jpg";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a Email")
    // .matches(/^[a-zA-Z0-9.@]+$/, "Special characters are not allowed")
    .email("email is not validate"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please enter a password"),
});

function Login(props) {
  const [email, setEmail] = useState('');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    loginSchema.validate({ email, password }, { abortEarly: false })
    .then(() => {
      // Validation successful, proceed with login action
      dispatch(loadingToggleAction(true));
      dispatch(loginAction(email, password, props.history));
    })
    .catch(validationErrors => {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    });
  }

  return (
    <div className="login-main-page" style={{ backgroundImage: "url(" + loginbg + ")" }}>
      <div className="login-wrapper">
        <div className="login-aside-left" >
          <Link to={"#"} className="login-logo">
            <img src={logo} alt="" width="210px" />
          </Link>
          <div className="login-description">
            <h2 className="main-title mb-2">Welcome To React</h2>
            <p className="">React Js</p>
            <ul className="social-icons mt-4">
            </ul>
            <div className="mt-5 bottom-privacy">
            </div>
          </div>
        </div>
        <div className="login-aside-right">
          <div className="row m-0 justify-content-center h-100 align-items-center">
            <div className="p-5">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form-1">
                      <div className="mb-4">
                        <h3 className="dz-title mb-1">Sign in</h3>
                        <p className="">Sign in by entering information below</p>
                      </div>
                      {props.errorMessage && (
                        <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={onLogin}>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong>Email</strong>
                          </label>
                          <input type="email" className="form-control"
                            value={email}
                            validationSchema={loginSchema}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Type Your Email Address"
                          />
                          {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                          <label className="mb-2 "><strong>Password</strong></label>
                            <div className="input-group" style={{borderBottom:"2px solid #000"}}>
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control border-0"
                                validationSchema={loginSchema}
                                value={password}
                                placeholder="Type Your Password"
                                onChange={(e) =>
                                  setPassword(e.target.value)
                                }
                              />
                              <div className="form-group text-center mb-0">
                                <button
                                  className="btn btn-link"
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                              </div>
                          </div>
                          {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
