import React from 'react';
import { useHistory } from "react-router";

function Home() {
    const history = useHistory();

    return (
        <div className="w-full flex py-2 px-2 justify-center">
            <div className="max-w-md w-1/2 justify-center text-center">
                <p className="text-3xl py-2 px-2">Welcome to Planet Test!</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex-6 py-2 px-4 rounded" onClick={() => history.push('/planet')}>Go to Generate Page</button>
            </div>
        </div>
    );
}

export default Home;
