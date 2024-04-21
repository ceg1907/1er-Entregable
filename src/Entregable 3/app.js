import express from 'express';
import { ProductManager } from './productManager';

const server = express();
const productManager = new ProductManager('./articles.json');

server.get('/articles', async (request, response) => {
  const { limit } = request.query;
  try {
    const articles = await productManager.getArticles();
    limit
      ? response.json(articles.slice(0, parseInt(limit)))
      : request.json(articles);
  } catch (error) {
    response
      .status(500)
      .json({ error: 'ha ocurrido un error al cargar los articulos' });
  }
});

server.get('/articles:id', async (request, response) => {
  const { id } = request.params;
  try {
    const articles = await productManager.getArticlesbyID(parseInt(id));
    articles
      ? response.json(articles)
      : response.status(404).json({ error: 'el articulo no existe' });
  } catch (error) {
    response.status(500).json({ error: 'no se pudo obtener el articulo' });
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log('Servidor activo');
});
