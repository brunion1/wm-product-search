import React, { Component } from 'react';

//api info
import WalmartAPI from '../api/walmart.api.js';

//third party components
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

//custom components
import Header from '../components/Header';
import ItemSummary from '../components/ItemSummary';
import LoadingSpinner from '../components/LoadingSpinner';

const walmartAPI = new WalmartAPI();

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

       this.setState({
           isLoading : true,
           searchResults : []
       });

        walmartAPI
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
                <LoadingSpinner visible={this.state.isLoading}/>
                <Container className="extra-margin">
                    <Row>

                        {this.state.searchResults.map(item => {
                            return (<Col xs={12} sm={12} md={6} lg={4}>
                                <ItemSummary item={item} key={item.itemId}/>
                            </Col>)
                        })}

                        {this.state.noResults && !this.state.isLoading ?
                            <Col xs={12} sm={12} md={8} lg={8} md-offset={2} lg-offset={2} className="mui--text-center extra-margin">
                                Sorry, no results for that item. Try searching for something else
                            </Col>
                            : null
                        }

                    </Row>
                </Container>
            </div>
        );
    }
}

export default Search;