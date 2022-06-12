import axios from "axios";

const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

//TODO вынести API в отдельные файлы

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
    getOneItem(id) {
        return (
            instance.get(`product/current/${id}`, {})
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
    deleteProduct(id) {
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

export const orderAPI = {
    orderCreat(basketData) {
        return (
            instance.post('order/orderCreate', {basketData: basketData})
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

export const ordersAPI = {
    getAllOrders(){
        return(
            instance.get('admin/orders',{})
                .then(function (response) {
                    return response
                })
                .catch(err =>{
                    if(err.response){
                        return err.response
                    }
                })
        )
    },
}
// const instanceImage = axios.create({
//     baseURL: 'http://localhost:8080/api/',
//     data: formData,
//     headers: {
//         'content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`
//     }
// })

export const productAPI = {
    createNewProduct(data){
        return(
            axios({
                method: "post",
                url: "http://localhost:8080/api/product/new",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response){
                return response
            })
                .catch(err=>{
                    if(err.response){
                        return err.response
                    }
                })
        )
    },
    modifyProduct(data, productId){
        return(
            axios({
                method: "patch",
                url: `http://localhost:8080/api/product/modify/${productId}`,
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response){
                return response
            })
                .catch(err=>{
                    if(err.response){
                        return err.response
                    }
                })
        )
    },
}

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


}

