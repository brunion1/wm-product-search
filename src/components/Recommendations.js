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
        this.fetchRecommendations();
    }

    fetchRecommendations(){
        this.setState({ isLoading: true });

        WalmartAPI
            .getRecommendations(this.props.itemId)
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
                    <div className="mui--text-center">You may also like...</div>
                </Row>
                <Row>
                    {this.state.noValidItems && !this.state.isLoading ?
                        <Carousel>
                            {this.state.recommendedItems.map((item, index) => {
                                return(<Col xs={10} sm={10} md={6} lg={3} xl={3} key={item.itemId}>
                                    <ItemSummary item={item}/>
                                </Col>);
                            })}
                        </Carousel>
                        :
                        <Col xs={12} sm={12} md={8} lg={8} lg-offset={2} md-offset={2}>
                            Sorry, no recommendations available for this item.
                        </Col>
                    }
                    <LoadingSpinner visible={this.state.isLoading}/>
                </Row>
            </Container>
        )
    }
}

export default Recommendations;