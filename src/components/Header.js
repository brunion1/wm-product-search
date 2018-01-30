//core react stuff
import React, { Component } from 'react';

//history util
import history from '../utils/history';

//muicss components
import Form from 'muicss/lib/react/form';
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import Input from 'muicss/lib/react/input';

//custom components
import Image from './Image';

//assets
import logo from '../images/walmart.png';

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
        history.push("/search/" + this.state.searchString);
    }

    onChange(event){
        this.setState({searchString: event.target.value});
    }

    render() {
        return (
            <div className={this.props.className}>
                <Row className="extra-margin">
                    <Col xs={8} sm={8} md={3} lg={3} xs-offset={2} sm-offset={1}>
                        <Image src={logo} fullwidth inline/>
                    </Col>
                    <Col xs={10} sm={10} md={4} lg={4} xs-offset={1} sm-offset={1} md-offset={3} lg-offset={3}>
                        <Form onSubmit={this.onSubmit}>
                            <Input placeholder="Search for a product..."
                                   onChange={this.onChange}
                                   value={this.state.searchString}/>
                        </Form>
                    </Col>
                </Row>
             </div>
        );
    }
}

export default Header;