import React from 'react';
import styled from 'styled-components';
import CommentBlock from "./CommentBlock";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

@inject('store')
@observer
export default class Comments extends React.Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.props.refetch();
    }

    render() {

        if (this.props.product.comments.length === 0) {
            return (
                <Container>
                    <NoCommentsBlock>
                        <h2>Комментариев пока нет :(</h2>
                        {this.props.store.userStore.isLogged && <StyledLink to={'/addComment/' + this.props.product._id}>Добавить комментарий</StyledLink>}
                    </NoCommentsBlock>
                </Container>
            )
        }
        return (
            <Container>
                {this.props.store.userStore.isLogged && <StyledLink to={'/addComment/' + this.props.product._id}>Добавить комментарий</StyledLink>}
                {this.props.product.comments.map(elem => <CommentBlock elem={elem} refetch={this.props.refetch} key={elem._id}/>)}

            </Container>
        )

    }
}

const Container = styled.div`
    max-width: 100%;
    margin: 0;
    overflow-x: hidden;
    padding: 20px;
`;

const NoCommentsBlock = styled.div`
    margin: 0 auto;
    height: 250px;
    text-align: center; 
    padding-top: 40px;
    
    h2{
      font-size: 16pt;
    }
    p{
      font-size: 14pt;
    }
`;


const StyledLink = styled(Link)`
    display: block;
    background: white;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    height: 35px;
    font-size: 14pt;
    color: ${props => props.theme.primary};
    font-weight: bold;
    cursor: pointer;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    vertical-align: center; 
    line-height: 35px;
    border: 1px solid ${props => props.theme.primary};
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${props => props.theme.primary_light};   
         color: white;
    } 
    
`;