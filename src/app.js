const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const findDirectoryById = (id) => {
  return repositories.findIndex((repository) => repository.id === id);
};

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryToUpdateIdx = findDirectoryById(id);
  if (repositoryToUpdateIdx < 0) {
    response.status(400).json("Repository not found");
  }
  const { title, url, techs } = request.body;
  const newRepositoryData = { title, url, techs };
  repositories[repositoryToUpdateIdx] = Object.assign(
    repositories[repositoryToUpdateIdx],
    newRepositoryData
  );
  return response.json(repositories[repositoryToUpdateIdx]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryToDeleteIdx = findDirectoryById(id);
  if (repositoryToDeleteIdx < 0) {
    return response.status(400).json("Repository not found");
  }
  repositories.splice(repositoryToDeleteIdx, 1);
  return response.status(204);
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryToAddLike = findDirectoryById(id);
  if (repositoryToAddLike < 0) {
    return response.status(400).json("Repository not found");
  }
  repositories[repositoryToAddLike].likes =
    repositories[repositoryToAddLike].likes + 1;
  return repositories[repositoryToAddLike];
});

module.exports = app;
