import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';
import Http from '../Http';
const BaseUrl = process.env.REACT_APP_BASE_URL;

export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
}

export function login(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `${BaseUrl}/user/login`,
        JSON.stringify(postData), {
            headers: { "Content-Type": "application/json", "env": "test" },
            withCredentials: true,
          },
        // `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        // postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
            swal("Oops", "Email not found", "error", { button: "Try Again!", });
            break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error", { button: "Try Again!", });
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    localStorage.setItem('adminDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
    setTimeout(() => {
        if (timer) {
            dispatch(logout(history));
        }
    }, timer);
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('adminDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout(history));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    Http.setBearerToken(tokenDetails.accessToken);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logout(history));
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, history);
}
