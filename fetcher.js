const readline = require('readline')
const request = require('request');
const fs = require('fs');
const {stdout} = require('process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const user = {};


rl.question('Enter the URL:\n', (answer) => {
  user.url = answer;


  rl.question('Enter the file path: ex ./nameOfFile.txt\n', (answer) => {
    user.file = answer;

    console.log(user);
    request(user.url, (error, response, body) => {
      if (error) {
        stdout.write('There has been an error with the URL that you provided. Please try again. \n')
        return error;
      }
      let size = response.headers['content-length'];

      fs.writeFile(user.file, body, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log(`Downloaded and saved ${size} bytes to ${user.file}`);
      });

    });
    // process.stdout.write(bio);
    rl.close();
  })
});





// //Use fs to write the document to  to the provided local file path.
