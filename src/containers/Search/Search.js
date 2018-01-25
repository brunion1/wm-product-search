import React, { Component } from 'react';
import PropTypes from 'prop-types';

import API from '../../api/walmart.api.js';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import ItemSummary from '../../components/ItemSummary';

class Search extends Component {
    constructor(props){
        super(props);

        //binding class methods at the top, for readability
        this.search = this.search.bind(this);
        this.onItemClick = this.onItemClick.bind(this);

        // keeping initial state simple
        this.state = {
            searchString : "",
            searchResults : []
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.searchTerm !== this.props.searchTerm){
            this.search(nextProps.searchTerm);
        }
    }

    onItemClick(itemId){
        console.log(itemId);
    }

    search(term){
        API.search(term).then(results => {
            this.setState({
                searchResults : results
            });
            console.log("Search results...");
            console.log(results);
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.state.searchResults.map(item => {
                        return (<Col xs={12} sm={12} md={6} lg={4}>
                            <ItemSummary item={item} onItemClick={this.props.onItemClick}/>
                        </Col>)
                    })}
                </Row>
            </Container>
        );
    }
}

Search.propTypes = {
    searchTerm : PropTypes.string,
    onItemClick : PropTypes.func.isRequired
};

export default Search;