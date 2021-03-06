import React from "react";
import { Link } from "react-router-dom";
import "./video_index/video_index.scss";

class VideoIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.formatTopicName = this.formatTopicName.bind(this);
        this.linkToTopicOrUser = this.linkToTopicOrUser.bind(this);
        this.userShow = this.userShow.bind(this);
    }

    componentDidMount() {
        if (this.props.formType === 'user-show') return 
        this.props.fetchUser(this.props.video.uploaderId)
            .then(user=>this.setState({user: user}));
    }

    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    formatTopicName() {
        let topic = this.props.video.topic;
        let words;
        
        if (topic.includes("-")){
            words = topic.split("-");
        } else {
            words = topic;
        }
        if (typeof words !== 'string') {
            return words.map(word => (this.capitalize(word))).join(" ");
        } else {
            return this.capitalize(words);
        }
    }

    linkToTopicOrUser() {
        let component;
        // Check if we are filtering by user or topic

        component = 
                // <Link to={`/topic/${this.props.video.topic}`} style={{ textDecoration: 'none' }}>
                    <div className="video-topic">
                        {this.formatTopicName()}
                    </div>
                // </Link>

        // if (this.props.prevPage === "topic") {
        //     component = 
        //         <Link to={`/topic/${this.props.video.topic}`} style={{ textDecoration: 'none' }}>
        //             <div className="video-topic">
        //                 {this.formatTopicName()}
        //             </div>
        //         </Link>
        // } else if (this.props.prevPage === "user") {
        //     component = 
        //         <Link to={`/users/${this.props.video.uploaderId}`}>
        //             {this.capitalize(this.state.user.firstName)} {this.capitalize(this.state.user.lastName)}
        //         </Link>
        // } else {
        //     return null; 
        // }
        return component;
    }

    userShow() {
        return (
            <li className="video-index-item">
                    <iframe  src={this.props.video.url} title={this.props.video.title}></iframe>
                    <Link to={`/video/${this.props.video._id}`} className="video-index-link" style={{textDecoration: 'none'}}>
                        <h1 className="vid-index-title">{this.props.video.title}</h1>
                        <div className="uploader-or-topic-name"><div className="tags"></div>{this.linkToTopicOrUser()}</div>
                    </Link> 
                </li>
        ) 
    }

    render() {
        return (
            <>
                {this.props.formType ? this.userShow() : 
                    <li className="video-index-item">
                        <video width="560" height="315" key={this.props.video.title} title={this.props.video.title} controls>
                            <source type="video/mp4" src={this.props.video.url}></source>
                        </video>
                        <Link to={`/video/${this.props.video._id}`} className="video-index-link" style={{textDecoration: 'none'}}>
                            <h1 className="vid-index-title">{this.props.video.title}</h1>
                            <div className="uploader-or-topic-name">{this.linkToTopicOrUser()}</div>
                        </Link> 
                    </li>
                }
            </>
        )
    }
}

export default VideoIndexItem;