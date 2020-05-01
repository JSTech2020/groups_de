import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Container, Col, Button } from "react-bootstrap";
import axios from 'axios';
import { authenticationService } from "../../services/authentication.service"
import { Redirect } from 'react-router-dom'

require('dotenv').config();



class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            title: '',
            media: [],
            files: [],
            status: '',
            message: '',
            s3Subfolder: Date.now(),
            userId: authenticationService.currentUserValue._id,
            listLinks: [],
            submitted: false,
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
        try {
            const post = {
                title: this.state.title,
                content: this.state.value,
                media: this.state.media,
                username: authenticationService.currentUserValue.firstname,
                avatar: authenticationService.currentUserValue.avatar
            };
            axios.post(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/post/create', post)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({ submitted: true });
                    }
                })
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
        const generatePutUrl = process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT + '/api/post/generate-put-url';
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
            const currentFile = this.state.files[i];
            this.uploadFile(currentFile)
                .then(() => {
                    var baseUrl = 'https://zsdevelopment.s3.eu-central-1.amazonaws.com/images';
                    var id = this.state.userId;
                    var folder = this.state.s3Subfolder;
                    var fileName = currentFile.name;
                    this.setState({ media: this.state.media.concat([baseUrl, id, folder, fileName].join('/')) })
                })
        }
    }

    handleFileSelection(e) {
        this.setState({ files: e.target.files })
        console.log(this.state.files)
    }

    function

    render() {
        const media = this.state.media;
        const message = media.length ? 'Use the links below to insert media directly into post' : '';
        const listLinks = media.map((link) => { return (<li key={link}>{link}</li>) })
        const incompletePost = this.state.title === '' || this.state.value === '' || this.state.files.length !== 0
        return (

            <Container>
                {this.state.submitted === true &&
                    <Redirect to="/mitreden" />
                }
                {this.state.submitted === false &&
                    <Col>
                        <h1>Create Post</h1>
                        <h2>Title</h2>
                        <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                        <h2>Text</h2>
                        <SimpleMDE onChange={this.handleChange} />
                        <h2>Add Media</h2>
                        <input type="file" multiple onChange={this.handleFileSelection} />
                        <Button variant="primary" type="submit" onClick={this.handleFileUploads} disabled={this.state.files.length === 0}>Upload</Button>
                        <h3>{message}</h3>
                        <ul>{listLinks}</ul>
                        <h3></h3>
                        <Button variant="success" type="submit" onClick={this.handleSubmit} disabled={incompletePost}>Post</Button>
                    </Col>
                }
            </Container>
        );
    }
}

export default CreatePost;

