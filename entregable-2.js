import fs from 'fs';

const dataBase = './articles.txt';

class ProductManager {
  constructor() {
    this.products = [];
    this.incrementID = 1;
  }

  async addProduct(article) {
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
  async getProducts() {
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

  getArticlesbyID(code) {
    const article = this.products.find((article) => article.code === code);
    console.log(code);
    if (article) {
      return article;
    } else {
      console.log('no se encontra el articulo');
    }
  }

  async updateArticle(id, updateData) {
    const indexArticle = this.products.findIndex((item) => item.id === id);
    if (indexArticle !== -1) {
      const articleUpdate = { ...this.products[indexArticle], ...updateData };

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
}

const productManager = new ProductManager();

productManager.addProduct({
  title: 'articulo 1',
  description: 'Descripcion del articulo 1',
  price: 1500,
  thumnail: 'articulo1.jpg',
  code: 'ART0001',
  stock: 15,
});
productManager.addProduct({
  title: 'articulo 2',
  description: 'Descripcion del articulo 2',
  price: 1500,
  thumnail: 'articulo2.jpg',
  code: 'ART0002',
  stock: 19,
});

const products = productManager.getProducts();
console.log(products);
