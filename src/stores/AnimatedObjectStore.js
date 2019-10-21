import styled, {keyframes} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export {
    AnimatedIcon,
    AnimatedCheckBlock,
    AnimatedButton,
    AnimatedRadioButton
}

const AnimatedIcon = styled(FontAwesomeIcon)`
    color: ${props => props.color || 'white'};
    align-self: center;
    justify-self: center;
    height: ${props => props.height||'30px'};
    min-width: ${props => props.width||'30px'};
    padding: ${props => props.padding||'7px'};;
    transition: all ${props => props.duration || '.5s'};
    border-radius: 50%;
    background-position: center;

    &:active {
        color: ${props => props.clickedColor || 'white'};
        background-color:  ${props => props.bgcolor||'rgba(10,10,10,0.5)'};
        background-size: 150%;
        transition: background 0s;
    }
    ${props => props.otherstyle}
`;

const AnimatedButton = styled.button`
    color: ${props => props.color ||'#fff'};
    height: ${props => props.height ||'20px'};
    width: ${props => props.width ||'50px'};
    max-width: ${props => props.maxWidth ||'100%'};
    padding: ${props => props.padding ||'7px'};
    border: none;
    border-radius: ${props => props.borderRadius ||'5px'};
    transition: all .8s;
    background-position: center;
    outline: none;
    font-weight: normal;
    background: ${props => props.background || '#e36f64'};
    box-shadow: ${props => props.boxShadow || 'none'};
    font-size: ${props => props.fontSize || '12pt'};
    ${props => props.otherStyles}
    &:active {
        background-color:  ${props => props.bgcolor ||'rgba(10,10,10,0.5)'};
        background-size: 100%;
        transition: background 0s;
    }
    ${props => props.otherStyle}
`;


//required props Color, LabelColor
//default using construction
//<AnimatedCheckBlock>
//     <input type="checkbox"/>
//     <span>SomeText</span>
// </AnimatedCheckBlock>

const AnimatedCheckBlock = styled.label`


    z-index: 0;
    position: relative;
    display: inline-block;
    color: ${props => props.LabelColor||'#333'};;
    line-height: 1.5;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;


/* Input */
input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    z-index: -1;
    position: absolute;
    left: -10px;
    top: -8px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: gray;
    box-shadow: none;
    outline: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.3s;
}

/* Span */
span {
    display: inline-block;
    width: 100%;
    cursor: pointer;
}

/* Box */
span::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin: 3px 11px 3px 1px;
    border: solid 2px; /* Safari */
    border-color: rgba( 0, 0, 0, 0.6);
    border-radius: 2px;
    width: 18px;
    height: 18px;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
}

/* Checkmark */
span::after {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: 1px;
    width: 10px;
    height: 5px;
    border: solid 2px transparent;
    border-right: none;
    border-top: none;
    transform: translate(3px, 4px) rotate(-45deg);
}

/* Checked, Indeterminate */
input:checked,
input:indeterminate {
    background-color: ${props => props.Color||'#2194f3'};
}

input:checked + span::before,
input:indeterminate + span::before {
    border-color: ${props => props.Color||'#2194f3'};
    background-color: ${props => props.Color||'#2194f3'};
}

input:checked + span::after,
input:indeterminate + span::after {
    border-color: rgb(255, 255, 255);
}

input:indeterminate + span::after {
    border-left: none;
    transform: translate(4px, 3px);
}

/* Hover, Focus */
.pure-material-checkbox:hover > input {
    opacity: 0;
}

input:focus {
    opacity: 0;
}

.pure-material-checkbox:hover > input:focus {
    opacity: 0;
}

/* Active */
input:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
}

input:active + span::before {
    border-color: ${props => props.Color||'#2194f3'};
}

input:checked:active + span::before {
    border-color: transparent;
    background-color: rgba( 0, 0, 0, 0.6);
}

/* Disabled */
input:disabled {
    opacity: 0;
}

input:disabled + span {
    color: rgba(0, 0, 0, 0.38);
    cursor: initial;
}

input:disabled + span::before {
    border-color: currentColor;
}

input:checked:disabled + span::before,
input:indeterminate:disabled + span::before {
    border-color: transparent;
    background-color: currentColor;
}

input:checked + span {
  color: black;
}
`;

//<AnimatedRadioButton>
//  <input type="radio" name="g"/>
//  <span>Option 1</span>
//</AnimatedRadioButton>


const Ripple = keyframes`
  0% {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.0);
  }
  50% { 
    box-shadow: 0 0 0 15px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);
  }
`

const AnimatedRadioButton = styled.label`

    margin: ${props => props.margin || '16px 0'};
    padding: ${props => props.padding ||'7px'};
    input[type="radio"] {
        display: none;
        &:checked + span:before {
            border-color: ${props => props.Color || '#e36f64'};
            animation: ${Ripple} 0.2s linear forwards;   
        }
        &:checked + span:after {
            transform: scale(1);
        }
    }
    
    span {
        display: block;
        height: 20px;
        position: relative;
        padding: 0 30px;
        margin-bottom: 0;
        cursor: pointer;
        vertical-align: bottom;
        line-height: 24px;
        &:before, &:after {
            position: absolute;            
            content: '';  
            border-radius: 50%;
            transition: all .3s ease;
            transition-property: transform, border-color;
        }
        &:before {
            left: 0;
            top: 0;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(0, 0, 0, 0.54);
        }
        &:after {
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            transform: scale(0);
            background: ${props => props.Color || '#e36f64'};
            border: 2px solid ${props => props.Color || '#e36f64'};
        }
    }


`;