import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import shallow from 'enzyme';

describe('<Search>', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    // it('calls the Walmart API when it the search handler is invoked', () => {
    //     const searchWrapper = shallow(<Search/>);
    //     searchWrapper.instance().search();
    //     expect(WalmartAPI.search).toHaveBeenCalled();
    // });

});
