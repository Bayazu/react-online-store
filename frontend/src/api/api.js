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
                .catch(err=>{
                    if(err.response){
                        return err.response
                    }
                })
        )
    },
    loginUser(data){
        return(
            instance.post('user/login',{email: data.email, password: data.password, token: data.token})
                .then(function (response) {
                    return response
                })
                .catch(err=>{
                    if(err.response){
                       return err.response
                    }
                })
        )
    },
    getAllUsers(){
        return(
            instance.get('admin/users/',{})
                .then(function (response) {
                    return response
                })
                .catch(err=>{
                    if(err.response){
                        return err.response
                    }
                })
        )
    }

}

