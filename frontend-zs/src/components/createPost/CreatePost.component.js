import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Files from "react-butterfiles";
import { Button } from "react-bootstrap";
import axios from 'axios';
//import { putUrl } from "../../../../backend-zs/controllers/media.controller";


//https://github.com/RIP21/react-simplemde-editor
//

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
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleFileUploadSuccess = this.handleFileUploadSuccess.bind(this);
        this.handleFileUploadErrors = this.handleFileUploadErrors.bind(this);
    };

    defaultProps = {
        delay: 1000,
        value: "",
        title: ''
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
                media: this.state.media
            };
            const response = await axios.post('http://localhost:3001/api/post/create', post);
        } catch (e) {
            console.log(e);
        }
    }

    //{"id":"_az47k6vk4","name":"man.png","type":"image/png","size":25729,"src":{"file":{},"base64":null}}

    uploadFile = (file) => {
        //e.preventDefault();
        //const { file } = this.state;
        this.setState({ message: 'Uploading...' })
        const contentType = file.type; // eg. image/jpeg or image/svg+xml

        const generatePutUrl = 'http://localhost:3001/api/post/generate-put-url';
        const options = {
            params: {
                Key: file.name,
                ContentType: contentType
            },
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            }
        };

        axios.get(generatePutUrl, options).then(res => {
            const {
                data: { putURL }
            } = res;
            //need to prevent the preflight request here...
            alert(JSON.stringify(file))
            var body = new FormData();
            body.append('file', file);
            fetch(res.data.putUrl, {
                method: 'PUT',
                body: body
            })
            /*axios
                .put(putURL, file, options)
                .then(res => {
                    this.setState({ message: 'Upload Successful' })
                    setTimeout(() => {
                        this.setState({ message: '' });
                        document.querySelector('#upload-image').value = '';
                    }, 2000)
                })
                .catch(err => {
                    this.setState({ message: 'Sorry, something went wrong' })
                    console.log('err', err);
                });*/
        });
    };

    handleFileUploadSuccess = (newFiles) => {
        this.uploadFile(newFiles[0])
        var existingFiles = this.state.files
        this.setState({ files: existingFiles.concat(newFiles) })
        alert(JSON.stringify(this.state))

    }

    handleFileUploadErrors = (errors) => {
        this.setState({ errors })
    }



    render() {
        const { options, delay, id, ...rest } = this.props;

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

