import React from "react";

class VideoEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.video;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
    }

    componentDidMount() {
        this.props.clearVideosErrors();
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    handleErrors() {
        return <ul id="video-form-errors">{this.props.errors.map((error,idx) =>(
            <li key={idx}>{error}</li>
        ))}
        </ul>
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateVideo(this.state)
            .then(action => this.props.history.push(`${action.video.data._id}`));
    }

    render () {
        return(
            <form onSubmit={this.handleSubmit}> 
                {/* <p className="close-form-button" onClick={() => this.props.closeModal()}>x</p> */}
                <h1>Upload your video</h1>
                <label className="title">Title
                    <input type="text" placeholder="Title" value={this.state.title} onChange={this.update("title")}/>
                </label>
                <label className="description">Description
                    <input type="text" placeholder="Description" value={this.state.description} onChange={this.update("description")}/>
                </label>
                <label className="topic">Topic
                    <input type="text" placeholder="Topic" value={this.state.topic} onChange={this.update("topic")}/>
                </label>
                <label className="url">Video File
                    <input type="text" placeholder="URL" value={this.state.url} onChange={this.update("url")}/>
                </label>
                {this.handleErrors()}
                <button className="video-upload-button">Upload</button>
            </form>
        )
    }
}

export default VideoEditForm;