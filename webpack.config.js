const path = require('path'); 
 
module.exports = { 
    mode: 'production', 
    entry: ['./scripts/superhero.js'], 
    output: { 
        filename: 'superhero.js', 
        path: path.resolve(__dirname, 'dist'), 
    }, 
}; 