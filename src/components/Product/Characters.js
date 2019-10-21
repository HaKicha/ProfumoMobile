import React from 'react';
import styled from 'styled-components';

export default function Characters(props) {
    let simplifiedData = props.product.properties.reduce((acc, el) => {
        if (typeof acc[el.property_name] === 'undefined')
            acc[el.property_name] = el.property_val;
        else acc[el.property_name] += ', ' + el.property_val;
        return acc;
    }, {});
    return (
        <Table>
            <tbody>
            {Array.from(Object.keys(simplifiedData)).map(elem => {
                return (
                    <tr key={elem}>
                        <td><b>{elem}:</b></td>
                        <td>{simplifiedData[elem]}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}

const Table = styled.table`
    padding: 10px;
    width: 100%;
    
    tbody {
        display: block;
        font-size: 12pt;
        
        td {
          padding-right: 10px;
        }
    }
    
    `;