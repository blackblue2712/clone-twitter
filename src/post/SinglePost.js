import React, { Component } from 'react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { getPost } from '../controllers/post';
import ReactPost from './ReactPost';
const moment = require("moment");


class SinglePost extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            post: {}
        }

    }

    componentDidMount() {
        let postId = this.props.match.params.postId;
        getPost(postId)
        .then( data => {
            this.setState({
                post: data,
                loading: false
            })
        })
    }

    render() {
        const { loading, post } = this.state;
        return (
            <>
                {
                    loading ? <Loading /> : 
                    <div className="container mt-4">
                        <div className="row">
                            <div className="profile-sidebar wlg-size-20 wsm-size-40 mr-4">
                                {/* <div className="profile-header-card">card</div> */}
                            </div>
                            <div className="home-timeline wlg-size-60">
                                <div className="card profile-item w-100 bg-151F2B">
                                    <div className="card-body">
                                        <div className="profile-item-header d-flex align-items-start">
                                            <Link to={`user/${post.postedBy._id}`}>
                                                <img className="border-r-half mr-3 profile-thumb profile-thumb-md" src={post.postedBy.photo} alt="user-image"/>
                                            </Link>
                                            <div className="card-text">
                                                <Link to={`user/${post.postedBy._id}`}>
                                                    <div className="profile-item-name">
                                                        {post.postedBy.username} <span className="text-muted">@{post.postedBy.email} <small> .{moment(post.created).fromNow()}</small></span>
                                                    </div>
                                                </Link>
                                                <div className="profile-item-title mb-2">
                                                    {post.body}
                                                </div>
                                                {post.photo && <img className="card-img-top border-r-liti" src={post.photo} alt="Card image cap" />}
                                                <ReactPost postId={post._id} likes={post.likes} comments={post.comments} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default SinglePost;