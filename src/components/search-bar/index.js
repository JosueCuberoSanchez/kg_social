import React, { Component } from 'react';

// Reactstrap
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

// Styles
import './search-bar.scss';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {searchTerm: ''};
    }

    onInputChange(searchTerm) {
        this.setState({searchTerm});
        this.props.onSearchTermChange(searchTerm);
    }

    render() {
        return (
            <InputGroup className='w-100'>
                <InputGroupAddon addonType='prepend'>#</InputGroupAddon>
                <Input value={this.state.searchTerm} placeholder='Search' onChange={event => this.onInputChange(event.target.value)} aria-label="Search events"/>
            </InputGroup>
        );
    }
}

export default SearchBar;