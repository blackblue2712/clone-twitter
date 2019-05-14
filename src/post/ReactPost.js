import React, { Component } from 'react';
import { isAuthenticated } from '../controllers/auth';
import { likePost, unlikePost } from '../controllers/post';
class ReactPost extends Component {
    constructor() {
        super();
        this.state = {
            isLike: false,
            isLikeWait: false,
            countLike: 0
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

    componentDidMount() {
        let { likes  } = this.props;
        this.setState( {countLike: likes.length} );
        const isLike = likes.filter(like => {
            return like === isAuthenticated().user._id;
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
        const classLike = this.state.isLike === false ? "favorite_border" : "favorite";
        const { countLike } = this.state; 
        return (
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
            </div>
        )
    } 
}

export default ReactPost;