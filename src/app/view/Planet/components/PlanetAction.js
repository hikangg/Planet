import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSnackbar } from 'material-ui-snackbar-provider';

function PlanetAction(props) {
    const [availablePlanets, setAvailablePlanets] = useState([]);
    const snackbar = useSnackbar();

    useEffect(() => {
        // Fetch available planets.
        axios.get("/api/planet/all").then(response => {
            const planetArray = response.data.map((item) => {
                return item.name;
            });
            setAvailablePlanets(planetArray);
        });
    }, []);

    // Generate Planet list from input box with planet name validation.
    function onGenerate() {
        const planetNames = props.state.planetString.toLowerCase().replace(/\s/g, '').split(',');
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
                    snackbar.showMessage('We noticed you input the invalid planet name. ' +
                        'It was skipped. ' +
                        'Position: ' + (i + 1) + ', ' +
                        'Name: ' + planetNames[i]);
                }
            }
        }

        props.setState({
            ...props.state,
            planets: planetArray
        });
    }

    // Download html content for planet list.
    function onDownload() {
        if (props.state.planets.length) {
            var htmlContent = '<html>' +
                '<head>' +
                '<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">' +
                '</head>' +
                '<body>' +
                '<div class="w-full flex py-2 px-2 justify-center">' +
                '<div class="max-w-md w-1/2">' +
                props.state.html +
                '</div>' +
                '</div>' +
                '</body>' +
                '</html>';

            const element = document.createElement("a");
            const file = new Blob([htmlContent], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = "export-" + (new Date()) + ".html";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
        else {
            snackbar.showMessage('No planet exist.');
        }

    }

    // Reset planet list.
    function onReset() {
        props.setState({
            ...props.state,
            planets: [],
            planetString: ''
        });
    }

    // Generate action happened after `enter` key down.
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            onGenerate();
        }
    }

    return (
        <React.Fragment>
            <div className="w-full py-2 px-2">
                <input className="w-full border h-10 border-gray-200 py-2 px-2" onChange={(e) => props.setState({ ...props.state, planetString: e.target.value })} onKeyDown={handleKeyDown} value={props.state.planetString} />
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
        </React.Fragment>
    );
}

export default PlanetAction;
