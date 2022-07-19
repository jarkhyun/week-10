const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// HOMEWORK TODO: add a get by title route handler

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll()
  res.status(200).send(movieList)
});

// curl http://localhost:5000/movies/573a1394f29313caabcdf639
router.get("/:id", async (req, res, next) => {
  const theMovie = await movieData.getById(req.params.id)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no movie found with id ${req.params.id}` });
  }
});

// curl http://localhost:5000/movies/title/Titanic
router.get("/title/:title", async (req, res, next) => {
  const theMovie = await movieData.getByTitle(req.params.title)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no movie found with title ${req.params.title}` });
  }
});

// curl http://localhost:5000/movies/title/Titanic/year/1953
router.get("/title/:title/year/:year", async (req, res, next) => {
  const theMovie = await movieData.getByTitleAndYear(req.params.title, parseInt(req.params.year))
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no movie found with title ${req.params.title} and year ${req.params.year}` });
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  // TODO: if !result.newObjId send something different
  if(result.message !== "ERROR"){
    res.status(200).send(result)
  } else {
    res.status(500).send({ error: `Unable to create document` });
  }
});

// curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/573a1390f29313caabcd42e8
router.put("/:id", async (req, res, next) => {
  let updatedList = await movieData.updateById(req.params.id, req.body)
  if(updatedList){
    res.status(200).send(updatedList)
  } else {
    res.status(404).send({ error: `Unable to find document` });
  }
});

// curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
router.delete("/:id", async (req, res, next) => {
  const result = await movieData.deleteById(req.params.id)
  if(result){
    res.status(200).send(result)
  } else {
    res.status(404).send({ error: `Unable to find document` });
  }
});

module.exports = router;
