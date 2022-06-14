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

export const ordersAPI = {
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
    deleteOrder(id) {
        return (
            instance.get(`admin/orderDelete/${id}` )
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
    changeStatusOrder(id,status){
        return (
            instance.patch(`admin/orderStatus/${id}`,{status} )
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
    getOrdersSumForMonth(){
        return (
            instance.get(`admin/summMonth`,)
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
    getOrdersForMonth(){
        return (
            instance.get(`admin/ordersMonth`,)
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
    getOrderById(id){
        return(
            instance.get(`order/orderById/${id}`)
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
    getUserOrderById(id){
        return(
            instance.get(`admin/userOrders/${id}`)
                .then(function (response) {
                    return response
                })
                .catch(err =>{
                    if(err.response){
                        return err.response
                    }
                })
        )
    }
}