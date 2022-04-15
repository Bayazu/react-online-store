import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {'content-type': 'application/json',}
});

export const itemsAPI = {
    getItems(){
        return(
            instance.get('product/listing', {})
                .then(function (response) {
                   return response
                })
                .catch(function (error) {
                    console.log(error);
                })
        )
    }
}

export const usersAPI = {
    createUser(data){
        return(
            instance.post('user/registration',{...data})
                .then(function (response) {
                    return response
                })
                .catch(function (error) {
                    console.log(error);
                })
        )
    },
    loginUser(data){
        return(
            instance.post('user/login',{...data})
                .then(function (response) {
                    return response
                })
                .catch(function (error) {
                    console.log(error);
                })
        )
    },


}

