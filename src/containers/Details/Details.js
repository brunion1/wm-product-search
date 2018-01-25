import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from 'muicss/lib/react/container'
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';

import WalmartAPI from '../../api/walmart.api.js';

import Carousel from '../../components/Carousel';
import ItemSummary from '../../components/ItemSummary';
import ImageSwitcher from '../../components/ImageSwitcher';

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
                    <Col xs={12} sm={12} md={6} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                        <ImageSwitcher images={this.state.itemDetails.imageEntities}/>
                    </Col>
                </Row>
                <Row>
                    <div className="mui--text-center">You may also like...</div>
                </Row>
                <Row>
                    <Carousel>
                        {this.state.recommendedItems.map(item => {
                            return (<ItemSummary item={item} onItemClick={this.props.onItemClick} key={item.itemId}/>);
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