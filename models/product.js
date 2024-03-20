const db = require('../util/database');
const Cart =require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
  return db.execute('Insert INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl]);
  }

  static deletebyId(id){

    // getProductsFromFile(products => {
    //   const product = products.find(prod => prod.id === id);
    //   const updatedProducts = products.filter(p => p.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     if(!err){
    //       Cart.deleteProduct(id,product.price);
    //     }
    //   });
    // });
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findbyId(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
  }
};
