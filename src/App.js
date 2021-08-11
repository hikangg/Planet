import React, { useState } from 'react';
import { useSnackbar } from 'material-ui-snackbar-provider';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
} from "react-grid-drag";
import Planet from './Planet';

function App() {
    const [planetString, setPlanetString] = useState("");
    const [planets, setPlanets] = useState([]);
    const availablePlanets = ['earth', 'jupiter', 'mars', 'mercury', 'saturn', 'venus'];
    const snackbar = useSnackbar();

    React.useEffect(() => {
        generateHtml();
      }, [planets]);

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        const result = swap(planets, sourceIndex, targetIndex);
        setPlanets(result);
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
                if (planetNames[i] !== '') { //Check whether exist comma at the end of empty string.
                    snackbar.showMessage('We noticed you input the invalied planet name. ' +
                        'It was skipped. ' +
                        'Position: ' + (i + 1) + ', ' + 
                        'Name: ' + planetNames[i]);
                }
            }
        }

        setPlanets(planetArray);
    }

    function onDownload() {
        
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
            <div className="w-full py-2 px-2">
                <input className="w-full border h-10 border-gray-200" onChange={(e) => setPlanetString(e.target.value)} />
            </div>
            <div className="w-full flex py-2 px-2">
                <div className="w-1/2 text-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex-6 py-2 px-4 rounded" onClick={onGenerate}>Generate</button>
                </div>
                <div className="w-1/2 text-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex-6 py-2 px-4 rounded" onClick={onDownload}>Download</button>
                </div>
            </div>
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
