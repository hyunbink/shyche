import React from "react";

class VideoShow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            video: {},
            user: {}
        }

        this.deleteThisVideo = this.deleteThisVideo.bind(this);
        this.renderEditPage = this.renderEditPage.bind(this);
    }

    deleteThisVideo() {
        this.props.deleteVideo(this.state.video._id)
            .then(this.props.history.push("/"))
    }

    componentDidMount() {
        let video;
        this.props.fetchVideo(this.props.match.params.videoId)
            .then(action => video = action.video.data[this.props.match.params.videoId])
            .then(() => this.setState({video: video}))
            .then(() => this.props.fetchUser(video.uploaderId))
            .then(action => this.setState({user: action.user.data[0]}))
            .then(() => this.renderEditPage())
    }

    renderEditPage() {
        if (this.state.video.uploaderId === this.props.currentUserId) {
            console.log("This is my Page")
        } else {
            console.log("This is not my page")
        }
    }

    render() {

        if (!this.state.video) {return null}
        return(
            <div className="video-show-page">
                <button onClick={this.deleteThisVideo}>Delete Video</button>
                <iframe
                    width="560"
                    height="315"
                    src={this.state.video.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
                </iframe>
                <h1>{this.state.video.title}</h1>
                <p>{this.state.video.description}</p>
                <div className="video-uploader">
                    <img src="" alt="" />
                    <h3>{this.state.user.firstName} {this.state.user.lastName}</h3>
                </div>
                    
            </div>
        )
    }
}

export default VideoShow;
