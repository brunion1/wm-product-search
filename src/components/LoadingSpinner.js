import React from 'react';

import svg from '../images/spinner.svg';
import styled from 'styled-components';

const LoadingSpinner = (props) => {
    if(props.visible === true){
        return <img className={props.className} src={svg} alt="Loading..."/>
    }
    else{
        return null;
    }
};

export default styled(LoadingSpinner)`
    display:block;
    margin:auto;
    margin-top: 10%;
    @media only screen and (max-width : 480px) {
        width:25%;
    }
`;