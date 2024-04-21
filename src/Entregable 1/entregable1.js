class ProductManager {
  constructor() {
    this.products = [];
    this.incrementID = 1;
  }

  addProduct(article) {
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
        console.log('agregado con exito');
      }
    } else {
      console.log('No se encontro el producto');
    }
  }
  getProducts() {
    console.log(this.products);
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
}

new ProductManager().addProduct({
  title: 'articulo 1',
  description: 'Descripcion del articulo 1',
  price: 1500,
  thumnail: 'articulo1.jpg',
  code: 'ART0001',
  stock: 15,
});
