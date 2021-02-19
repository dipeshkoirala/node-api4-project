// require your server and launch it


const express = require("express")
 const server= require("./api/server")
const morgan=require("morgan")


const postsRouter = require("./api/posts/posts-router")

const userRouter=require("./api/users/users-router")

const port = process.env.PORT||3333



server.use(morgan("dev"))

server.use("/api/post",postsRouter)
server.use("/api/users",userRouter)
server.get("/", (req, res) => {
	res.status(200).json({
		message: `Welcome ${process.env.COHORT}`,
		status: process.env.STATUS || "not deployed",
		herokuPort: process.env.PORT,
	})
})

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, please try again later.",
		err: err.message
	})
})
 
server.listen(port, () => {
	console.log("\033[1m\033\4mServer running at http://localhost:"+port)
})

