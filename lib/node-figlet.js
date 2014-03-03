/*
	Node plugin for figlet.js
*/

var figlet = require('./figlet.js'),
    fs = require('fs'),
    fontDir = __dirname + '/../fonts/';

/*
    Loads a font into the figlet object.

    Parameters:
    - name (string): Name of the font to load.
    - next (function): Callback function.
*/
figlet.loadFont = function(name, next) {
    fs.readFile(fontDir + name + '.flf',  {encoding: 'utf-8'}, function(err, data) {
        if (err) {
            next(err);
            return;
        }
        data = data + '';
        var options = figlet.parseFont(name, data);
        next(null, options);
    });
};
figlet.loadFontSync = function(name) {
    var data = fs.readFileSync(fontDir + name + '.flf', {encoding : 'utf-8'}) + '';
    return figlet.parseFont(name, data);
};

/*
    Returns an array containing all of the font names
*/
figlet.fonts = function(next) {
    var fontList = [];
    fs.readdir(fontDir, function (err, files) { // '/' denotes the root folder
        if (err) {
            next(err);
            return;
        }

        files.forEach( function (file) {
            if ( /\.flf$/.test(file) ) {
                fontList.push( file.replace(/\.flf$/,'') );
            }
        });

        next(null, fontList);
    });

};

module.exports = figlet;
