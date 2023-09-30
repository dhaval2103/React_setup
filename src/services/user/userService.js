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

export function getAllUser(value) {
    let search = value || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/allUserList?search=' + search)
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

export function getRequest(value) {
    let search = value || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/requestList')
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

export function getSubUserList(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            const id = data.state.id
            Http.callApi('get',  `${BaseUrl}/admin/subUserList?id=${id}`, [])
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

export function getCarrierSubUserList(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            const id = data.state.id
            Http.callApi('get',  `${BaseUrl}/admin/carriersubUserList?id=${id}`, [])
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

export function getCarrierSubUserLinkList(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            const id = data.state.id
            Http.callApi('get',  `${BaseUrl}/admin/carrierfmcsasList?id=${id}`, [])
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

export function getSubUserFmcsasList(data) {
    data.env = 'test'
    const queryParam = `?dotNumber=${data?.state?.dotNumber}&env=${data?.env}`;
    return dispatch => (
     new Promise((resolve, reject) => {
        Http.callApi('get', BaseUrl + '/admin/carrierfmcsasList' + queryParam,[])
            .then(function (res) {
                return  resolve(res);
            })
            .catch(function (error) {
                const data = {
                    errorData: error.response.data.message,
                    // statusCode: error.response.status,
                };
                return reject(data);
            });
    })
    )
}

export function getLinkList(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            const id = data.state.id
            Http.callApi('get',  `${BaseUrl}/admin/linkList?id=${id}`, [])
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

export function getfmcsas(value) {
    let search = value || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/fmcsasList')
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
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
                    return resolve(res);
                })
                .catch(function (error) {
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

// userService.js
export function carrierDetails(data) {
    data.env = 'test'
    const queryParam = `?userId=${data?.id}&env=${data.env}`;
    return new Promise((resolve, reject) => {
        Http.callApi('get', BaseUrl + '/admin/carrierDetails' + queryParam,[])
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                const data = {
                    errorData: error.response.data.message,
                    // statusCode: error.response.status,
                };
                reject(data);
            });
    });
}

export function googleimage(data) {
    data.env = 'test'
    const queryParam = `?id=${data.id}&env=${data.env}`;
    return new Promise((resolve, reject) => {
        Http.callApi('get', BaseUrl + '/admin/physicalAddressPhotos' + queryParam,[])
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                const data = {
                    errorData: error.response.data.message,
                    // statusCode: error.response.status,
                };
                reject(data);
            });
    });
}

// userService.js
export function changepassword(data, adminData) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/changePassword', data)
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

// 2FA
export function enableGoogle2FA(email) {
    return Http.callApi('post', BaseUrl + '/admin/generateGoogle2fa', { email });
}
  
export function disableGoogle2FA() {
    return Http.callApi('post', BaseUrl + '/admin/disableGoogle2fa');
}
  
export function verifyGoogle2FA(values) {
    return Http.callApi('post', BaseUrl + '/admin/google2faCheck', values );
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
    // data.env = 'test'
    data.type = 1
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendAllUserNotification', data)
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

export function sendUserNotification(data) {
    data.type = 2
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendNotificationToUser', data)
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

export function getNotificationlist(type) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getNotification?type=' + type)
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

