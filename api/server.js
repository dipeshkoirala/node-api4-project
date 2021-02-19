const express = require('express');
const {logger}=require("./middleware/middleware")
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
// global middlewares and routes need to be connected here

server.get('/', logger,(req, res) => {
  res.status(200).json({
		message: `Welcome ${process.env.COHORT}`,
		status: process.env.STATUS || "not deployed",
		herokuPort: process.env.PORT,
	})
});

module.exports = server;


server.get("/", (req, res) => {

})