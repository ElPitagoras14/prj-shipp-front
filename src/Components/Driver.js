import React from 'react';

function Driver(props) {
    return ( 
        <option value={props.id}>{props.name}</option>
     );
}

export default Driver;