import React from 'react';

//api
import WalmartAPI from '../api/walmart.api.js';

//custom components
import Header from '../components/Header';
import Recommendations from '../components/Recommendations';
import LoadingSpinner from '../components/LoadingSpinner';
import ItemDetails from '../components/ItemDetails';

class Item extends React.Component {
    constructor(props){
        super(props);

        this.fetchData = this.fetchData.bind(this);

        this.state = {
            itemDetails : {}, //detailed item info from WM.com
            isLoading : true //loading spinner
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
            isLoading : true
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
                <LoadingSpinner visible={this.state.isLoading}/>
                <ItemDetails
                    imageEntities={this.state.itemDetails.imageEntities}
                    salePrice={this.state.itemDetails.salePrice}
                    msrp={this.state.itemDetails.msrp}
                    shortDescription={this.state.itemDetails.shortDescription}
                    customerRatingImage={this.state.itemDetails.customerRatingImage}
                    customerRating={this.state.itemDetails.customerRating}
                    numReviews={this.state.itemDetails.numReviews}
                    name={this.state.itemDetails.name}
                    brandName={this.state.itemDetails.brandName}/>
                <Recommendations itemId={this.state.itemDetails.itemId}/>
            </div>
        );
    }
}

export default Item;