import Http from '../../Http'
import * as action from '../../store/actions'
import { loginConfirmedAction } from '../../store/actions/AuthActions';
// import ToastMe from '../../view/common/ToastMe';
const BaseUrl = process.env.REACT_APP_BASE_URL;

export function getUser(value) {
    let search = value || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/userList?search=' + search)
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

export function getBroker(value) {
    let search = value || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/brokerList?search=' + search)
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

export function changeUserStatus(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/changeUserStatus', data, {env:'test'})
                .then(function (res) {
                    console.log('resss',res)
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log('error',error);
                    // const data = {
                    //     // errorData: error.response.data.message,
                    //     // statusCode: error.response.status,
                    // };
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
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('patch', BaseUrl + '/admin/updateProfile', data)
                .then(function (res) {
                    adminData.name = data.name;
                    adminData.email = data.email;
                    adminData.mobile = data.mobile;
                    // adminData.profileImage = data.image
                    localStorage.setItem('adminDetails', JSON.stringify(adminData));
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
export function changepassword(data, adminData) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/changePassword', data)
                .then(function (res) {
                    console.log(res);
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
export function uploadProfile(data) {
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
export function uploadCommonImage(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/commonuploadImage', data)
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
    let search = data || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listRequest?search=' + search)
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
        technicianStatus: data?.technicianStatus,
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
export function getFaq(data) {
    let search = data || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/allFaq?search=' + search)
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
export function getTechnicalGuides(data) {
    // data.env = 'test'
    let search = data || ''
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/listTechnicalGuides?search=' + search)
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
export function getTechnician(data) {
    // data.env = 'test'
    let search = data || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listTechnician?search=' + search)
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
                    const data = {
                        errors: error.response.data.errors,
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
export function listSubscribeUser(data) {
    // data.env = 'test'
    let search = data || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listSubscribeUser?search='+search)
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
export function addSubscribeUser(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addSubscribeUser', data)
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
export function updateUser(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/userProfileUpdate', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errors: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function addUser(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/userRegister', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error);
                    const data = {
                        errors: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function getPaymentHistory() {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/PaymentHistory')
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

