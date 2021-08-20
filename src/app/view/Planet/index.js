import React, { useState, useEffect } from 'react';
import PlanetAction from './components/PlanetAction';
import PlanetList from './components/PlanetList';

function PlanetHome() {
    const [state, setState] = useState({
        planets: [],
        planetString: "",
        html: ""
    });

    // Regenerate html content after `planets` changed.
    useEffect(() => {
        generateHtml();
    }, [state.planets]);

    // Generate html content with planet list.
    function generateHtml() {
        var result = '';
        for (var i = 0; i < state.planets.length; i++) {
            result += generateHtmlForSingleComponent(state.planets[i].name) + '\n';
        }

        setState({
            ...state,
            html: result
        });
    }

    function generateHtmlForSingleComponent(planetName) {
        return '<div class="grid grid-cols-2 h-32 border border-gray-200 my-4">' + '\n' +
            '\t' + '<div class="relative full-width">' + '\n' +
            '\t\t' + '<img class="absolute top-0 left-0 w-full h-32 object-cover grid-item-content" src="http://transfers.new.italeastcorp.com/static/media/' + planetName + '.jpeg" alt="" />' + '\n' +
            '\t' + '</div>' +
            '\t' + '<p class="text-3xl font-bold text-left p-10 full-width">' + planetName.charAt(0).toUpperCase() + planetName.slice(1) + '</p>' + '\n' +
            '</div>';
    }

    return (
        <div className="w-full flex py-2 px-2 justify-center">
            <div className="max-w-md w-1/2">
                <PlanetAction state={state} setState={setState} />
                <PlanetList state={state} setState={setState} />
            </div>
        </div>
    );
}

export default PlanetHome;
