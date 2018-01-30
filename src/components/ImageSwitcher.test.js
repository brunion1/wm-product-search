import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon'
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ImageSwitcher from './ImageSwitcher';
import Image from './Image';
const filterSpy = sinon.spy(ImageSwitcher.prototype, 'filterImages');

const images =[
    {
        entityType : "PRIMARY",
        thumbnailImage : "test"
    },
    {
        entityType : "SECONDARY",
        thumbnailImage : "test"
    },
    {
        entityType : "SECONDARY",
        thumbnailImage : "test"
    },
    {
        entityType : "SECONDARY",
        thumbnailImage : "test"
    },
    {
        entityType : "SECONDARY",
        thumbnailImage : "test"
    },
];


describe('<ImageSwicher>', () => {
    beforeEach(() => {
        filterSpy.reset();
    });

    it('renders without crashing', () => {
        var div = document.createElement('div');
        ReactDOM.render( <ImageSwitcher images={images}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should call filterImages() after the component mounts ', () => {
        const wrapper = shallow(<ImageSwitcher images={images} />);
        wrapper.setProps(images);
        expect(filterSpy.calledOnce).toEqual(true);
    });

    it('should automatically set the primary image as the active image ', () => {
        const wrapper = shallow(<ImageSwitcher images={images} />);
        wrapper.setProps(images);
        let primary = images[0];
        expect(wrapper.state().activeImage).toEqual(primary);
    });

    it('should only retrieve four images from the stack', () => {
        const wrapper = shallow(<ImageSwitcher images={images} />);
        wrapper.setProps(images);
        expect(wrapper.state().images.length).toEqual(4);
    });

});
