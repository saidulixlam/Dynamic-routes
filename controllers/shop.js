const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,data])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err));
};

exports.getProduct = (req, res, next) => {
  const id=req.params.productID;
  Product.findbyId(id)
  .then(([product]) => {
    if (!product[0]) {
      return res.status(404).send('Product not found');
    }
    
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product[0].title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,data])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartproducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartproducts.push({productData : product , qty:cartProductData.qty});
        }
      }

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartproducts
      });
    })
  })
};

exports.postCart = (req, res, next) => {
  const proID = req.body.productId;
  Product.findbyId(proID,(product) => {
    Cart.addProduct(proID,product.price);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
