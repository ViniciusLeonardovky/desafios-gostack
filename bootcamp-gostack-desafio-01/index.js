const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.count(`Quantidade de requisicoes: ${next()}`);
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(function(idArray) {
    return idArray.id === id;
  });

  if (!project) {
    return res.status(400).json({ error: "Project does not exists" });
  }
  return next();
}

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  project = { id, title, tasks: [] };

  projects.push(project);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(function(idArray) {
    return idArray.id === id;
  });

  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(function(idArray) {
    return idArray.id === id;
  });

  projectId = projects.indexOf(project);

  projects.splice(projectId, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { title } = req.body; //nova tarefa
  const { id } = req.params;

  const project = projects.find(function(idArray) {
    return idArray.id === id;
  });

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
