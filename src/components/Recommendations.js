import React from 'react';
import PropTypes from 'prop-types';

// muicss components
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import WalmartAPI from '../api/walmart.api.js';

import Carousel from './Carousel';
import ItemSummary from './ItemSummary';

class Recommendations extends React.Component {
    constructor(props){
        super(props);

        this.fetchRecommendations = this.fetchRecommendations.bind(this);

        this.state = {
            isLoading : false,
            recommendedItems : []
        }
    }

    componentDidMount(){
        this.fetchRecommendations();
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
            });
    }

    render(){
        return(
            <Container>
                <Row>
                    <div className="mui--text-center">You may also like...</div>
                </Row>
                <Row>
                    {this.state.isLoading ? <div>...loading</div>
                        :
                        <Carousel>
                            {this.state.recommendedItems.map(item => {
                                return(<Col xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <ItemSummary item={item} key={item.itemId}/>
                                </Col>);
                            })}
                        </Carousel>
                    }
                </Row>
            </Container>
        )
    }
}

Recommendations.propTypes = {
    itemId : PropTypes.number.isRequired
};

export default Recommendations;