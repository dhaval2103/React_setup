import Http from '../../Http'
import * as action from '../../store/actions'
import { loginConfirmedAction } from '../../store/actions/AuthActions';
// import ToastMe from '../../view/common/ToastMe';
const BaseUrl = process.env.REACT_APP_BASE_URL;

export function getUser(value) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/userList?search=' + value)
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
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
                        // statusCode: error.response.status,
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
                    adminData.displayName = data.username;
                    adminData.email = data.email;
                    adminData.profileImage = data.image
                    localStorage.setItem('userDetails', JSON.stringify(adminData));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
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
                        // statusCode: error.response.status,
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
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function addCms(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/cms', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
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
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
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
        verifyStatus: data?.verifyStatus,
        technicianId: data?.technicianId
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
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function updateCms(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/editCms', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function deleteCms(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/common/deleteCms/' + data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function sendNotification(data) {
    data.env = 'test'
    data.type = 1
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendAllUserNotification', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function sendUserNotification(data) {
    data.env = 'test'
    data.type = 2
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendNotificationToUser', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getNotificationlist(type) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getNotification?type=' + type)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function addFaq(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/createFaq', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getFaq() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/allFaq')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getGroup() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/groupList')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function uploadMedia(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/upload/media', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function addTechnicalguides(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/createTechnicalGuides', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getTechnicalGuides() {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/listTechnicalGuides')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function editTechnicalguides(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/editTechnicalguides', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function createGroup(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/createGroup', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function editGroup(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/editGroup', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getTechnician() {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listTechnician')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function updateTechician(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/updateTechnician', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function addTechician(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addTechnician', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errors: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function addRequest(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendMaintenanceRequest', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function listRequestbyId(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listRequestbyId/' + data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

