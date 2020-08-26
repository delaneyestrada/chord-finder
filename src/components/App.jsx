import React, { useState } from "react";
import ChordList from "./ChordList";
import ChordsForm from "./ChordsForm";

export default function App() {
    const [root, setRoot] = useState("C");
    const [mode, setMode] = useState("major");
    return (
        <div className="ui container">
            <ChordsForm
                mode={mode}
                setMode={setMode}
                root={root}
                setRoot={setRoot}
            />
            <ChordList root={root} mode={mode} />
        </div>
    );
}
