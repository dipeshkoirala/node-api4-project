const express = require('express');
const Users=require("./users-model")

const { validateUserId, validateUser,validatePost } = require("../middleware/middleware")

const router = express.Router();

router.get('/', (req, res,next) => {
  
  // RETURN AN ARRAY WITH ALL THE Users
  console.log("\033[31m[This is in response to \033[34m[GET Method]\033[31m from userRouter]")
  const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}

	Users.get(options)
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((error) => {
		
			next(error)

		
		})
});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

/* router.post('/',/*  validateUser()  (req, res,next) => {
  console.log("\033[31m[This is in response to \033[34m[POST Method]\033[31m from userRouter]")
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  // Users.get()
  console.log(req.body)
   Users.insert(req.body)
   .then((user)=>{
     res.status(201).json(user)
  }).catch(next)
}) */

router.post("/", (req, res, next)=>{
  const name=req.body
Users.insert(name)
.then((user)=>{
  res.status(201).json(user)
  }).catch(next)

})

router.put('/:id',validateUser(),validateUserId(), (req, res,next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then((user) => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({
        message: "The user could not be found",
      })
    }
  })
  .catch((error) => {
    next(error)
  })

});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports=router