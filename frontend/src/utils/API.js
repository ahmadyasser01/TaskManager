import axios from 'axios';
let  options = {
    withCredentials: true,
    crossDomain: true,
    headers:{'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
}
class API {
    // axiosInstance = axios.create({
    //     baseURL: 'http://localhost:5000/api',
    // })

    static signup = async function (data){
        try {
            const res = await axios.post('http://localhost:5000/api/users/signup',{...data})
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static login = async function(data){
        try {
            console.log(options);
            const {email,password} = data;
            const res = await axios.post('http://localhost:5000/api/users/login',{email,password}
            ,options);
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static verifyAccount = async function(token){
        try {
            const res = await axios.get(`http://localhost:5000/api/verify/${token}`)
            return res.data;
        } catch (error) {
           return error.response.data
        }
    }
    static forgotPassword = async function(email){
        try {
            const res = await axios.post('http://localhost:5000/api/users/forgotPassword',{email});
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static logout = async function(){
        try {
            const res = await axios.post('http://localhost:5000/api/users/logout',{});
            return res.data
        } catch (error) {
            return error.response.data;
        }
    }
    static resetPassword = async function(password,token){
        try {
            const res = await axios.patch(`http://localhost:5000/api/users/resetPassword/${token}`,{password})
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static getUser = async function(){
        try {
            const res = await axios.get(`http://localhost:5000/api/users/me`,options);
            return res.data;
        } catch (error) {
            return error.response.data;
            
        }
    }
    static createTask = async function (data){
        try {
            const {title,description,priority,status} = data;
            const res = await axios.post(`http://localhost:5000/tasks`,{title,description,priority,status})
            return res.data
            
        } catch (error) {
            return error.response.message;
        }

    }
    static getAllTasks = async function (){
        try {
            const res = await axios.get(`http://localhost:5000/api/tasks`,options);
            return res.data;
        } catch (error) {
            return error.response.data;
            
        }

        
    }
    static updateTask = function (){
        
    }
    static deleteTask = function (){
        
    }
    static getTask = function (){
        
    }
}

export default API;