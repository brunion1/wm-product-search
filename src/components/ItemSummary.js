import React from 'react';
import PropTypes from 'prop-types';

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

        this.onItemClick = this.onItemClick.bind(this);
    }

    onItemClick(){
        this.props.onItemClick(this.props.item.itemId);
    }

    render(){
        return(
            <Panel onClick={this.onItemClick}>
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
            </Panel>
        )
    }
}


ItemSummary.propTypes = {
    item : PropTypes.object.isRequired,
    onItemClick : PropTypes.func.isRequired
};

export default ItemSummary;


/*
                    <Row className="mui--hidden-xs mui--hidden-sm">
                        {this.props.item.shortDescription}
                    </Row>

 */