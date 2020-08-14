$(document).ready(function(){
    $('.form-group').on('change', (e) => {
        $('.chords').empty();
        let root = $(this).find("#root-select > option:selected").val()
        let mode = $(this).find("#mode-select > option:selected").val()
        $("#mode-select").removeAttr("disabled");
        let chords = getChords(root, mode);
        Object.keys(chords).forEach((key) => {
            $('.chords').append("<h3>"+key+"</h3><ul>")
            chords[key]['chords'].forEach((chord) => {
                $('.chords').append("<li>"+chord['name']+": "+chord['notes']+"</li>")
            })
            $('.chords').append("</ul>");
        });
    });
    let flat = "&#x266d;"
    let sharp = "&#9839;"
    const allNotes = ["A", ["A"+sharp, "B"+flat], "B", "C", ["C"+sharp, "D"+flat], "D", ["D"+sharp, "E"+flat], "E", "F", ["F"+sharp, "G"+flat], "G",  ["G"+sharp, "A"+flat]]
    const sharpNotes = ["A", "A"+sharp, "B", "C", "C"+sharp, "D", "D"+sharp, "E", "F", "F"+sharp, "G",  "G"+sharp]
    const flatNotes = ["A","B"+flat, "B", "C","D"+flat, "D", "E"+flat, "E", "F","G"+flat, "G",  "A"+flat]
    const modes = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"]


    allNotes.forEach((note) => {
        if(note instanceof Array){
            $('#root-select').append('<option class="root-item select-item">'+ note[0] + '</option>')
            $('#root-select').append('<option class="root-item select-item">'+ note[1] + '</option>')
        } else {
            $('#root-select').append('<option class="root-item select-item">' + note + '</option>')
        }
    })

    let chordQualities = {0: "maj", 1: "min", 2: "min", 3: "maj", 4: "maj", 5: "min", 6: "dim"}
    
    function getScale(root, modeIndex){
        const majorIntervals = [2, 2, 1, 2, 2, 2, 1];
        let scale = [root];
        let notes;
        if(root.includes(sharp)){
            notes = sharpNotes;
        } else if (root.includes(flat)){
            notes = flatNotes;
        } else if (root == "F"){
            notes = flatNotes;
        } else
            {
            notes = sharpNotes;
        }
        
        let rootIndex = notes.findIndex((note) => note == root);
        for (i=0;i<6;i++){
            rootIndex = (rootIndex + majorIntervals[(i + modeIndex) % 7]) % 12;
            scale.push(notes[rootIndex])
        }

        return scale;
    }
    function getChords(root, mode){
        let modeIndex = modes.findIndex((m) => m == mode);
        let scale = getScale(root, modeIndex);
        let chords = {
            'triads': {
                'notation': "",
                'chords': []
            },
            'sevenths': {
                'notation': "7",
                'chords': []
            },
            'nineths': {
                'notation': "9",
                'chords': []
            },
            'elevenths': {
                'notation': "11",
                'chords': []
            },
            'thirteenths': {
                'notation': "13",
                'chords': []
            }
        };
        
        scale.forEach((note, i) => {
            let chord = [];
            for(j=0; j<7; j++){
                chord.push(scale[(i + (j * 2)) % 7])
            }
            Object.keys(chords).forEach((key, k) => {
                chords[key]['chords'].push({"name": note+chordQualities[(i+modeIndex)%7]+chords[key]['notation'],"notes": chord.slice(0, (3 + k))} )
            })
            // Object.keys(chords).forEach((key) =>{
            //     console.log(chords[key])
            // })
        })
        console.log(chords)
        return chords;
    }
  });