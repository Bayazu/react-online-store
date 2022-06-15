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

export const chartsAPI = {
    getOrdersChartForYear() {
        return (
            instance.get(`admin/ChartOrdersMonthsYear`,)
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