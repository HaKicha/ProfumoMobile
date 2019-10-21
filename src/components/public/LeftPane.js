import React from 'react';
import styled from 'styled-components';

export function LeftPane(props) {
    return(
        <Container open={props.open}>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    z-index: 10;
    display: grid;
    position: fixed;
    top: 150px;
    left: ${props => props.open?'0':'-100vw'};
    width: 100vw;
    height: calc(100vh - 100px);  
    background: white;
    transition: left .7s cubic-bezier(.02, -0.01, 0, .97);
    overflow-y: scroll;
`;