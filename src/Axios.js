import axios from 'axios'
// import store from '../src/store';
// import * as actions from '../src/store/actions'
import Security from './Security'
// import ToastMe from '../components/view/common/ToastMe';

function AxiosMiddleware(method, url, data, options) {
    if (data.env !== 'test' && url.search("env=test") === -1) {
        data = (new Security()).encrypt(data);
    }
    switch (method) {
        case 'get':
            return axios.get(url, data, options);
        case 'post':
            return axios.post(url, data, options);
        case 'head':
            return axios.head(url, data, options);
        case 'patch':
            return axios.patch(url, data, options);
        case 'put':
            return axios.put(url, data, options);
        case 'delete':
            return axios.delete(url, { data: data, headers: options });
        default:
            console.log(method);
            break;
    }

}
// let token = document.head.querySelector('meta[name="csrf-token"]');
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

axios.interceptors.response.use(
    (response) => {
        if (response.data.mac !== undefined) {
            response.data = (new Security()).decrypt(response.data);
        }
        return response
    },
    (error) => {
        switch (error.response.status) {
            case 401:
                // store.dispatch(actions.authLogout())
                break;
            case 404:
                // ToastMe(error.response.data.message, 'danger');
                break;

            default:
                // console.log(error.response.status);
                break;
        }
        return Promise.reject(error);
    }
)

export function get(url, data = [], options = {}) {
    return AxiosMiddleware('get', url, data, options)
}
export function post(url, data = [], options = {}) {
    return AxiosMiddleware('post', url, data, options)
}
export function head(url, data = [], options = {}) {
    return AxiosMiddleware('head', url, data, options)
}
export function patch(url, data = [], options = {}) {
    return AxiosMiddleware('patch', url, data, options)
}
export function put(url, data = [], options = {}) {
    return AxiosMiddleware('put', url, data, options)
}
export function del(url, data = [], options = {}) {
    return AxiosMiddleware('delete', url, data, options)
}
export function setBearerToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export function setVerifyToken(token) {
    axios.defaults.headers.common['VerifyToken'] = `${token}`;
}

// improvements
export function callApi(method, url, data = [], options = {}) {
    return AxiosMiddleware(method, url, data, options)
}
