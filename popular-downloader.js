const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

// LUKE'S SIMPLE SOLUTION

rp('https://reddit.com/r/popular.json')
    .then(raw => {
        const repos = JSON.parse(raw);
        repos.data.children.forEach(child => {
            
            const extname = path.extname(child.data.url);
            const id = child.data.id;
            const filename = `${id}${extname}`;

            if (extname === '.jpg' || extname === '.gif' || extname === '.png') {
                rp(child.data.url, { encoding: 'base64' })
                .then(media => {
                    fs.writeFile(path.join(__dirname, `./downloads/${filename}`), media, { encoding: 'base64' }, err => {
                        if (err) console.log(err);
                        console.log("done?");
                    });
                });
            }

        });
    });



// AXIOS SOLUTION
// const axios = require('axios');

// let dataPath = path.join(__dirname, 'downloads');

// async function download(url, fileExt) {
//     const response = await axios({
//         method: 'GET',
//         url,
//         responseType: 'stream'
//     });

//     response.data.pipe(fs.createWriteStream(`${dataPath}/${fileExt}`));

//     return new Promise((resolve, reject) => {
//         response.data.on('end', () => {
//             resolve();
//         });
//         response.data.on('error', err => {
//             reject(err);
//         });
//     });
// }

// rp('https://reddit.com/r/popular.json')
//     .then((repos) => {
//         JSON.parse(repos).data.children.forEach(item => {
//             let ext = path.extname(item.data.url);
//             if (ext === '.jpg' || ext === '.gif' || ext === '.png') {
//                 download(item.data.url, `${item.data.id}${ext}`);
//             }            
//         });
       
//     })
//     .catch(err => console.log(err));