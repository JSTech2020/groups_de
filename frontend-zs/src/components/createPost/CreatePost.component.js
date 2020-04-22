import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Files from "react-butterfiles";
import { Button } from "react-bootstrap";
import axios from 'axios';
import { authenticationService } from "../../services/authentication.service"


class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            title: '',
            media: [],
            files: [],
            file: [],
            errors: [],
            message: '',
            s3Subfolder: Date.now()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.handleFileUploads = this.handleFileUploads.bind(this);
    };

    state = {
        value: localStorage.getItem(`smde_${this.props.id}`) || this.props.value
    };

    handleChange = (event) => {
        this.setState({ value: event });
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });

    }

    handleSubmit = async () => {
        alert(JSON.stringify(this.state))
        try {
            const post = {
                title: this.state.title,
                content: this.state.value,
                media: this.state.media,
                s3Subfolder: this.state.s3Subfolder
            };
            axios.post('http://localhost:3001/api/post/create', post);
        } catch (e) {
            console.log(e);
        }
    }

    uploadFile = async (file) => {
        //e.preventDefault()
        //const file = this.state.file
        console.log(file)
        this.setState({ message: 'Uploading...' })
        const contentType = file.type; // eg. image/jpeg or image/svg+xml
        const filePath = 'images/' + authenticationService.currentUserValue._id + '/' + this.state.s3Subfolder + '/' + file.name;
        const generatePutUrl = 'http://localhost:3001/api/post/generate-put-url';
        const options = {
            params: {
                Key: filePath,
                ContentType: contentType
            },
            headers: {
                'Content-Type': contentType,
            }
        };

        const res = await axios.get(generatePutUrl, options);

        //axios didn't work here for various reasons, thus i switched to xhr
        var xhr = new XMLHttpRequest();
        xhr.open('put', res.data.putURL, true);
        xhr.send(file);

    };

    handleFileUploads = (e) => {
        e.preventDefault();
        for (var i = 0; i < this.state.files.length; i++) {
            this.uploadFile(this.state.files[i])
        }
    }

    handleFileSelection(e) {
        this.setState({ files: e.target.files })
        console.log(this.state.files)
    }


    render() {

        return (
            <div>
                <h1>Create Post</h1>
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                <SimpleMDE onChange={this.handleChange} />
                <h2>File Upload</h2>
                <input type="file" multiple onChange={this.handleFileSelection} />
                <button type="submit" onClick={this.handleFileUploads}>Upload</button>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Post</Button>
            </div>
        );
    }
}

export default CreatePost;

