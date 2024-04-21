import fs from 'fs';

const dataBase = './articles.json';

export class ProductManager {
  constructor() {
    this.products = [];
    this.incrementID = 1;
  }

  async addArticle(article) {
    let ARTICLE_VALIDATE = article;

    const ARTICLE_EXIST = this.products.some(
      (item) => item.code === article.code
    );
    if (ARTICLE_VALIDATE) {
      let id = this.incrementID++;

      if (ARTICLE_EXIST) {
        console.log('El producto ya existe');
      } else {
        ARTICLE_VALIDATE = { ...ARTICLE_VALIDATE, id: id };
        this.products.push(ARTICLE_VALIDATE);

        const dataArticles = JSON.stringify(this.products);
        try {
          await fs.promises.writeFile(dataBase, dataArticles);
          console.log('agregado con exito');
        } catch (error) {
          console.log('ha ocurrido un error', error);
        }
      }
    } else {
      console.log('No se encontro el producto');
    }
  }
  async getArticles() {
    try {
      const dataArticles = await fs.promises.readFile(dataBase, 'utf-8');
      const articles = JSON.parse(dataArticles);
      this.products = articles;
      return this.products;
    } catch (error) {
      console.log('no se pudo leer el archivo', error);
      return [];
    }
  }

  getArticlesbyID(id) {
    const article = this.products.find((article) => article.id === id);
    if (article) {
      console.log(article);
      return article;
    } else {
      console.log('no se encontra el articulo');
    }
  }

  async updateArticle(id, updateData) {
    const indexArticle = this.products.find((item) => item.id === id);
    if (
      indexArticle !== -1 ||
      indexArticle !== null ||
      indexArticle !== undefined
    ) {
      const articleUpdated = { ...this.products[indexArticle], ...updateData };
      this.products[indexArticle] = articleUpdated;

      const dataArticle = JSON.stringify(this.products);

      try {
        await fs.promises.writeFile(dataBase, dataArticle);
        console.log('articulo modificado');
      } catch (error) {
        console.log('no se pudo modificar', error);
      }
    } else {
      console.log('no se encontro el articulo');
    }
  }

  async deleteArticle(id) {
    const articlesUpdated = this.products.filter((items) => items.id !== id);
    if (articlesUpdated.length < this.products.length) {
      const updatedIformation = JSON.stringify(articlesUpdated);
      try {
        await fs.promises.writeFile(dataBase, updatedIformation);
        console.log('articulo eliminado');
      } catch (error) {
        console.log(
          'no se pudo eliminar el archivo, por favor intente mas tarde'
        );
      }
    } else {
      console.log('el articulo no fue encontrado');
    }
  }
}

// -----------------------------------------------

const addArticleAsync = async () => {
  const productManager = new ProductManager();

  await productManager.addArticle({
    title: 'articulo 1',
    description: 'Descripcion del articulo 1',
    price: 1500,
    thumnail: 'articulo1.jpg',
    code: 'ART0001',
    stock: 15,
  });
  await productManager.addArticle({
    title: 'articulo 2',
    description: 'Descripcion del articulo 2',
    price: 1500,
    thumnail: 'articulo2.jpg',
    code: 'ART0002',
    stock: 19,
  });
};

const getArticleAsync = async () => {
  const productManager = new ProductManager();

  const articles = await productManager.getArticles();

  console.log(articles);
};

const getArticleByIdAsync = async () => {
  const productManager = new ProductManager();
  try {
    await productManager.getArticles();
    await productManager.getArticlesbyID(1);
  } catch (error) {
    console.log(error);
  }
};

const updateArticleAsync = async () => {
  const productManager = new ProductManager();
  try {
    await productManager.getArticles();

    await productManager.updateArticle(1, {
      title: 'Otro articulo 1',
      price: 1500,
    });
    console.log('Articulo actualizado');
  } catch (error) {
    console.error('Error al actualizar el articulo ', error);
  }
};

const deleteProductAsync = async () => {
  const productManager = new ProductManager();
  try {
    await productManager.getArticles();
    await productManager.deleteArticle(2);
  } catch (error) {
    console.log(error);
  }
};

// addArticleAsync();
// getArticleAsync();
// getArticleByIdAsync();
// deleteProductAsync();
