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
            errors: [],
            message: '',
            s3Subfolder: Date.now()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleFileUploadSuccess = this.handleFileUploadSuccess.bind(this);
        this.handleFileUploadErrors = this.handleFileUploadErrors.bind(this);
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
                'Access-Control-Allow-Origin': '*'
            }
        };

        const res = await axios.get(generatePutUrl, options)
        //prevent the preflight request here using fetch instead of axios
        var body = new FormData();
        body.append('file', file);
        fetch(res.data.putURL, {
            method: 'PUT',
            body: body
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({ message: 'Success!' })
            })
            .catch((error) => {
                this.setState({ message: 'Uh-oh something went wrong' })
            });
    };


    handleFileUploadSuccess = (newFiles) => {
        newFiles.map(this.uploadFile)
        var existingFiles = this.state.files
        this.setState({ files: existingFiles.concat(newFiles) })

    }

    handleFileUploadErrors = (errors) => {
        this.setState({ errors })
    }



    render() {

        return (
            <div>
                <h1>Create Post</h1>
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                <SimpleMDE onChange={this.handleChange} />
                <Files
                    multiple={true} maxSize="2mb" multipleMaxSize="10mb" accept={["image/png", "image/jpg", "image/jpeg"]}
                    onSuccess={this.handleFileUploadSuccess}
                    onError={this.handleFileUploadErrors}
                >
                    {({ browseFiles }) => (
                        <>
                            <p>{this.state.message}</p>
                            <button onClick={browseFiles}>Upload PDF</button>
                            <ol>
                                {this.state.files.map(file => (
                                    <li key={file.name}>{file.name}</li>
                                ))}
                                {this.state.errors.map(error => (
                                    <li key={error.file.name}>
                                        {error.file.name} - {error.type}
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}
                </Files>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Post</Button>
            </div>
        );
    }
}

export default CreatePost;

