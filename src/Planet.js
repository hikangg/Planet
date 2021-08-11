import React from 'react';

const Planet = (props) => {
  return (
    <div class="grid grid-cols-2 h-32 border border-gray-200 my-4">
        <div class="relative">
            <img class="absolute top-0 left-0 w-full h-32 object-cover" src={require('./assets/img/' + props.planetName + '.jpeg').default} alt=""/>
        </div>
        <p class="text-3xl font-bold text-left p-10">{props.planetName.charAt(0).toUpperCase() + props.planetName.slice(1)}</p>
    </div>
  );
}

export default Planet;
