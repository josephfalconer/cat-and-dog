import React from 'react';

import Garden from '../components/Garden';
import '../css/garden.css'; 


const App = () => {

    return (
        <div className="main-container">

            <div className="garden__bg"></div>

            <div className="garden__contr">

                <Garden
                    width={10}
                    height={8}
                />

            </div>
        </div>
    );
}

export default App;
