// const bodyParser = require("body-parser");
const express = require("express");

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let publications = [];
const STATUS_ERROR = 404;
const STATUS_OK = 200;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
let id = 0;

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    return res.status(STATUS_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para crear la publicación",
    });
  }
  const post = {
    author,
    title,
    contents,
    id: ++id,
  };
  publications.push(post);
  res.status(STATUS_OK).json(post);
});

server.get("/posts", (req, res) => {
  // localhos:3000/posts?term=pepito
  const { term, author, title } = req.query;
  if (term) {
    const filterPosts = publications.filter((post) => {
      return post.title.includes(term) || post.contents.includes(term);
    });
    filterPosts.length > 0
      ? res.status(STATUS_OK).json(filterPosts)
      : res.status(STATUS_OK).json(publications);
  } else if (author && title) {
    const filterPosts = publications.filter((post) => {
      return post.title === title && post.author === author;
    });
    filterPosts.length > 0
      ? res.status(STATUS_OK).json(filterPosts)
      : res.status(STATUS_ERROR).json({
          error:
            "No existe ninguna publicación con dicho título y autor indicado",
        });
  } else {
    res.status(STATUS_OK).json(publications);
  }
});

server.get("/posts/:author", (req, res) => {
  // localhost:3000/posts/dede  {author:dede}
  const { author } = req.params;
  if (author) {
    const filterPosts = publications.filter((post) => {
      return post.author === author;
    });
    filterPosts.length > 0
      ? res.status(STATUS_OK).json(filterPosts)
      : res
          .status(STATUS_ERROR)
          .json({ error: "No existe ningun post del autor indicado" });
  }
});

server.put("/posts/:id", (req, res) => {
  // localhost:3000/posts/dede  {id:dede}
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(STATUS_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar la publicación",
    });
  }
  const postIndex = publications.findIndex((post) => post.id === Number(id)); // 2
  if (postIndex === -1) {
    return res.status(STATUS_ERROR).json({
      error:
        "No se recibió el id correcto necesario para modificar la publicación",
    });
  }
  const post = { ...publications[postIndex], title, contents };
  publications[postIndex] = post;
  res.status(STATUS_OK).json(post);
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(STATUS_ERROR)
      .json({ error: "No se recibió el id de la publicación a eliminar" });
  }
  const postIndex = publications.findIndex((post) => post.id === Number(id)); // 2
  if (postIndex === -1) {
    return res
      .status(STATUS_ERROR)
      .json({
        error:
          "No se recibió el id correcto necesario para eliminar la publicación",
      });
  }
  publications = publications.filter((e) => e.id !== Number(id));
  return res.status(STATUS_OK).json({ success: true });
});

server.delete("/author/:name", (req, res) => {
  const { name } = req.params;
  !name
    ? res
        .status(STATUS_ERROR)
        .json({ error: "No se recibió el nombre del autor" })
    : null;
  const postIndex = publications.findIndex((post) => post.author === name); // 2
  postIndex === -1
    ? res
        .status(STATUS_ERROR)
        .json({
          error:
            "No se recibió el nombre correcto necesario para eliminar las publicaciones del autor",
        })
    : null;
  const post = publications.filter((e) => e.author === name);
  publications = publications.filter((e) => e.author !== name);
  return res.status(STATUS_OK).json(post);
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
