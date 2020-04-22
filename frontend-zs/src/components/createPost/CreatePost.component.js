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
        this.handleFileUploadSuccess = this.handleFileUploadSuccess.bind(this);
        this.handleFileUploadErrors = this.handleFileUploadErrors.bind(this);
        this.handleFileSelection = this.handleFileSelection.bind(this);
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

    uploadFile = async (e) => {
        e.preventDefault()
        const file = this.state.file
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

        //preparing payload
        //this didn't work - 
        const newFile = new Blob([file], { type: contentType });

        var body = new FormData();
        body.append('imageFile', file);

        var xhr = new XMLHttpRequest();
        //xhr.open('post', "http://localhost:3001/api/post/upload", true);
        xhr.open('put', res.data.putURL, true);
        //xhr.setRequestHeader("Content-Type", "multipart/form-data");
        //xhr.setRequestHeader("Content-Type", contentType);
        xhr.send(file);

        //delete axios.defaults.headers.common["Authorization"]; // need to remove this for s3 this request
        /*axios({
            //url: res.data.putURL,
            //method: 'PUT',
            url: "http://localhost:3001/api/post/upload",
            method: 'post',
            imageFile: body,
            //headers: { 'Content-Type': 'multipart/form-data' }
        })
            //axios.post("http://localhost:3001/api/post/upload", body, { 'content-type': contentType })
            .then((result) => {
                console.log(JSON.stringify(result))
                this.setState({ message: 'Success!' })
            })
            .catch((error) => {
                this.setState({ message: 'Uh-oh something went wrong' });
                console.log(error.response.data);
            });*/
    };


    handleFileUploadSuccess = (newFiles) => {
        newFiles.map(this.uploadFile)
        var existingFiles = this.state.files
        this.setState({ files: existingFiles.concat(newFiles) })

    }

    handleFileUploadErrors = (errors) => {
        this.setState({ errors })
    }

    handleFileSelection(e) {
        this.setState({ file: e.target.files[0] })
    }


    render() {

        return (
            <div>
                <h1>Create Post</h1>
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                <SimpleMDE onChange={this.handleChange} />
                <h2>File Upload</h2>
                <input type="file" onChange={this.handleFileSelection} />
                <button type="submit" onClick={this.uploadFile}>Upload</button>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Post</Button>
            </div>
        );
    }
}

export default CreatePost;

