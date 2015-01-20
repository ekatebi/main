/**
 * Created by ekatebi on 4/14/14.
 */
var watch = require('watch')

var hoganize = function()
{
    var Hoganizer = require('hoganizer');
    var hoganizer = new Hoganizer({
        templateDir: './templates',
        extension: '.mustache',
        writeLocation: './app/js/templates.js'
    });

// Compile all mustache templates in `./templates` and write
// them into frontend js file to `./templates.js`.
    hoganizer.write();

// Compile but save the script as a string
//    var vanillaJS = hoganizer.precompile();

// Grab the latest compiled version
//    var vanillaJS = hoganizer.getCached();
}

watch.createMonitor('./templates', function (monitor) {
    monitor.files['./templates/*.mustache'] // Stat object for my zshrc.
    monitor.on("created", function (f, stat) {
        // Handle new files
        console.log("created");
        hoganize();
    })
    monitor.on("changed", function (f, curr, prev) {
        // Handle file changes
        console.log("changed");
        hoganize();
    })
    monitor.on("removed", function (f, stat) {
        // Handle removed files
        console.log("removed");
        hoganize();
    })
})