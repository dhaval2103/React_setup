import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
    baseURL: `https://react-course-b798e-default-rtdb.firebaseio.com/`,
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.auth.idToken;
    config.params = config.params || {};
    config.params['auth'] = token;

    // new Promise((resolve, reject) => {
    //     Http.callApi('get', BaseUrl + '/admin/refreshToken')
    //         .then(function (res) {
    //             console.log(res,"resssss");
    //             return resolve(res);
    //         })
    //         .catch(function (error) {
    //             const data = {
    //                 errorData: error.response.data,
    //             };
    //             return reject(data);
    //         })
    // })

    return config;
});

export default axiosInstance;
