import React from 'react';
import styled from 'styled-components';
import StarRatings from "react-star-ratings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
// import {deleteComment} from "../../api/Comments";
import {inject} from "mobx-react";
import male from '../../resources/image/genderIcons/male.svg';
import female from '../../resources/image/genderIcons/female.svg';
import {theme} from "../../stores/StyleStore";
import {AnimatedIcon} from "../../stores/AnimatedObjectStore";

@inject('store')
export default class CommentBlock extends React.Component {

    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler = () => {
        //deleteComment(this.props.elem._id);
        this.props.refetch();
    }

    render() {
        // let user = this.props.store.userStore.User();
        return(
            <Container>
                <Image src={/*this.props.elem.owner.gender*/'male' === 'male'?male:female}/>
                <Comment>
                    <Username>{this.props.elem.owner.name} {this.props.elem.owner.surname}</Username>
                    <StarRatings
                        rating={this.props.elem.rate}
                        starRatedColor={"black"}
                        starEmptyColor={'gray'}
                        numberOfStars={5}
                        name='rating'
                        starDimension={'10px'}
                        starSpacing={'0px'}
                    />
                    <Verified>{this.props.elem.verified?<span>&#10004;</span>:''}</Verified>
                    {/*this.props.elem.owner._id === user._id?*/<CloseIcon
                        icon={faTimes}
                        size={'sm'}
                        key={this.props.elem._id}
                        height={'15px'}
                        width={'15px'}
                        padding={'4px'}
                        color={'black'}
                        onClick={this.clickHandler}/>/*:''*/}
                    <Content>{this.props.elem.text}</Content>
                </Comment>
                {this.props.elem.response ===''?'':
                    <Response>
                        <Image src={/*this.props.elem.owner.gender*/'male' === 'male'?female:male}/>
                        <ResponseBody>
                            <span>Profumo</span>
                            <Content>{this.props.elem.response}</Content>
                        </ResponseBody>
                    </Response>
                }
            </Container>
        )
    }
}

const Container = styled.div`
    display: grid;
    margin-top: 30px;
    min-height: 50px;
    grid-template-columns: 50px 1fr;
`;

const Comment = styled.div`
    background: #dddddd;
    position: relative;
    padding: 10px;
    border-radius: 10px;
    margin-left: 25px;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 15px solid transparent;
        border-right-color: #dddddd;
        border-left: 0;
        margin-top: -15px;
        margin-left: -15px;
    }

`;

const Response = styled.div`
    display: grid;
    grid-column: 1/3;
    grid-template-columns: 50px 1fr;
    width: calc(100% - 50px);
    margin-left: 50px;
`;

const ResponseBody = styled.div`
    margin-top: 10px;
    background: #eeeeee;
    position: relative;
    padding: 10px;
    margin-left: 25px;
    border-radius: 10px;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 15px solid transparent;
        border-right-color: #eeeeee;
        border-left: 0;
        margin-top: -15px;
        margin-left: -15px;
    }
`;

const Username = styled.span`
    font-size: 12pt;
    margin-right: 10px;
    width: calc(100% - 120px);
`;

const Verified = styled.span`
    color: #2bac2b;
    font-size: 14pt;
    margin-left: 10px;
    font-weight: bold;
`;

const Image = styled.img`
    height: 40px;
    width: 40px;
    padding: 3px;
    margin: auto 2px;
    border: #cccccc 2px solid;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #cccccc;
    
`;

const CloseIcon = styled(AnimatedIcon)`
    float: right;  
`;

const Content = styled.p`
    font-size: 12pt;
    margin: 2px 0;
    padding: 0;
`;