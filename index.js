const inquirer = require('inquirer');
const fs = require('fs');

inquirer
    .createPromptModule([
        {
            type: 'input',
            name: 'text',
            message: 'Please enter up to 3 characters'
        },
        {
            type: 'input',
            name: 'text_color',
            message: 'Please enter a text color'
        },
        {
            type: 'list',
            choices: ['circle', 'triangle', 'square'],
            name: 'shape',
            message: 'Please choose a shape'
        },
        {
            type: 'input',
            name: 'shape_color',
            message: 'please enter a shape color'
        }        
    ])

