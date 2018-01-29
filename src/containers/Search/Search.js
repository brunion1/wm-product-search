import React, { Component } from 'react';

import WalmartAPI from '../../api/walmart.api.js';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Header from '../Header/Header';
import ItemSummary from '../../components/ItemSummary';

class Search extends Component {
    constructor(props){
        super(props);

        //binding class methods at the top, for readability
        this.search = this.search.bind(this);

        // keeping initial state simple
        this.state = {
            searchResults : [],
            isLoading : false
        }
    }

    search(term){

        this.setState({ isLoading : true });

        WalmartAPI
            .search(term)
            .then(results => {
                this.setState({
                    searchResults : results,
                    isLoading: false
                });
            });
    }

    render() {
        return (
            <div>
                <Header onSearch={this.search} searchMode={true}/>
                <Container>
                    <Row>
                        {this.state.searchResults.map(item => {
                            return (<Col xs={12} sm={12} md={6} lg={4}>
                                <ItemSummary item={item} key={item.itemId}/>
                            </Col>)
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Search;