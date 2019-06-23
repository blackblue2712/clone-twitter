
export const getPost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/edit/${postId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
    })
    .then(res => {
        return res.json();
    })
    .catch(error => console.log("GET POST", error));
}

export const getPosts = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
    })
    .then( res => {
        return res.json()
    })
    .catch( error => console.log(error));
}

export const createPost = (postData, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${userId}`, {
        method: "POST",
        headers: {
            "Accept": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: postData
    })
    .then( res => res.json())
    .catch( error => console.log("CREATE POST" ,error))
}

export const getPostByUser = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${userId}`, {
        methid: "GET",
        headers: {
            "Accept": "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => res.json())
    .catch( error => console.log("GET POST BY USER ID" ,error))
}

export const deletePost = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
            "Accept": "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => res.json())
    .catch( error => console.log("DELETE POST" ,error))
}

export const updatePost = (postData, postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/edit/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: postData
    })
    .then( res => res.json())
    .catch( error => console.log("ERROR EDIT POST", error));
}

export const likePost = (postId, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({postId, userId})
    });
}

export const unlikePost = (postId, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({postId, userId})
    });
}

export const comment = (postId, userId, textComment, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( {postId, userId, textComment} )
    })
    .then( res => res.json() )
    .catch( error => console.log(error));
}

export const uncomment = (postId, userId, commentId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( {postId, userId, commentId} )
    })
    .then( res => res.json() )
    .catch( error => console.log(error));
}