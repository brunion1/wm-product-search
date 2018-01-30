import React from 'react';
import PropTypes from 'prop-types';

// muicss components
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

// custom components
import Image from './Image';

/*
    Component that allows the user to toggle between four images.
 */

class ImageSwitcher extends React.Component {
    constructor(props){
        super(props);

        this.viewImage = this.viewImage.bind(this);
        this.filterImages = this.filterImages.bind(this);

        this.state = {
            activeImage : {}, //big image
            images : []
        };
    }

    componentWillReceiveProps(nextProps){
        this.filterImages(nextProps);
    }

    filterImages(nextProps){
        /*
            Build a "more" option and allowing users to select between 10+ images is a bit out of scope.
            This pulls the first four images, then pushes the Primary image first.
         */

        if(nextProps.images.length > 0){
            let primary = nextProps.images.filter( image => {
                return image.entityType === "PRIMARY";
            })[0];

            let images = [];

            //keep it, we'll want to show it
            images.push(primary);

            //pull 3 secondary images from the stack
            for(var image of nextProps.images){
                if(image !== primary){
                    images.push(image);
                }
                if(images.length === 4){
                    break;
                }
            }

            // set the active image
            this.setState({
                images : images,
                activeImage: images[0]
            });
        }
    }

    viewImage(image){
        this.setState({
            activeImage : image
        });
    }

    render(){
        return(
            <Container>
                <Row>
                    <Image fullwidth src={this.state.activeImage.largeImage}/>
                </Row>
                <Row className="extra-margin">
                    {this.state.images.map((image, index)=> {
                        return (
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} key={index}>
                                <Image src={image.thumbnailImage} onClick={()=>{this.viewImage(image)}}/>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        )
    }
}


ImageSwitcher.propTypes = {
    images : PropTypes.array
};

ImageSwitcher.defaultProps = {
    images : []
};


export default ImageSwitcher;
