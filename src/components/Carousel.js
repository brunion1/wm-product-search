import React from 'react';

import styled from 'styled-components';

const Carousel = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    > div {
      max-width:40%;
      margin: 3%;
      flex: 0 0 auto;
    }
`;

export default Carousel;