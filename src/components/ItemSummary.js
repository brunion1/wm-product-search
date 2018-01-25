import React from 'react';
import PropTypes from 'prop-types';

import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

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
                        {this.props.item.name}
                    </Row>
                    <Row>
                        <img src={this.props.item.customerRatingImage}/>{this.props.item.customerRating}
                    </Row>
                    <Row>
                        <img src={this.props.item.thumbnailImage}/>
                    </Row>
                    <Row>
                        {/*{item.shortDescription}*/}
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
