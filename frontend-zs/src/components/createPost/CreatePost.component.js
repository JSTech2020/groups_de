import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
//import Files from "react-butterfiles";
import { Button } from "react-bootstrap";
import axios from 'axios';


//https://github.com/RIP21/react-simplemde-editor
//

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            title: '',
            media: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
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

    handleTitleChange(event) {
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
    render() {
        const { options, delay, id, ...rest } = this.props;

        return (
            <div>
                <h1>Create Post</h1>
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                <SimpleMDE onChange={this.handleChange} />
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Post</Button>
            </div>
        );
    }
}

export default CreatePost;

