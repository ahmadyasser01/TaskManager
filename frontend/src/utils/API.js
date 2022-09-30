import axios from 'axios';
let  options = {
    withCredentials: true,
    crossDomain: true,
    headers:{'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
}
class API {
    // axiosInstance = axios.create({
    //     baseURL: 'https://ay01-taskmanager.herokuapp.com/api',
    // })

    static signup = async function (data){
        try {
            const res = await axios.post('https://ay01-taskmanager.herokuapp.com/api/users/signup',{...data})
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static login = async function(data){
        try {
            console.log(options);
            const {email,password} = data;
            const res = await axios.post('https://ay01-taskmanager.herokuapp.com/api/users/login',{email,password}
            ,options);
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static verifyAccount = async function(token){
        try {
            const res = await axios.get(`https://ay01-taskmanager.herokuapp.com/api/users/verify/${token}`)
            return res.data;
        } catch (error) {
           return error.response.data
        }
    }
    static forgotPassword = async function(email){
        try {
            const res = await axios.post('https://ay01-taskmanager.herokuapp.com/api/users/forgotPassword',{email});
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static logout = async function(){
        try {
            const res = await axios.post('https://ay01-taskmanager.herokuapp.com/api/users/logout',{},options);
            return res.data
        } catch (error) {
            return error.response.data;
        }
    }
    static resetPassword = async function(password,token){
        try {
            const res = await axios.patch(`https://ay01-taskmanager.herokuapp.com/api/users/resetPassword/${token}`,{password})
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static getUser = async function(){
        try {
            const res = await axios.get(`https://ay01-taskmanager.herokuapp.com/api/users/me`,options);
            return res.data;
        } catch (error) {
            return error.response.data;
            
        }
    }
    static createTask = async function (data){
        try {
            console.log("req");
            const {title,description,priority,status} = data;
            const res = await axios.post(`https://ay01-taskmanager.herokuapp.com/api/tasks`,{title,description,priority,status},options)
            return res.data
            
        } catch (error) {
            return error;
        }

    }
    static getAllTasks = async function (){
        try {
            const res = await axios.get(`https://ay01-taskmanager.herokuapp.com/api/tasks`,options);
            return res.data;
        } catch (error) {
            return error.response.data;
        }

        
    }
    static updateTask = async function (taskId,updateObj){
        try {
            const res = await axios.patch(`https://ay01-taskmanager.herokuapp.com/api/tasks/${taskId}`,updateObj,options);
            return res.data;
        } catch (error) {
           return error.response.data;
            
        }


        
    }
    static deleteTask = async function (id){
        try {
            const res = await axios.delete(`https://ay01-taskmanager.herokuapp.com/api/tasks/${id}`,options);
            return res.data;
        } catch (error) {
           return error.response.data;
             
    }
}
    static getTask = async function (id){
        try {
            const res = await axios.get(`https://ay01-taskmanager.herokuapp.com/api/tasks/${id}`,options);
            return res.data;
        } catch (error) {
           return error.response.data;
            
        }
        
        
    }
}

export default API;