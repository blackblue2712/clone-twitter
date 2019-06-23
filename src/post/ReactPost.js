import React, { Component } from 'react';
import { isAuthenticated } from '../controllers/auth';
import { likePost, unlikePost, comment, uncomment, getPost } from '../controllers/post';
import { Link } from 'react-router-dom';
const moment = require("moment");
 
class ReactPost extends Component {
    constructor() {
        super();
        this.state = {
            isLike: false,
            isLikeWait: false,
            countLike: 0,
            countComment: 0,
            displayComments: "d-none",
            comments: "",
            post: ""
        }
    }

    toggleLike(postId) {
        let userId = isAuthenticated().user._id;
        let token = isAuthenticated().token;
        let {isLike, isLikeWait} = this.state;

        // Check state to see if the user click multi times
        // if(this.state.isLike === isLikeWait) {
        //     var likeAction = setTimeout(() => {
        //         console.log("LIKING ... ");
        //     }, 1000)
        //     console.log(likeAction)
        // } else {
        //     clearTimeout(likeAction);
        //     console.log("clear timeout")
        // }

        // Change the react's interface immediately
        if(isLike) {
            unlikePost(postId, userId, token);
            this.setState( (prevState, props) => {
                return {
                    isLike: !prevState.isLike,
                    countLike: prevState.countLike - 1
                }
            })
        } else {
            likePost(postId, userId, token);
            this.setState( (prevState, props) => {
                return {
                    isLike: !prevState.isLike,
                    countLike: prevState.countLike + 1
                }
            })
        }
        
        
        
    }

    toggleComment(postId) {
        if(this.state.post === "") {
            getPost(postId)
            .then( post => {
                this.setState({
                    post,

                })
            })
        }
        this.setState({
            displayComments: this.state.displayComments === "d-none" ? "d-block" : "d-none"
        })
    }

    handleChange(e) {
        this.setState({
            comments: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            comments: ""
        });

        let userId = isAuthenticated().user._id;
        let token = isAuthenticated().token;
        let { postId } = this.props;
        let textComment = this.state.comments;
            
        comment(postId, userId, textComment, token)
        .then(data => {
            getPost(postId)
            .then( post => {
                this.setState({
                    post,

                })
            })
        })
    }

    deleteComment(commentId, postId) {
        let checkBeforeDelete = window.confirm("Are you sure to delete this comment?");
        if(checkBeforeDelete) {
            let userId = isAuthenticated().user._id;
            let token = isAuthenticated().token;
            uncomment(postId, userId, commentId, token)
            .then( () => {
                getPost(postId)
                .then( post => {
                    this.setState({
                        post,
                        countComment: post.comments.length
                    })
                })
            })
        }
    }

    componentDidMount() {
        let { likes, comments  } = this.props;
        let userId = isAuthenticated().user && isAuthenticated().user._id;
        this.setState( {countLike: likes.length, countComment: comments.length} );
        const isLike = likes.filter(like => {
            return like === userId;
        }).length;
        if(isLike) {
            this.setState({
                isLike: true,
                isLikeWait: true,
            })
        }
    }

    render() {
        const { postId } = this.props;
        const comments = this.state.post !== "" ? this.state.post.comments : "";
        const classLike = this.state.isLike === false ? "favorite_border" : "favorite";
        const { countLike, countComment, displayComments } = this.state;
        const textComment = this.state.comments;
        return (
            <>
                <div className="card-react mt-4">
                    <div className="react-like">
                        <button className="react-like-toggle" type="button"
                            onClick={() => this.toggleLike(postId)}
                        >
                            <span className="icon-like" id="icon-like">
                                <i className={`material-icons ${classLike}`}>{classLike}</i>
                            </span>
                            <span className="count-like">
                                {countLike}
                            </span>
                        </button>
                    </div>
                    <div className="comments">
                        <button className="more-detail-button" style={{color: "#ccc"}}
                            onClick={() => this.toggleComment(postId)}
                        >
                            <i className="material-icons">forum</i>
                            <span className="count-like">
                                {countComment}
                            </span>
                        </button>
                    </div>
                    <div className="more-detail">
                        <Link className="more-detail-button" style={{color: "#ccc"}}
                            to={`/post/${postId}`}
                        >
                            <i className="material-icons">more_horiz</i>
                        </Link>
                    </div>
                </div>
                <div className="mt-2">
                    <form onSubmit={() => this.handleSubmit(window.event)} className={displayComments} >
                        <input type="text" className="form-control"
                            style={{borderRadius: "15%"}}
                            value={textComment}
                            onChange={() => this.handleChange(window.event)}
                        />
                    </form>
                </div>
                <div className={`comment-fields ${displayComments}`} >
                    <ul className="list-group p-0">
                    {
                        comments !== "" && comments.map( (comment, index) => {
                            return <div className="list-group-item pb-1" key={index}>
                                {/*NEED TO CHANGE*/}{isAuthenticated() && isAuthenticated().user._id === comment.postedBy._id &&
                                <div className="dropdown text-right mr-0" style={{
                                    position: "absolute",
                                    right: 0
                                }}>
                                    <button className="btn btn-secondary dropdown-toggle btn-sm"  data-toggle="dropdown"
                                        onClick={() => this.deleteComment(comment._id, postId)}
                                    ></button>
                                    
                                </div>
                                }
                                <img
                                    className="material-icons mr-3"
                                    src={comment.postedBy.photo}
                                    style={{
                                        height:"40px",
                                        width:"40px",
                                        borderRadius: "50%",
                                        border: "3px solid #f7dbdb",
                                        objectFit: "cover"
                                    }}
                                />
                                <div className="bmd-list-group-col">
                                        <p className="list-group-item-heading">
                                            <Link
                                                to={`/post/${comment._id}`}
                                                key={index}
                                                style={{marginRight: ".4rem"}}
                                            >
                                                {comment.postedBy.username}
                                            </Link>
                                            <span
                                                className="text-muted"
                                                style={{
                                                    fontSize: "0.675rem"
                                                }}
                                            >
                                                { moment(comment.created).fromNow() }
                                            </span>
                                        </p>
                                    
                                    <p className="list-group-item-text m-0" style={{color: "white"}}>{comment.text }</p>
                                </div>
                            </div>
                        }
                    )}
                    </ul>
                </div>
            </>
        )
    } 
}

export default ReactPost;