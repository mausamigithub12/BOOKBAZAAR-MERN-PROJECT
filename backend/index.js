const express = require('express')   //require is a built-in Node.js function used to import external modules.Import the Express module and store it in the express variable.
const app = express()              // Call the express function to create an app instance
const port = process.env. port || 5000;  // Use the system's port if available (like in deployment), otherwise use 5000 for local development

app.get('/', (req, res) => {  //app: Your Express app instance. get(...): A method to define a GET route. '/': The URL path for this route. '/' means the root of the website. (req, res) => { ... }: This is a callback function (arrow function) that runs when a user makes a GET request to '/'.
  res.send('Hello World!')     // Send "Hello World!" as the response
})   

app.listen(port, () => {          // app.listen(...): Start the Express server.
  console.log(`Example app listening on port ${port}`)
})
