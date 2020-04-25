import React from 'react';

const ServiceTab = (props) => {
    let classes = props.index == props.selectedIndex ? 'filter-tab active':'filter-tab';
    return(
        <li className={classes} onClick={() => props.clicked(props.index)}>{props.title}</li>
    )
}

export default ServiceTab;