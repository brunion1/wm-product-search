import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon'
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ItemSummary from './ItemSummary';
import Image from './Image';
const viewItem = sinon.spy(ItemSummary.prototype, 'viewItem');

const itemDetails = {
    name : "test-name",
    customerRatingImage : "test-image-name",
    mediumImage : "test-medium-image",
    salePrice : "1.00"
};

describe('<ItemSummary>', () => {
    it('renders without crashing', () => {
        var div = document.createElement('div');
        ReactDOM.render( <ItemSummary item={itemDetails}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should pass the item details object as a prop', () => {
        const wrapper = mount(<ItemSummary item={itemDetails}/>);
        expect(wrapper.props().item).toEqual(itemDetails);
    });

    it('should display the name of the item from props', () => {
        const wrapper = mount(<ItemSummary item={itemDetails}/>);
        expect(wrapper.text()).toContain(itemDetails.name);
    });

    it('should display the sale price of the item from props', () => {
        const wrapper = mount(<ItemSummary item={itemDetails}/>);
        expect(wrapper.text()).toContain(itemDetails.salePrice);
    });

    it('should render two images', () => {
        const wrapper = mount(<ItemSummary item={itemDetails}/>);
        expect(wrapper
            .find(Image).length
            ).toEqual(2);
    });

    it('should invoke viewItem() when clicked', () => {
        const wrapper = mount(<ItemSummary item={itemDetails}/>);
        expect(viewItem.calledOnce).toEqual(false);
        wrapper.simulate('click');
        expect(viewItem.calledOnce).toEqual(true);
    });
});
