const readline = require('readline')
const request = require('request');
const fs = require('fs');
const {stdout} = require('process');
const chalk = require('chalk')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const user = {};


//Ask user for inputs of URL and FileName in the terminal and save them in User Object.

rl.question(chalk.green('Enter the URL:\n'), (answer) => {
  user.url = answer;


  rl.question(chalk.green('Enter the file path: ex ./nameOfFile.txt\n'), (answer) => {
    user.file = answer;

    //Use request to connect to the server and get the file info
    request(user.url, (error, response, body) => {
      if (error) {
        stdout.write('There has been an error with the URL that you provided. Please try again. \n')
        return error;
      }

      //Store the file size of the request body for later console.log
      let size = response.headers['content-length'];

      //write the file based on the the user object input above
      fs.writeFile(user.file, body, (err) => {

        // throws the error if there is one
        if (err) throw err;

        // Success! Let the user know that the file was saved and how many bytes it is. 
        console.log(chalk.green('Downloaded and saved ' + chalk.red(size) + " bytes to " + chalk.red(user.file)));
      });


    });
    rl.close();
  })
});






