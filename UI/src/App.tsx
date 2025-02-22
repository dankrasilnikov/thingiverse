import React from 'react';
import './App.css';
import ModelPage from "@/views/ModelPage";
import {BrowserRouter, Route, Routes} from "react-router";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>Home page</h1>}/>
                    <Route path="thing/:id" element={<ModelPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
