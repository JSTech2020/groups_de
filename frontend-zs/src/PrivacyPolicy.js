import React, { Component } from 'react';
import parse from 'html-react-parser';


class PrivacyPolicy extends Component {
    constructor(props){
        super(props)
        this.state = {data: '' }
    }

    componentDidMount() {
        fetch('http://192.168.178.29:3001/api/privacy-policy')
            .then((response) => response.json())
            .then((data) => {
                        this.setState({
                            data: data
                        })
            })
    }
    render() {
        return  parse(this.state.data);
    }
}
export default PrivacyPolicy

