import React, { Component } from 'react';

// Reactstrap
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <InputGroup className='mt-5 w-50 mx-auto'>
                <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                <Input value={this.state.searchTerm} placeholder='Search' onChange={event => this.onInputChange(event.target.value)} />
            </InputGroup>
        );
    }
}

export default SearchBar;