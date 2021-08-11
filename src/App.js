import React, { useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
} from "react-grid-drag";
import Planet from './Planet';

function App() {
    const [planetString, setPlanetString] = useState("");
    const [planets, setPlanets] = useStateWithCallbackLazy([]);
    const availablePlanets = ['earth', 'jupiter', 'mars', 'mercury', 'saturn', 'venus'];

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        const result = swap(planets, sourceIndex, targetIndex);
        setPlanets(result, () => {
            generateHtml();
        });
    }

    function onGenerate() {
        const planetNames = planetString.toLowerCase().replace(/\s/g, '').split(',');
        const planetArray = [];
        for (var i = 0; i < planetNames.length; i++) {
            if (availablePlanets.includes(planetNames[i])) { // Validation Check for planet's name
                planetArray.push(
                    {
                        id: i + 1,
                        name: planetNames[i]
                    }
                );
            }
            else {
                if (planetNames[i] === '') { //Check whether exist comma at the end of empty string.

                }
                else {

                }
            }
        }

        setPlanets(planetArray);
    }

    function generateHtml() {
        var result = '';
        for (var i = 0; i < planets.length; i++) {
            result += generateHtmlForSingleComponent(planets[i].name) + '\n';
        }

        console.log(result);
    }

    function generateHtmlForSingleComponent(planetName) {
        return '<div className="grid grid-cols-2 h-32 border border-gray-200 my-4">' + '\n' +
            '\t' + '<div className="relative full-width">' + '\n' +
            '\t\t' + '<img className="absolute top-0 left-0 w-full h-32 object-cover grid-item-content" src="/assets/img/' + planetName + '.jpeg" alt="" />' + '\n' +
            '\t' + '</div>' +
            '\t' + '<p className="text-3xl font-bold text-left p-10 full-width">' + planetName.charAt(0).toUpperCase() + planetName.slice(1) + '</p>' + '\n' +
            '</div>';
    }

    return (
        <div className="max-w-sm rounded">
            <input className="w-full border h-10 border-gray-200" onChange={(e) => setPlanetString(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onGenerate}>Generate</button>
            <GridContextProvider onChange={onChange}>
                <div className="container">
                    <GridDropZone
                        className="dropzone left"
                        id="left"
                        boxesPerRow={1}
                        rowHeight={150}
                        style={{ height: 150 * planets.length }}
                    >
                        {
                            planets.map((planet) => (
                                <GridItem key={planet.id}>
                                    <Planet planetName={planet.name} />
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
