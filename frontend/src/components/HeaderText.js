import React from 'react';
import styled from "styled-components/macro";

const HeaderText = (props) => {
    return (
        <Text padding={props.padding}>
            {props.text}
        </Text>
    );
};

const Text = styled.div`
  padding: ${props => props.padding || '3px 0px 10px 9px'}; ;
 
  margin: 0 0 0.35em;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.0075em;
`;

export default HeaderText;