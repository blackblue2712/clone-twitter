import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getUser, addFollow, unFollow } from '../controllers/user';
import { getPostByUser } from '../controllers/post';
import { isAuthenticated } from '../controllers/auth';
import CreatePost from '../post/CreatePost';
import "./custom.css";
import DropDownEditPost from '../post/DropDownEditPost';
import ReactPost from '../post/ReactPost';
const moment = require("moment");

class Profile extends Component {
    constructor () {
        super();

        this.state = {
            username: '',
            email: '',
            photo: '',
            isShow: '',
            posts: [],
            isFollowed: false,
            followingArray: [],
            followersArray: [],
            redirectToMessenger: false
        };

        this.getUser = this.getUser.bind(this);
        this.showModelCreatePost = this.showModelCreatePost.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.CreatePost = this.CreatePost.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.redirectToMessenger = this.redirectToMessenger.bind(this);
    }

    showModelCreatePost() {
        this.setState( {isShow: "d-block"} );
    }

    getUser(userId) {
        getUser(userId)
        .then(data => {
            console.log(data)
            if(data.error) console.log(data.error);
            else {
                const {username, email, photo} = data;
                const isFollowed = data.followers.filter(flw => {
                    return flw._id === isAuthenticated().user._id;
                }).length;
                console.log(isFollowed)
                this.setState({
                    username,
                    email,
                    photo,
                    isFollowed: isFollowed > 0 ? true : false,
                    followersArray: data.followers,
                    followingArray: data.following
                });
            }
        })
    }

    getPosts(userId) {
        getPostByUser(userId)
        .then( data => {
            if(data.error) {
                this.setState( {error: data.error} )
            } else {
                this.setState( {posts: data} )
            }
        })
    }

    componentDidMount () {
        const { userId } = this.props.match.params;
        this.getUser(userId);
        this.getPosts(userId);
    }

    CreatePost() {

    }

    follow() {
        let userId = isAuthenticated().user._id;
        let token = isAuthenticated().token;
        let followId = this.props.match.params.userId;
        addFollow(userId, followId, token)
        .then( data => {
            this.setState({
                isFollowed: true
            })
        })
    }
    unfollow() {
        let userId = isAuthenticated().user._id;
        let token = isAuthenticated().token;
        let followId = this.props.match.params.userId;
        unFollow(userId, followId, token)
        .then( data => {
            this.setState({
                isFollowed: false
            })
        })
    }

    redirectToMessenger() {
        this.setState({
            redirectToMessenger: true
        });
    }

    render() {
        const { username, email, photo, isShow, posts, isFollowed, followersArray, followingArray, redirectToMessenger } = this.state;
        const { userId } = this.props.match.params;
        const userLogged = isAuthenticated().user._id;
        if(redirectToMessenger) return <Redirect to="/messenger"></Redirect>;
        return (
            <div className="app-outer mb-4" id="app-outer">

                <CreatePost userPhoto={photo} isShow={isShow} />

                <ul className="profile-nav nav">
                    <div className="container">
                        <div className="row profile-row">
                            <div className="profile-avatar wlg-size-20 wsm-size-40 mr-4">
                                <li className="nav-item">
                                    <img className="profile-avatart-image profile-thumb profile-thumb-lg border-r-half" 
                                        src={`${photo}?${new Date().getTime()}`} alt="user-image"
                                    />
                                </li>
                            </div>
                            <div className="profile-nav-link row wlg-size-60">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="">Tweet</Link>
                                </li>
                                {
                                    userId === userLogged ? (
                                        <>
                                            <li className="nav-item">
                                                <i 
                                                    className="material-icons nav-link button-show-model-create-post"
                                                    style={{cursor: "pointer"}}
                                                    onClick={() => document.getElementById("model-mask").style.display="flex"}
                                                >
                                                    create
                                                </i>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link" to="#" style={{color: "white"}}
                                                    onClick={this.redirectToMessenger}
                                                >
                                                        <i class="material-icons">near_me</i>
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <div className="moveavle-module wlg-size-20 wsm-hide" style={{marginLeft: "auto"}}>
                                            <li className="nav-item">
                                                {
                                                    isFollowed ? (
                                                        <button className="nav-link btn"
                                                            style={{
                                                                "min-width": "105px",
                                                                "background-color": "#ac002b",
                                                                "border-color": "#1B95E0",
                                                                "color": "#fff",
                                                                "border-radius": "100px"
                                                            }}
                                                            onClick={this.unfollow}
                                                        >
                                                            Unfollow -
                                                        </button>
                                                    ) : 
                                                    (
                                                        <button className="nav-link btn"
                                                            style={{
                                                                "min-width": "105px",
                                                                "background-color": "#1B3247",
                                                                "border-color": "#1B95E0",
                                                                "color": "#1B95E0",
                                                                "border-radius": "100px"
                                                            }}
                                                            onClick={this.follow}
                                                        >
                                                            Follow +
                                                        </button>
                                                    )
                                                }
                                            </li>
                                        </div>
                                    ) 
                                }
                                
                            </div>
                            
                        </div>
                    </div>
                </ul>
                <div className="app-content">
                    <div className="container">
                        <div className="row">
                            <div className="profile-sidebar wlg-size-20 wsm-size-40 mr-4">
                                <div className="profile-header-card">
                                    
                                    <ul className="profile-follow p-2">
                                        <p className="text-muted" style={{"font-family": "serif"}}>Following</p>
                                        {
                                            followingArray.map(fl => {
                                                return (
                                                    <li className="follow-item mb-2">
                                                        <img src={`${fl.photo}`} alt="user-image" className="border-r-half mr-3 profile-thumb profile-thumb-sm"/>
                                                        <Link to={`/user/${fl._id}`} style={{fontSize: "14px"}}>{fl.username}</Link>
                                                    </li>
                                                )
                                            })
                                        }
                                        <hr style={{backgroundColor: "#38444d", marginTop: "20px"}}/>
                                        <p className="text-muted" style={{"font-family": "serif"}}>Followers</p>
                                        {
                                            followersArray.map(fl => {
                                                return (
                                                    <li className="follow-item mb-2">
                                                        <img src={`${fl.photo}`} alt="user-image" className="border-r-half mr-3 profile-thumb profile-thumb-sm"/>
                                                        <Link to={`/user/${fl._id}`} style={{fontSize: "14px"}}>{fl.username}</Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    
                                </div>
                            </div>
                            
                            <div className="profile-timeline wlg-size-60" id="profile-timeline">
                                {
                                    posts.map( (post, index) => {
                                        return <div className="card profile-item w-100 bg-151F2B" key={index}>
                                            <DropDownEditPost postId={post._id} />
                                            <div className="card-body">
                                                <div className="profile-item-header d-flex align-items-start">
                                                    <img className="border-r-half mr-3 profile-thumb profile-thumb-md" src={photo} alt="user-image"/>
                                                    <div className="card-text">
                                                        <div className="profile-item-name">
                                                            {username} <span className="text-muted">@{email} <small> .{moment(post.created).fromNow()}</small></span>
                                                        </div>
                                                        <div className="profile-item-title mb-2">
                                                            {post.body}
                                                        </div>
                                                        {post.photo && <img className="card-img-top border-r-liti" src={post.photo} alt="Card image cap" />}
                                                        <ReactPost postId={post._id} likes={post.likes} comments={post.comments} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                                
                            </div>  {/* END PROFILE TIME LINE */}
                        </div>
                    </div>
                </div> {/* END APP CONTENT */}
            </div> 
        );
    }
}

export default Profile;

