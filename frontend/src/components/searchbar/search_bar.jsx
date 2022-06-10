import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let query = this.state.query;
        this.props.clearVideos();
        this.props.search(query);
        this.props.history.push('/search');
    }

    update(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input className='search-bar' type="search" placeholder="Search" value={this.state.query} onChange={this.update("query")} />
            </form>
        );
    }
}

export default SearchBar;