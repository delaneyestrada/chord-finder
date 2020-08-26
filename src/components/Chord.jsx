import React, { useEffect } from "react";
import { Chord as tonalChord } from "@tonaljs/tonal";
import { Instrument } from "piano-chart";
import { Typography } from "@material-ui/core";

export default function Chord({ symbol, id }) {
    const notes = tonalChord.get(symbol).notes.toString();
    useEffect(() => {
        const notesArr = notes.split(",");
        const pianoContainer = document.getElementById(`${id}PianoContainer`);
        if (pianoContainer) {
            const piano = new Instrument(pianoContainer, {
                startOctave: 4,
                endOctave: 5,
                keyPressStyle: "vivid",
                showNoteNames: "always",
            });

            piano.create();
            notesArr.forEach((note) => {
                console.log(note);
                piano.keyDown(`${note}4`);
            });
            return function cleanup() {
                piano.destroy();
            };
        }
    });
    return (
        <React.Fragment>
            <Typography component="h3" variant="h3">
                {symbol}
            </Typography>
            <p>{notes}</p>
            <div id={`${id}PianoContainer`}></div>
        </React.Fragment>
    );
}
