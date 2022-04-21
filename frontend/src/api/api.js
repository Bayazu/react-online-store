import axios from "axios";

const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export const itemsAPI = {
    getItems() {
        return (
            instance.get('product/listing', {})
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
    deleteProduct(id){
        return (
            instance.delete(`product/delete/${id}`, {})
                .then(function (response) {
                    return response
                })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    }
}

export const usersAPI = {
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
    loginByToken(token) {
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
    deleteUserByAdmin(id){
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



}

