import React, { Component } from 'react';
import parse from 'html-react-parser';

class PrivacyPolicy extends Component {
    constructor(props){
        super(props)
        this.state = {data: '' }
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/privacy-policy`)
            .then((response) => response.json())
            .then((data) => {
                        this.setState({
                            data: data
                        })
            })
    }
    render() {
        return parse(this.state.data);
    }
}
export default PrivacyPolicy

