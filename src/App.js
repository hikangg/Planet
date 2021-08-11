import React, { useState } from 'react';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
    move
} from "react-grid-dnd";
import Planet from './Planet';

function App() {
    const [planetString, setPlanetString] = useState("");
    const [planets, setPlanets] = useState([]);

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        console.log(sourceId);
        console.log(targetId);
        console.log(sourceIndex);
        console.log(targetIndex);
        const result = swap(planets, sourceIndex, targetIndex);
        return setPlanets(result);
    }

    function onGenerate() {
        const planetNames = planetString.toLowerCase().replace(/\s/g, '').split(',');
        const planetArray = [];
        for (var i = 0; i < planetNames.length; i++) {
            planetArray.push(
                {
                    id: i + 1,
                    name: planetNames[i]
                }
            );
        }

        setPlanets(planetArray);
    }

    return (
        <div className="max-w-sm rounded">
            <input className="w-full border h-10 border-gray-200" onChange={(e) => setPlanetString(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onGenerate}>Generate</button>
            <GridContextProvider onChange={onChange} className="overflow-auto">
                <div className="container">
                    <GridDropZone
                        className="dropzone left"
                        id="left"
                        boxesPerRow={1}
                        rowHeight={150}
                    >
                        {
                            planets.map((planet) => (
                                <GridItem key={planet.name}>
                                    <Planet planetName={planet.name} className="grid-item" />
                                </GridItem>
                            ))
                        }
                    </GridDropZone>
                </div>
            </GridContextProvider>
        </div>
    );
}

export default App;
