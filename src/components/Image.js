import React from 'react';

import styled from 'styled-components';

const Image = styled.img`
    height:auto;
    margin-left: auto;
    margin-right: auto;
    max-width: ${props => props.fullwidth ? '100%' : ''};
`;

export default Image;