import React from 'react';

const Planet = (props) => {
    return (
        <div className="grid grid-cols-2 h-32 border border-gray-200 my-4">
            <div className="relative full-width">
                <img className="top-0 left-0 w-full h-32" draggable="false" src={require('../../../../assets/img/' + props.planetName + '.jpeg').default}  />
            </div>
            <p className="text-3xl font-bold text-left p-10 full-width">{props.planetName.charAt(0).toUpperCase() + props.planetName.slice(1)}</p>
        </div>
    );
}

export default Planet;
