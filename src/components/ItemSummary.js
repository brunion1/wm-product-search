import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// muicss components
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

// custom components
import Image from './Image';

import history from '../utils/history';

class ItemSummary extends React.Component {
    constructor(props){
        super(props);

        this.viewItem = this.viewItem.bind(this);
    }

    viewItem(){
        history.push('/details/' + this.props.item.itemId);
    }

    render(){
        return(
            <Panel onClick={this.viewItem} className="item">
                <Container>
                    <Row className="extra-margin item-name">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mui--text-subhead">
                            {this.props.item.name}
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Image src={this.props.item.customerRatingImage} inline/> ${this.props.item.salePrice}
                        </Col>
                    </Row>
                    <Row className="extra-margin">
                        <Image fullwidth src={this.props.item.mediumImage}/>
                    </Row>
                </Container>
            </Panel>
        )
    }
}

// min-height: 300px;
// .item-name{
//     height: 140px;
//     overflow: hidden;
// }
// `;

ItemSummary.propTypes = {
    item : PropTypes.object.isRequired
};

export default ItemSummary;