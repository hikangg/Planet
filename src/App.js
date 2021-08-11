import React from 'react';
import { 
  GridContextProvider,
  GridDropZone,
  GridItem
 } from "react-grid-dnd";
function App() {
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
  }

  return (
    <GridContextProvider onChange={onChange}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <input class="w-full border h-10 border-gray-200"></input>
        <GridDropZone
            className="dropzone left"
            id="left"
            boxesPerRow={1}
            rowHeight={150}
          >
          <GridItem key={0} style={{position: 'fixed'}}>
            <div class="grid grid-cols-2 h-32 border border-gray-200 my-4">
                <div class="relative">
                    <img class="absolute top-0 left-0 w-full h-32 object-cover" src={require('./assets/img/earth.jpeg').default} alt=""/>
                </div>
                <p class="text-3xl font-bold text-left p-10">Earth</p>
            </div>
          </GridItem>
          <GridItem key={1} style={{position: 'fixed'}}>
          <div class="grid grid-cols-2 h-32 border border-gray-200 my-4">
              <div class="relative">
                  <img class="absolute top-0 left-0 w-full h-32 object-cover" src={require('./assets/img/jupiter.jpeg').default} alt=""/>
              </div>
              <p class="text-3xl font-bold text-left p-10">Jupiter</p>
          </div>
          </GridItem>
          <GridItem key={2} style={{position: 'fixed'}}>
          <div class="grid grid-cols-2 h-32 border border-gray-200 my-4">
              <div class="relative">
                  <img class="absolute top-0 left-0 w-full h-32 object-cover" src={require('./assets/img/mars.jpeg').default} alt=""/>
              </div>
              <p class="text-3xl font-bold text-left p-10">Mars</p>
          </div>
          </GridItem>
          <GridItem key={3} style={{position: 'fixed'}}>
          <div class="grid grid-cols-2 h-32 border border-gray-200 my-4">
              <div class="relative">
                  <img class="absolute top-0 left-0 w-full h-32 object-cover" src={require('./assets/img/mercury.jpeg').default} alt=""/>
              </div>
              <p class="text-3xl font-bold text-left p-10">Mercury</p>
          </div>
          </GridItem>
          <GridItem key={4} style={{position: 'fixed'}}>
          <div class="grid grid-cols-2 h-32 border border-gray-200 my-4">
              <div class="relative">
                  <img class="absolute top-0 left-0 w-full h-32 object-cover" src={require('./assets/img/saturn.jpeg').default} alt=""/>
              </div>
              <p class="text-3xl font-bold text-left p-10">Saturn</p>
          </div>
          </GridItem>
          <GridItem key={5} style={{position: 'fixed'}}>
          <div class="grid grid-cols-2 h-32 border border-gray-200 my-4">
              <div class="relative">
                  <img class="absolute top-0 left-0 w-full h-32 object-cover" src={require('./assets/img/venus.jpeg').default} alt=""/>
              </div>
              <p class="text-3xl font-bold text-left p-10">Venus</p>
          </div>
          </GridItem>
        </GridDropZone>
    </div>
    </GridContextProvider>
  );
}

export default App;
