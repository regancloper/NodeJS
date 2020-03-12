const path = require('path');
const fs = require('fs');

let chirps = [
    {
        author: "Regan Loper",
        text: "This is the first comment posted on this thread!",
        date: "10/28/18"
    },
    {
        author: "John Smith",
        text: "I think this is a cool website.",
        date: "10/28/18"
    },
    {
        author: "April May",
        text: "I disagree John Smith - I think this website sucks!",
        date: "10/28/18"
    },
    {
        author: "Jackson Cain",
        text: "Hey everybody.",
        date: "10/28/18"
    },
    {
        author: "Thomas Lee",
        text: "Thanks everybody for joining this thread!",
        date: "10/28/18"
    }
];


let dataPath = path.join(__dirname, '../chirps.json');

fs.writeFile(dataPath, JSON.stringify(chirps), (err) => {
    if (err) console.log(err);
    console.log('The file has been saved!');
});

fs.readFile(dataPath, {
    encoding: "UTF-8"
}, (err, data) => {
    if (err) console.log(err);
    console.log(JSON.parse(data));
});

