import React from 'react';
import PropTypes from 'prop-types';
// muicss components
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import WalmartAPI from '../api/walmart.api.js';

import Carousel from './Carousel';
import ItemSummary from './ItemSummary';
import LoadingSpinner from './LoadingSpinner';

class Recommendations extends React.Component {
    constructor(props){
        super(props);

        this.fetchRecommendations = this.fetchRecommendations.bind(this);

        this.state = {
            isLoading : false,
            recommendedItems : [],
            noValidItems : false
        }
    }

    componentWillReceiveProps(){
        if(this.props.itemId){
            this.fetchRecommendations(this.props.itemId);
        }
    }

    fetchRecommendations(itemId){
        this.setState({ isLoading: true, recommendedItems : [] });

        WalmartAPI
            .getRecommendations(itemId)
            .then(recommendedItems => {
                this.setState({
                    isLoading : false,
                    recommendedItems: recommendedItems
                });
            }, () => {
                this.setState({
                    noValidItems : true,
                    isLoading : false
                });
            });
    }

    render(){
        return(
            <Container>
                <Row>
                    <div className="mui--text-title mui--text-center">You may also like...</div>
                </Row>
                <Row>
                    {!this.state.isLoading ?
                        <Carousel>
                            {this.state.recommendedItems.map((item, index) => {
                                return(<Col xs={10} sm={10} md={6} lg={4} xl={4} key={item.itemId}>
                                    <ItemSummary item={item}/>
                                </Col>);
                            })}
                        </Carousel>
                        : null
                    }
                    <LoadingSpinner visible={this.state.isLoading}/>
                </Row>
            </Container>
        )
    }
}

Recommendations.propTypes = {
    itemId : PropTypes.number
};

export default Recommendations;