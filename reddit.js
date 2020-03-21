const path = require('path');
const fs = require('fs');
const rp = require('request-promise');


let dataPath = path.join(__dirname, 'popular-articles.json');

rp('https://reddit.com/r/popular.json')
    .then((repos) => {
        let articles = JSON.parse(repos).data.children.map(item => {
            return { title: item.data.title, url: item.data.url, author: item.data.author};
        });
        fs.writeFile(dataPath, JSON.stringify(articles), (err) => {
            if (err) console.log(err);
            console.log('The file has been saved!');
        });
    })
    .catch(err => console.log(err));



