import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

// const allNotes = ["A", ["A#", "Bb"], "B", "C", ["C#", "Db"], "D", ["D#", "Eb"], "E", "F", ["F#", "Gb"], "G", ["G#", "Ab"]]
const allNotes = [
    "A",
    "A#/Bb",
    "B",
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
];
const keys = ["major", "minor"];

export default function ChordsForm({ root, setRoot, mode, setMode }) {
    const classes = useStyles();

    const handleChange = (event) => {
        setRoot(event.target.value);
    };
    const handleChangeKey = (event) => {
        setMode(event.target.value);
    };
    const renderedNoteMenuItems = allNotes.map((note, index) => {
        return (
            <MenuItem key={`note${index}`} value={note}>
                {note}
            </MenuItem>
        );
    });

    const renderedKeyMenuItems = keys.map((key, index) => {
        return (
            <MenuItem key={`key${index}`} value={key}>
                {key}
            </MenuItem>
        );
    });
    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel
                    shrink
                    id="demo-simple-select-placeholder-label-label"
                >
                    Root
                </InputLabel>
                <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value={root}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                >
                    <MenuItem value=""></MenuItem>
                    {renderedNoteMenuItems}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel
                    shrink
                    id="demo-simple-select-placeholder-label-label"
                >
                    Key
                </InputLabel>
                <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value={mode}
                    onChange={handleChangeKey}
                    displayEmpty
                    className={classes.selectEmpty}
                >
                    <MenuItem value=""></MenuItem>
                    {renderedKeyMenuItems}
                </Select>
            </FormControl>
        </React.Fragment>
    );
}
