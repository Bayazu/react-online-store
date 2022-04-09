import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

export const itemsAPI = {
    getItems(){
        return(
            instance.get('product/listing', {})
                .then(function (response) {
                   return response.data
                })
                .catch(function (error) {
                    console.log(error);
                })
        )
    }

}