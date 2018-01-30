import React, { Component } from 'react';

import WalmartAPI from '../api/walmart.api.js';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Header from '../components/Header';
import ItemSummary from '../components/ItemSummary';
import LoadingSpinner from '../components/LoadingSpinner';

class Search extends Component {
    constructor(props){
        super(props);

        //binding class methods at the top, for readability
        this.search = this.search.bind(this);

        // keeping initial state simple
        this.state = {
            searchResults : [],
            isLoading : false,
            noResults : false
        }
    }

    componentDidMount(){
        if(this.props.match.params.searchTerm){
            this.search(this.props.match.params.searchTerm);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.match.params.searchTerm !== this.props.match.params.searchTerm){
            this.search(this.props.match.params.searchTerm);
        }
    }

    search(term){

       this.setState({ isLoading : true });

        WalmartAPI
            .search(term)
            .then(results => {

                this.setState({
                    searchResults : results,
                    noResults : false,
                    isLoading: false
                });

            }, () => {

                //if search returns invalid, don't crash
                this.setState({
                    noResults : true,
                    isLoading: false
                });

            });
    }

    render() {
        return (
            <div>
                <Header onSearch={this.search} searchMode={true}/>
                <Container className="extra-margin">
                    <Row>
                        {this.state.searchResults.map(item => {
                            return (<Col xs={12} sm={12} md={6} lg={4}>
                                <ItemSummary item={item} key={item.itemId}/>
                            </Col>)
                        })}
                        {this.state.noResults ?
                            <Col xs={12} sm={12} md={8} lg={8} sm-offset={2} lg-offset={2} className="mui--text-center extra-margin">
                                Sorry, no results for that item. Try searching for something else
                            </Col>
                            : null
                        }
                    </Row>
                    <LoadingSpinner visible={this.state.isLoading}/>
                </Container>
            </div>
        );
    }
}

export default Search;