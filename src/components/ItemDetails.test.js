import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon'
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ItemDetails from './ItemDetails';

const itemDetails = {
    imageEntities : [],
    salePrice : 1.00,
    msrp : 2.00,
    shortDescription : "test description",
    customerRatingImage: "test-image",
    customerRating : "4.34",
    numReviews : 33,
    name : "Toaster",
    brandName : "Maytag"
};

describe('<ItemDetails>', () => {
    it('renders without crashing', () => {
        var div = document.createElement('div');
        ReactDOM.render( <ItemDetails {...itemDetails} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should show the item name', () => {
        const wrapper = mount(<ItemDetails {...itemDetails}/>);
        expect(wrapper.text()).toContain(itemDetails.name);
    });

    it('should show the customer rating', () => {
        const wrapper = mount(<ItemDetails {...itemDetails}/>);
        expect(wrapper.text()).toContain(itemDetails.customerRating);
    });

    it('should show the number of reviews', () => {
        const wrapper = mount(<ItemDetails {...itemDetails}/>);
        expect(wrapper.text()).toContain(itemDetails.numReviews);
    });

    it('shold show the brand name', () => {
        const wrapper = mount(<ItemDetails {...itemDetails}/>);
        expect(wrapper.text()).toContain(itemDetails.brandName);
    });

});
