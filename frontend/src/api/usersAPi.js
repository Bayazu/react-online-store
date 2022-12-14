import axios from "axios";
import {backEndUrlForReq} from "./constAPI";

const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: backEndUrlForReq,
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export const usersAPI = {
    modifyUserById(userData, id) {
        return (
            instance.patch(`admin/userModify/${id}`, {...userData})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    getUserById(id) {
        return (
            instance.get(`admin/userId/${id}`,)
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    getUserOrdersByToken() {
        return (
            instance.get(`user/userOrders`,)
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    createUser(data) {
        return (
            instance.post('user/registration', {...data})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    modifyUserByToken(data) {
        return (
            instance.patch(`user/modify`, {...data})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    modifyUser(data) {
        return (
            instance.patch(`admin/userModify/${data._id}`, {...data})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    loginUser(data) {
        return (
            instance.post('user/login', {username: data.username, password: data.password, token: data.token})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    loginAdmin(data) {
        return (
            instance.post('admin/login', {username: data.username, password: data.password, token: data.token})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    getUserDataByToken() {
        return (
            instance.get('user/profile',)
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },

    getAllUsers() {
        return (
            instance.get('admin/users/', {})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    deleteUserByAdmin(id) {
        return (
            instance.delete(`admin/delete/${id}`, {})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    getUsersByWeek() {
        return (
            instance.get(`admin/usersWeek/`, {})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
}