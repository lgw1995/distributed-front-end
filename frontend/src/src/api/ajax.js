import axios from 'axios'
import memoryUtils from "../utils/memoryUtils";
import {message} from "antd";

/*
* ajax
* */

export default function ajax(url,data={},type='GET'){

    const axiosInstance =  axios.create({
        timeout: 8000,
        headers: {
            'Authorization': memoryUtils.userToken,
            'Content-Type': 'application/json'
        }
    });
    return new Promise(function (resolve,reject){
        let promise
        if(type === 'GET'){
            promise = axiosInstance.get(url, {params:data})//query parameter
        }
        else if(type == 'POST')
        {
            console.log("POST back-end : "+ url);
            promise = axiosInstance.post(url,data)
        }
        else if(type == 'DELETE')
        {
            console.log("DELETE back-end : "+ url);
            promise = axiosInstance.delete(url,data)
        }
        else
        {
            console.log("PUT back-end : "+ url);
            promise = axiosInstance.put(url,data)
        }
        promise.then(response =>{
            // if success
            resolve(response)
        }).catch(error => {
            message.error('axios error:'+error.message)
        })
    })
}

