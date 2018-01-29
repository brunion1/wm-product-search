import React from 'react';

//third party components
import Container from 'muicss/lib/react/container'
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import Button from 'muicss/lib/react/button';

//api
import WalmartAPI from '../../api/walmart.api.js';

//internal components
import ImageSwitcher from '../../components/ImageSwitcher';
import Image from '../../components/Image';
import Header from '../../components/Header';
import Recommendations from '../../components/Recommendations';
import LoadingSpinner from '../../components/LoadingSpinner';

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
        if(this.props.match.params.itemId){
            this.fetchData(this.props.match.params.itemId);
        }
    }

    componentWillReceiveProps(nextProps){
        //if new props are received, make sure we're not somehow looking at the same object
        if(nextProps.match.params.itemId !== this.props.match.params.itemId) {
            this.fetchData(nextProps.match.params.itemId);
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
                <Container>
                    <Row>
                        <Row><div className="mui--text-headline">{this.state.itemDetails.name}</div></Row>
                        <Row>by {this.state.itemDetails.brandName}</Row>
                        <Row><Image src={this.state.itemDetails.customerRatingImage}/> {this.state.itemDetails.customerRating} {this.state.itemDetails.numReviews} reviews</Row>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                            <ImageSwitcher images={this.state.itemDetails.imageEntities}/>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                            <Row>
                                <Col xs={12} sm={12} md={4} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                                    {this.state.itemDetails.salePrice}<br/>
                                    {this.state.itemDetails.msrp}
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={4} xl={4} lg-offset={1} xl-offset={1}>
                                    <Button color="primary">Add To Cart</Button>
                                </Col>
                            </Row>
                            <Row>
                                {this.state.itemDetails.shortDescription}
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