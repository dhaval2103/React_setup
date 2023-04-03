import Http from '../../Http'
import * as action from '../../store/actions'
import { loginConfirmedAction } from '../../store/actions/AuthActions';
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
export function updateUserProfile(data, adminData) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/updateAdmin', data)
                .then(function (res) {
                    adminData.displayName = data.username
                    dispatch(loginConfirmedAction(adminData));
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
export function getCms() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/listCMS')
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
export function addCms(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/cms', data)
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
export function getMaintenance(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listRequest')
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
export function approveRequest(data) {
    let data_ = {
        mId: data._id,
        env: 'test',
        verifyStatus: data.verifyStatus
    }
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/approveReject', data_)
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
export function updateCms(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/editCms', data)
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
export function deleteCms(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/common/deleteCms/' + data.id)
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
export function sendNotification(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendNotification', data)
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
export function getNotificationlist() {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getNotification')
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