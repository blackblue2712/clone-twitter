import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../public/js/custom";
import { deletePost } from '../controllers/post';
import './custom.css';
import { isAuthenticated } from '../controllers/auth';
import Loading from '../components/Loading';
// import '../public/js/custom';

class DropdownProfile extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            error: '',
            message: ''
        }
    }

    handleToggle = (postId) => {
        return (e) => {
            let elemmentDropdownPost = Array.from(document.getElementsByClassName("dropdown-content-post"));
            if(e.target.attributes[1].value === postId) {
                let eClicked =  elemmentDropdownPost.filter( epost => {
                    return epost.attributes[1].value === postId;
                });
                let statusDisplay = eClicked[0].style.display === "none" ? "block" : "none";
                eClicked[0].style.display = statusDisplay;
            }

            // elemmentDropdownPost.map( ele => {
            //     ele.style.opacity = 0;
            // });
        }
    }

    handleDelete = (postId) => {
        window.event.preventDefault();
        this.setState( {loading: true} );
        let checkBeforeDelete = window.confirm("Are you sure to delete this post?");
        let token = isAuthenticated().token;
        if(checkBeforeDelete) {
            deletePost(postId, token)
            .then(data => {
                if(data.error) {
                    this.setState({
                        loading: false,
                        error: data.error
                    });
                    console.log(data.error);
                } else {
                    this.setState({
                        message: data.message,
                        loading: false
                    })
                }
            })
        }
    }

    componentDidMount() {
        
        
    }
    

    render() {
        const { loading } = this.state;
        return (
            <>
            <li className="position-absolute nav-post-dropdown">
                <div className="post-dropdown">
                    <div className="dropdown-caret-post position-absolute">
                        <span className="caret-outer-post position-absolute"
                            data-id={this.props.postId}
                            onClick={this.handleToggle(this.props.postId)}
                        >
                        </span>
                    </div>
                    <div className="dropdown-content-post" data-id={this.props.postId} style={{display: "none"}} >
                        <ul className="pt-3 px-0 dropdown-content-list">                
                            <li className="hover">
                                <Link className="d-flex align-items-center" to={`/post/edit/${this.props.postId}`}>
                                    <i className="material-icons">edit</i>Edit
                                </Link>
                            </li>
                            <li className="hover">
                                <span className="d-flex align-items-center"
                                    style={{cursor: "pointer"}}
                                    onClick={() => this.handleDelete(this.props.postId)}
                                >
                                    <i className="material-icons">delete</i>Delete
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>  
            </li>
            </>
        )
    }
}

export default DropdownProfile;