import React from 'react';
import Driver from './Driver';

function Search(props) {
    return ( 
        <select className='input' onChange={props.onChange}>
            {
                props.drivers.map(item => 
                    <Driver 
                        key={item.id}
                        id={item.id}
                        name={item.first_name + " " + item.last_name}
                    />
                )
            }
        </select>
     );
}

export default Search;