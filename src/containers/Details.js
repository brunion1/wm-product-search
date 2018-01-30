import React from 'react';

//third party components
import Container from 'muicss/lib/react/container'
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import Button from 'muicss/lib/react/button';

//api
import WalmartAPI from '../api/walmart.api.js';

//internal components
import ImageSwitcher from '../components/ImageSwitcher';
import Image from '../components/Image';
import Header from '../components/Header';
import Recommendations from '../components/Recommendations';
import LoadingSpinner from '../components/LoadingSpinner';
import Divider from '../components/Divider';

class Details extends React.Component {
    constructor(props){
        super(props);

        this.fetchData = this.fetchData.bind(this);

        this.state = {
            itemDetails : {}, //detailed item info from WM.com
            isLoading : true, //loading spinner
            itemId : null //for passing down to child components
        }
    }

    componentDidMount(){
        //should pull fresh product data when component is loaded
        if(this.props.match.params.itemId){ //provided by react-router
            this.fetchData(this.props.match.params.itemId);
        }
    }

    componentDidUpdate(prevProps){
        //if new props are received, make sure we're not somehow looking at the same object
        if(prevProps.match.params.itemId !== this.props.match.params.itemId) {
            this.fetchData(prevProps.match.params.itemId);
        }
    }

    fetchData(itemId){
        this.setState({
            isLoading : true,
            itemId : itemId
        });

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
                <Container className="extra-margin">
                    <Row>
                        <Row>
                            <Col xs={10} sm={10} md={10} xs-offset={1} sm-offset={1} md-offset={1}>
                                <span className="mui--text-headline">{this.state.itemDetails.name}</span> by {this.state.itemDetails.brandName}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10} sm={10} md={10} xs-offset={1} sm-offset={1} md-offset={1}>
                                <Image inline src={this.state.itemDetails.customerRatingImage}/> {this.state.itemDetails.customerRating} <a>{this.state.itemDetails.numReviews} reviews</a>
                            </Col>
                        </Row>
                    </Row>
                    <Row className="extra-margin">
                        <Col xs={8} sm={8} md={4} lg={4} xl={4} xs-offset={2} sm-offset={2} md-offset={1} lg-offset={1} xl-offset={1} className="extra-margin">
                            <ImageSwitcher images={this.state.itemDetails.imageEntities}/>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={5} xl={5} lg-offset={1} xl-offset={1}>
                            <Row className="extra-margin">
                                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <div className="mui--text-subhead">${this.state.itemDetails.salePrice}</div>
                                    <div className="gray-text">(was ${this.state.itemDetails.msrp} )</div>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                    <Button color="primary">Add To Cart</Button>
                                </Col>
                            </Row>
                            <Row className="extra-margin">
                                <Divider/>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    {this.state.itemDetails.shortDescription}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <LoadingSpinner visible={this.state.isLoading}/>
                <Recommendations itemId={this.state.itemId}/>
            </div>
        );
    }
}

export default Details;