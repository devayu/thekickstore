const API_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(API_KEY);

// const
const createProduct = () => {
  let filtered;
  let array1;
  let array2;
  let dataArray;
  var options = {
    method: 'GET',

    headers: {
      'X-Master-Key':
        '$2b$10$y/Nb3KFy/5rQNMhbvh4FGuX144Sqn9RkLEHAJckYwq0pG8krn69Ni',
    },
  };
  fetch('https://api.jsonbin.io/v3/b/6123d9502aa80036126e94d0', options)
    .then((response) => response.json())
    .then((json) => {
      dataArray = [...json.record];
      filtered = dataArray.filter((item) => item.image.original && item.story);
      array1 = filtered.slice(0, 20);
      array2 = filtered.slice(20, 42);
    })
    .then(() => {
      array2.map((item) => {
        const product = stripe.products.create({
          name: item.name,
          description: item.story,
          images: [item.image.original],
          metadata: {
            brand: item.brand,
            gender: item.gender,
            sku: item.sku,
            price: +item.retailPrice * 73.41,
          },
        });
        fetch('https://api.stripe.com/v1/products', {
          method: 'POST',
          body: product,
        })
          .then((resp) => resp.json())
          .catch((e) => console.log(e));
      });
    });
};
const createPrice = () => {
  fetch(`https://api.stripe.com/v1/products?limit=100`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + API_KEY,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((js) => {
      const array1 = js.data.slice(0, 20);
      const array2 = js.data.slice(20, 42);
      console.log(array1.length);
      console.log(array2.length);
      array2.map((item) => {
        const price = stripe.prices.create({
          unit_amount: Math.floor(item.metadata.price * 100),
          currency: 'inr',
          product: item.id,
        });
        fetch('https://api.stripe.com/v1/prices', {
          method: 'POST',
          body: price,
          headers: {
            Authorization: 'Bearer ' + API_KEY,
          },
        });
      });
    })
    .catch((e) => console.log(e));
};

const delProducts = () => {
  fetch(`https://api.stripe.com/v1/products?limit=100`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + API_KEY,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((js) => {
      js.data.map((item) => {
        const deleted = stripe.products.del(item.id);
        fetch(`https://api.stripe.com/v1/products:id`, {
          method: 'DELETE',
          body: deleted,
          headers: {
            Authorization: 'Bearer ' + API_KEY,
          },
        });
      });
    })
    .then((resp) => resp.json())
    .catch((e) => console.log(e));
};
const getProducts = (res) => {
  fetch(`https://api.stripe.com/v1/products?limit=100`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + API_KEY,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((js) =>
      res.json({
        status: 'ok',
        data: js.data,
      })
    );
};
const getPriceList = (res) => {
  fetch(`https://api.stripe.com/v1/prices?limit=100`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + API_KEY,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((js) =>
      res.json({
        status: 200,
        data: js.data,
      })
    );
};

export default function (req, res) {
  // delProducts();
  // createProduct();
  // createPrice();
  // getProducts(res);
  // getPriceList(res);
}
