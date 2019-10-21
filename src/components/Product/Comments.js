import React from 'react';
import styled from 'styled-components';
import CommentBlock from "./CommentBlock";

export default class Comments extends React.Component {

    render() {

        if (this.props.product.comments.length === 0) {
            return (
                <Container>
                    <NoCommentsBlock>
                        <h2>Комментариев пока нет :(</h2>
                    </NoCommentsBlock>
                </Container>
            )
        }
        return (
            <Container>
                {this.props.product.comments.map(elem => <CommentBlock elem={elem} refetch={this.props.refetch} key={elem._id}/>)}

            </Container>
        )

    }
}

const Container = styled.div`
    width: 90%;
    margin: 10px auto;
    overflow-x: hidden;
`;

const NoCommentsBlock = styled.div`
    margin: 0 auto;
    width: 100vw;
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

