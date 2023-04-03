import Http from '../../Http'
const BaseUrl = process.env.REACT_APP_BASE_URL;

export function addSubscriptionPlan(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addSubscriptionPlan', data)
                .then(function (res) {
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

export function editSubscriptionPlan(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/editSubscriptionPlan', data)
                .then(function (res) {
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

export function getSubscription() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getSubscriptionPlan')
                .then(function (res) {
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

export function changeSubscriptionStatus(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/changeSubscriptionStatus/' + id)
                .then(function (res) {
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