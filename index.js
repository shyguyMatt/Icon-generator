const inquirer = require('inquirer');
const inquirerPrompt = require('inquirer-autocomplete-prompt')
const fuzzy = require('fuzzy')
const colorsjs = require('./colors')
const fs = require('fs');
var colors = colorsjs.colors

// this function was taken from the inquirer docs, I did not write it.
// this function searches through a list of colors to be used for picking colors
function searchcolors(answers, input = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fuzzy.filter(input, colors).map((el) => el.original));
      }, Math.random() * 470 + 30);
    });
  }

inquirer.registerPrompt('autocomplete', inquirerPrompt)
inquirer
    .prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Please enter up to 3 characters'
        },
        {
            type: 'autocomplete',
            name: 'text_color',
            message: 'Please enter a text color',
            source: searchcolors
        },
        {
            type: 'list',
            choices: ['circle', 'triangle', 'square'],
            name: 'shape',
            message: 'Please choose a shape'
        },
        {
            type: 'autocomplete',
            name: 'shape_color',
            message: 'please enter a shape color',
            source: searchcolors
        },
        {
            type: 'input',
            name: 'file_name',
            message: 'please enter a file name for your logo',
        }
    ])
    .then((response) => {
        let svg = ''
        switch (response.shape) {

            // switch case for circle logos
            case 'circle':
                svg = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    <circle cx="150" cy="100" r="80" fill="${response.shape_color}" />
                  
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${response.text_color}">${response.text}</text>
                  
</svg>`;
                break;

            // switch case for triangle logos
            case 'triangle':
                svg = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    <polygon points="70 20, 230 20, 150 180" fill="${response.shape_color}" />
                  
    <text x="150" y="100" font-size="60" text-anchor="middle" fill="${response.text_color}">${response.text}</text>
                  
</svg>`;
                break;

            // switch case for square logos
            case 'square':
                svg = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    <rect x="70" y="20" width="160" height="160" fill="${response.shape_color}" />
                  
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${response.text_color}">${response.text}</text>
                  
</svg>`;
                break;
            default:
                console.log('this is not a valid shape!')
        }

        fs.writeFile(`./generated_icons/${response.file_name}.svg`, svg, err => {
            if (err) {
              console.error(err);
            }})
        console.log(`Generated ${response.file_name}.svg`)
    })

