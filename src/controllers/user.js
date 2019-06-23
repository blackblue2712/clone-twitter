
export const getUser = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
        }
    })
    .then( res => { 
        return res.json();
    })
    .catch( error => {
        console.log("ERROR FETCH USER" ,error);
    });
}

export const getUsers = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( error => {
        console.log("ERROR FETCH USERS", error);
    });
}

export const updateUser = (userId, token, userData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: userData
    })
    .then( res => {
        return res.json()
    })
    .catch( error => {
        console.log("ERROR UPDATE USER", error);
    });
}

export const addFollow = (userId, followId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( {userId, followId} )
    })
    .then( res => {
        return res.json();
    })
    .catch( error => {
        console.log("ERROR FOLLOW USER");
    })
}

export const unFollow = (userId, followId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( {userId, followId} )
    })
    .then( res => {
        return res.json();
    })
    .catch( error => {
        console.log("ERROR UNFOLLOW USER");
    })
}