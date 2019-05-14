import { types } from 'util';

require('dotenv').config();

export const isAuthenticated = () => {
    if(typeof window == undefined) return false;
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false
    }
}

export const authenticate = (jwt, callback) => {
    if(typeof window == undefined) return false;

    localStorage.setItem("jwt", JSON.stringify(jwt));
    callback();
}

export const signup = async (userInfo) => {
    console.log(process.env)
    return await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( error => {
        console.log(error)
    })
}

export const signin = async (userInfo) => {
    console.log(userInfo);
    return await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( error => console.log(error));
}

export const signout = async (callback) => {
    callback();
    return await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( () => {
        localStorage.removeItem("jwt");
    })
    .catch( (error) => console.log(error));

    
}