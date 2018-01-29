import React, { Component } from 'react';

import Container from 'muicss/lib/react/container'
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';

import WalmartAPI from '../../api/walmart.api.js';

import ImageSwitcher from '../../components/ImageSwitcher';
import Image from '../../components/Image';
import Header from '../Header/Header';
import Recommendations from '../../components/Recommendations';

class Details extends Component {
    constructor(props){
        super(props);

        this.fetchData = this.fetchData.bind(this);
        // keeping initial state simple
        this.state = {
            itemDetails : {},
            isLoading : true,
            itemId : null
        }
    }

    componentDidMount(){
        if(this.props.match.params.itemId){
            this.fetchData(this.props.match.params.itemId);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.itemId !== this.props.match.params.itemId) {
            this.fetchData(nextProps.match.params.itemId);
        }
    }

    fetchData(itemId){
        this.setState({
            isLoading : true,
            itemId : itemId
        });

        //firing off both simultaneously for now -- will update later
        WalmartAPI
            .getDetails(itemId)
            .then(itemDetails => {
                this.setState({
                    isLoading : false,
                    itemDetails: itemDetails
                });
            });
    }

    render() {
        return (
            <div>
                <Header searchMode={false} headerText={this.props.match.params.itemId}/>
                {!this.state.isLoading && this.state.itemId ?
                    <Container>
                        <Row>
                            <Row>{this.state.itemDetails.name}</Row>
                            <Row>by {this.state.itemDetails.brandName}</Row>
                            <Row><Image src={this.state.itemDetails.customerRatingImage}/> {this.state.itemDetails.customerRating} {this.state.itemDetails.numReviews} reviews</Row>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                                {/*<ImageSwitcher images={this.state.itemDetails.imageEntities}/>*/}
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                                <Row></Row>
                                msrp, salePrice
                                //price, buy button, and details
                                // addToCartUrl
                            </Col>
                        </Row>
                    </Container>
                    :
                    <div>...loading </div>
                }
                <Recommendations itemId={this.state.itemId}/>
            </div>
        );
    }
}

export default Details;