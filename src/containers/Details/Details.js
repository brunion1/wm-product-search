import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from 'muicss/lib/react/container'
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';

import WalmartAPI from '../../api/walmart.api.js';

import Carousel from '../../components/Carousel';
import ItemSummary from '../../components/ItemSummary';
import ImageSwitcher from '../../components/ImageSwitcher';
import Image from '../../components/Image';

class Details extends Component {
    constructor(props){
        super(props);

        this.fetchData = this.fetchData.bind(this);
        // keeping initial state simple
        this.state = {
            itemDetails : {},
            recommendedItems : []
        }
    }

    componentDidMount(){
        this.fetchData(this.props.itemID);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.itemID !== this.props.itemID) {
            this.fetchData(nextProps.itemID);
        }
    }

    fetchData(itemID){

        //firing off both simultaneously for now -- will update later
        WalmartAPI
            .getDetails(itemID)
            .then(itemDetails => {
                this.setState({
                    itemDetails: itemDetails
                });
            });

        WalmartAPI
            .getRecommendations(itemID)
            .then(recommendedItems => {
                this.setState({
                    recommendedItems: recommendedItems
                });
            });

    }

    render() {
        return (
            <Container>
                <Row>
                    <Row>{this.state.itemDetails.name}</Row>
                    <Row>by {this.state.itemDetails.brandName}</Row>
                    <Row><Image src={this.state.itemDetails.customerRatingImage}/> {this.state.itemDetails.customerRating} {this.state.itemDetails.numReviews} reviews</Row>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                        <ImageSwitcher images={this.state.itemDetails.imageEntities}/>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                        <Row>

                        </Row>
                        msrp, salePrice
                        //price, buy button, and details
                        // addToCartUrl
                    </Col>
                </Row>
                <Row>
                    <div className="mui--text-center">You may also like...</div>
                </Row>
                <Row>
                    <Carousel>
                        {this.state.recommendedItems.map(item => {
                            return(<Col xs={12} sm={12} md={4} lg={4} xl={4}>
                                <ItemSummary item={item} onItemClick={this.props.onItemClick} key={item.itemId}/>
                            </Col>);
                        })}
                    </Carousel>
                </Row>
            </Container>
        );
    }
}

Details.propTypes = {
    onItemClick : PropTypes.func.isRequired,
    itemID : PropTypes.number
};

export default Details;