import React from 'react';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
} from "react-grid-drag";
import Planet from './Planet';

function PlanetList(props) {

    function onChangeOrder(sourceId, sourceIndex, targetIndex, targetId) {
        const result = swap(props.state.planets, sourceIndex, targetIndex);
        props.setState({
            ...props.state,
            planets: result
        });
    }

    return (
        <GridContextProvider onChange={onChangeOrder}>
            <div className="container">
                <GridDropZone
                    className="dropzone left"
                    id="left"
                    boxesPerRow={1}
                    rowHeight={150}
                    style={{ height: 150 * props.state.planets.length }}
                >
                    {
                        props.state.planets.map((planet) => (
                            <GridItem key={planet.id}>
                                <Planet planetName={planet.name} />
                            </GridItem>
                        ))
                    }
                </GridDropZone>
            </div>
        </GridContextProvider>
    );
}

export default PlanetList;
