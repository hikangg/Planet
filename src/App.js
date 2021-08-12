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
    const [html, setHtml] = useState('');
    const availablePlanets = ['earth', 'jupiter', 'mars', 'mercury', 'saturn', 'venus'];
    const snackbar = useSnackbar();

    React.useEffect(() => {
        generateHtml();
      }, [planets]);

    function onChangeOrder(sourceId, sourceIndex, targetIndex, targetId) {
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
        if(planets.length) {
            var htmlContent = '<html>' + 
            '<head>' + 
                '<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">' +
            '</head>' + 
            '<body>' + 
                '<div class="w-full flex py-2 px-2 justify-center">' + 
                    '<div class="max-w-md w-1/2">' +
                    html +
                    '</div>' + 
                '</div>' +
            '</body>' + 
            '</html>';

            const element = document.createElement("a");
            const file = new Blob([htmlContent], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "export-"+ (new Date()) +".html";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
        else {
            snackbar.showMessage('No planet exist.');
        }
        
    }

    function onReset() {
        setPlanetString('');
        setPlanets([]);
    }

    function generateHtml() {
        var result = '';
        for (var i = 0; i < planets.length; i++) {
            result += generateHtmlForSingleComponent(planets[i].name) + '\n';
        }

        setHtml(result);
    }

    function generateHtmlForSingleComponent(planetName) {
        return '<div class="grid grid-cols-2 h-32 border border-gray-200 my-4">' + '\n' +
            '\t' + '<div class="relative full-width">' + '\n' +
            '\t\t' + '<img class="absolute top-0 left-0 w-full h-32 object-cover grid-item-content" src="https://transfers.new.italeastcorp.com/static/media/' + planetName + '.jpeg" alt="" />' + '\n' +
            '\t' + '</div>' +
            '\t' + '<p class="text-3xl font-bold text-left p-10 full-width">' + planetName.charAt(0).toUpperCase() + planetName.slice(1) + '</p>' + '\n' +
            '</div>';
    }

    function handleKeyDown(event) {
        if(event.key === 'Enter') {
            onGenerate();
        }
    }

    return (
        <div className="w-full flex py-2 px-2 justify-center">
            <div className="max-w-md w-1/2">
                <div className="w-full py-2 px-2">
                    <input className="w-full border h-10 border-gray-200 py-2 px-2" onChange={(e) => setPlanetString(e.target.value)} onKeyDown={handleKeyDown} value={planetString}/>
                </div>
                <div className="w-full flex py-2 px-2">
                    <div className="w-1/3 text-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex-6 py-2 px-4 rounded" onClick={onGenerate}>Generate</button>
                    </div>
                    <div className="w-1/3 text-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex-6 py-2 px-4 rounded" onClick={onDownload}>Download</button>
                    </div>
                    <div className="w-1/3 text-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex-6 py-2 px-4 rounded" onClick={onReset}>Reset</button>
                    </div>
                </div>
                <GridContextProvider onChange={onChangeOrder}>
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
        </div>
    );
}

export default App;
