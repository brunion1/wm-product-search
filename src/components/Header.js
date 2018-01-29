import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from 'muicss/lib/react/form';
import Container from 'muicss/lib/react/container'
import Appbar from 'muicss/lib/react/appbar';
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import Input from 'muicss/lib/react/input';

class Header extends Component {
    constructor(props){
        super(props);

        //binding class methods at the top, for readability
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // keeping initial state simple
        this.state = {
            searchString : ""
        }
    }

    onSubmit(event){
        event.preventDefault();  // prevent form submission
        this.props.onSearch(this.state.searchString);
    }

    onChange(event){
        this.setState({searchString: event.target.value});
    }

    render() {
        return (
            <Appbar>
                <Container>
                        {this.props.searchMode ?
                            <Row>
                                <Col xs={10} sm={10} md={6} lg={6} xs-offset={1} sm-offset={1} md-offset={3} lg-offset={3}>
                                    <Form onSubmit={this.onSubmit}>
                                        <Input placeholder="Search for a product..."
                                               onChange={this.onChange}
                                               value={this.state.searchString}/>
                                    </Form>
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <Link to={"/"}>Back</Link>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <div>{this.props.headerText}</div>
                                </Col>
                            </Row>
                            }
                </Container>
            </Appbar>
        );
    }
}

Header.propTypes = {
    onSearch : PropTypes.func,
    headerText : PropTypes.string,
    searchMode : PropTypes.bool
};

export default Header;