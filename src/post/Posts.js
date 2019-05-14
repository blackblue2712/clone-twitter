import React, { Component } from "react";
import { getPosts } from "../controllers/post";
import Loading from "../components/Loading";
import ReactPost from "./ReactPost";
const moment = require("moment");

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            error: '',
            posts: []
        }

    }


    componentDidMount() {
        this.setState({
            loading: true
        });
        getPosts()
        .then(data => {
            this.setState( {loading: false} );
            console.log(data)
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    posts: data
                });
            }
        });

    }

    

    render() {
        const { loading, posts } = this.state;
        return (
            <>
                {loading && <Loading />}
                <div className="container mt-4">
                    <div className="row">
                        <div className="profile-sidebar wlg-size-20 wsm-size-40 mr-4">
                            <div className="profile-header-card">card</div>
                        </div>
                        <div className="home-timeline wlg-size-60">
                        {
                            posts.map( (post, index) => {
                                return <div className="card profile-item w-100 bg-151F2B" key={index}>
                                    <div className="card-body">
                                        <div className="profile-item-header d-flex align-items-start">
                                            <img className="border-r-half mr-3 profile-thumb profile-thumb-md" src={post.postedBy.photo} alt="user-image"/>
                                            <div className="card-text">
                                                <div className="profile-item-name">
                                                    {post.postedBy.username} <span className="text-muted">@{post.postedBy.email} <small> .{moment(post.created).fromNow()}</small></span>
                                                </div>
                                                <div className="profile-item-title mb-2">
                                                    {post.body}
                                                </div>
                                                {post.photo && <img className="card-img-top border-r-liti" src={post.photo} alt="Card image cap" />}
                                                <ReactPost postId={post._id} likes={post.likes} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                        </div>
                    </div>
                </div>
            </>
        )
        
    }
}

export default Posts;