import React from 'react';

import styled from 'styled-components';

const Image = styled.img`
    height:auto;
    width: ${props => props.fullwidth ? '100%' : ''};
`;

export default Image;