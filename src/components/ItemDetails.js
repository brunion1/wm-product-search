import PropTypes from 'prop-types';

//third party components
import Container from 'muicss/lib/react/container'
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import Button from 'muicss/lib/react/button';

//custom components
import ImageSwitcher from '../components/ImageSwitcher';
import Image from '../components/Image';
import Divider from '../components/Divider';

const ItemDetails = props => {
    return (<Container className="extra-margin">
        <Row>
            <Row>
                <Col xs={10} sm={10} md={10} xs-offset={1} sm-offset={1} md-offset={1}>
                    <span className="mui--text-headline">{props.name}</span> by {props.brandName}
                </Col>
            </Row>
            <Row>
                <Col xs={10} sm={10} md={10} xs-offset={1} sm-offset={1} md-offset={1}>
                    <Image inline src={props.customerRatingImage}/> {props.customerRating} <a>{props.numReviews} reviews</a>
                </Col>
            </Row>
        </Row>
        <Row className="extra-margin">
            <Col xs={8} sm={8} md={4} lg={4} xl={4} xs-offset={2} sm-offset={2} md-offset={1} lg-offset={1} xl-offset={1} className="extra-margin">
                <ImageSwitcher images={props.imageEntities}/>
            </Col>
            <Col xs={12} sm={12} md={6} lg={5} xl={5} lg-offset={1} xl-offset={1}>
                <Row className="extra-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className="mui--text-subhead">${props.salePrice}</div>
                        <div className="gray-text">(was ${props.msrp} )</div>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <Button color="primary">Add To Cart</Button>
                    </Col>
                </Row>
                <Row className="extra-margin">
                    <Divider/>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        {props.shortDescription}
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>)
};

ItemDetails.propTypes = {
    imageEntities : PropTypes.array,
    salePrice : PropTypes.number,
    msrp : PropTypes.number,
    shortDescription : PropTypes.shortDescription,
    customerRatingImage: PropTypes.string,
    customerRating : PropTypes.string,
    numReviews : PropTypes.number,
    name : PropTypes.string,
    brandName : PropTypes.string
};

export default ItemDetails;

