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

export const productsAPI = {
    createNewProduct(data) {
        return (
            axios({
                method: "post",
                url: backEndUrlForReq + `product/new`,
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            }).then(function (response) {
                return response
            })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
    modifyProduct(data, productId) {
        return (
            axios({
                method: "patch",
                url: backEndUrlForReq + `product/modify/${productId}`,
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            }).then(function (response) {
                return response
            })
                .catch(err => {
                    if (err.response) {
                        return err.response
                    }
                })
        )
    },
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