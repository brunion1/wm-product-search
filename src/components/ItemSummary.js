import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// muicss components
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

// custom components
import Image from './Image';

class ItemSummary extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
                <Panel>
                    <Link to={'/details/'+ this.props.item.itemId}>
                        <Container>
                            <Row>
                                <div>{this.props.item.name}</div>
                            </Row>
                            <Row>
                                <Image src={this.props.item.customerRatingImage}/>${this.props.item.salePrice}
                            </Row>
                            <Row>
                                <Image fullwidth src={this.props.item.mediumImage}/>
                            </Row>
                        </Container>
                    </Link>
                </Panel>
        )
    }
}


ItemSummary.propTypes = {
    item : PropTypes.object.isRequired
};

export default ItemSummary;


/*
                    <Row className="mui--hidden-xs mui--hidden-sm">
                        {this.props.item.shortDescription}
                    </Row>

 */