import React, { Component } from 'react';
import { createPost } from '../controllers/post';
import './custom.css';
import { isAuthenticated } from '../controllers/auth';
import Loading from "../components/Loading";

class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.setState( {loading: true} )
        // Get text in textare input
        let token = isAuthenticated().token;
        let userId = isAuthenticated().user._id;
        let formPost = document.getElementById("form-post");
        let bodyPost = formPost.elements["new-post"].value;
        // Set to form data 
        this.postData.set("body", bodyPost);
        // Call api create post in controller
        createPost(this.postData, userId,token)
        .then( data => {
            console.log(data)
            if(data.error) {
                this.setState( {loading: false, error: data.error} )
            } else {
                this.setState( {loading: false} );
                document.getElementById("model-mask").style.display="none";
                formPost.reset();
                document.getElementById("photo-post").value = "";
                document.getElementById("photo-post-preview").setAttribute("src", "");
                this.postData.delete("body");
                this.postData.delete("photo");
            }
            
        })
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

    componentDidMount() {
        this.postData = new FormData();
    }

    render() {
        const { loading } = this.state;
        return (
            <>
                {loading && <Loading />}
                <div className={`model-mask`} id="model-mask">
                    <div className="model-layout-opacity"></div>
                    <div className="model-create-post">
                        <div className="model-post-header d-flex align-items-center">
                            <h5 className="model-post-header-content text-bold mb-0">
                                Compose new Tweet
                            </h5>
                            <i 
                                className="material-icons ml-auto model-close"
                                onClick={() => document.getElementById("model-mask").style.display="none"}
                            >
                                close
                            </i>
                        </div>
                        <form
                            onSubmit={this.handleSubmit}
                            name="form-post"
                            id="form-post"
                        >
                            <div className="model-post-body py-3 d-flex">
                                <img src={this.props.userPhoto} alt="user photo" className="profile-avatart-image border-r-half profile-thumb profile-thumb-sm" />
                                <div className="">
                                    <textarea name="new-post" id="new-post" cols="54" rows="3"></textarea>
                                </div>
                            </div>
                            <div className="model-post-footer d-flex">
                                <button type="button" className="button-choose-image" id="button-choose-image"
                                    onClick={() => document.getElementById("photo-post").click()}
                                >
                                    <i className="material-icons">photo_library</i>
                                </button>
                                <input type="file" name="photo-post" id="photo-post" className="d-none"
                                    onChange={this.preview_image}
                                />
                                <div className="button-post ml-auto">
                                    <button className="btn btn-raised btn-info btn-sm">Tweet</button>
                                </div>
                            </div>

                            <div className="preview-image" id="preview-image">
                                <img src="" alt="" id="photo-post-preview" className="photo-post-preview"/>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default CreatePost;
