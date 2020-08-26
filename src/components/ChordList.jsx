import React, { useState, useEffect } from "react";
import { Key } from "@tonaljs/tonal";
import Chord from "./Chord";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {},
    chord: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default function ChordList({ root, mode }) {
    const [chords, setChords] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        console.log(`root: ${root}\nmode: ${mode}`);
        if (mode === "major") {
            setChords(Key.majorKey(root).chords);
        } else if (mode === "minor") {
            setChords(Key.minorKey(root).natural.chords);
        } else {
            setChords(Key.minorKey("A").chords);
        }
    }, [root, mode]);
    const renderedChords = chords.map((symbol, index) => {
        return (
            <Grid item xs="3" key={index}>
                <Paper elevation={2}>
                    <div className={classes.chord}>
                        <Chord symbol={symbol} id={`chord${index}`} />
                    </div>
                </Paper>
            </Grid>
        );
    });

    return (
        <Grid container spacing={3}>
            {renderedChords}
        </Grid>
    );
}
