import React, { Component } from 'react';
import { isAuthenticated } from '../controllers/auth';
import Loading from '../components/Loading';
import { getPost, updatePost } from '../controllers/post';
import './custom.css';
import './custom.js';

class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            body: '',
            photo: '',
            fileSize: 0,
            loading: false,
            error: '',
            message: ''
        };
        this.loadPost = this.loadPost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({
            body: window.event.target.value
        })
    }

    loadPost(postId) {
        getPost(postId)
        .then( data => {
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    body: data.body,
                    photo: data.photo
                });
            }
            
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState( {loading: true} );
        // Get text in textare input
        let token = isAuthenticated().token;
        const postId = this.props.match.params.postId;
        let formPost = document.getElementById("form-post");
        let bodyPost = formPost.elements["body"].value;
        // Set to form data
        this.postData.set("body", bodyPost);
        // Call api edit post in controller
        updatePost(this.postData, postId, token)
        .then( data => {
            this.setState( {loading: false} );
            if(data.error) console.log(data.error);
            else {
                
            }
        })
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.loadPost(postId);
        this.postData = new FormData();
    }


    preview_image = (event) => {
        document.getElementById("preview-image").style.display = "block";
        let reader = new FileReader();
        reader.onload = function () {
            let inputAvatar = document.getElementById('photo-post-preview');
            inputAvatar.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        this.postData.set("photo", event.target.files[0]);
    }
    

    render() {
        const { loading, body, photo } = this.state;
        return (
            <>
            {loading && <Loading />}
                <div className="container mt-4">
                    
                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">
                            Edit Post
                        </legend>
                        <div className="control-group mt-4">
                            <form onSubmit={this.handleSubmit}name="form-post" id="form-post">
                                <div className="form-group">
                                    <label className="control-label input-label">Body :</label>
                                    <textarea type="text" className="form-control" name="body"
                                        rows="8"
                                        value={body}
                                        onChange={this.handleChange}
                                    />
                                    {
                                        photo ?
                                            <div className="wrap-image">
                                                <img src={`${photo}`} alt="" style={{width: "60%", marginTop: "1rem", marginLeft: "auto", marginRight: "auto"}}/>
                                            </div>
                                        :
                                        <div className="wrap-image" id="wrap-image">
                                            <button type="button" className="button-choose-image" id="button-choose-image"
                                                onClick={() => document.getElementById("photo-post").click()}
                                            >
                                                <i className="material-icons">photo_library</i>
                                            </button>
                                            <div className="preview-image" id="preview-image">
                                                <img src="" alt="" id="photo-post-preview" className="photo-post-preview"/>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <input type="file" className="d-none" name="photo-post" id="photo-post"
                                   onChange={this.preview_image}
                                />
                                <button type="submit" className="btn btn-raised btn-sm btn-primary mr-4">Save change</button>
                                <button type="button" className="btn btn-raised btn-sm">Cancel</button>
                            </form>
                        </div>
                    </fieldset>
                </div>
            </>
        )
    }
}

export default EditPost;