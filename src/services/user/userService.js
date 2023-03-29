import Http from '../../Http'
import * as action from '../../store/actions'
// import ToastMe from '../../view/common/ToastMe';
const BaseUrl = process.env.REACT_APP_BASE_URL;

export function getUser() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/userList')
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getProfile() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/profile')
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function updateUserProfile(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/updateAdmin',data)
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function uploadUserProfile(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/uploadImage', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}