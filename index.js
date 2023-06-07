const express = require('express');
const paypal = require('paypal-rest-sdk');
require('dotenv').config();
paypal.configure({
  mode: 'sandbox',
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

const app = express();

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route for handling PayPal payment request
app.post('/pay', (req, res) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: `${process.env.REDIRECT_URL}/success`,
      cancel_url: `${process.env.REDIRECT_URL}/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'Red Sox Hat',
              sku: '001',
              price: '5.00',
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: '5.00',
        },
        description: 'Hat for the best team ever',
      },
    ],
  };
  // Create a PayPal payment
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

// Route for handling successful payment confirmation
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '5.00',
        },
      },
    ],
  };

  // Execute the PayPal payment
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send('Success');
    }
  });
});

// Route for handling payment cancellation
app.get('/cancel', (req, res) => res.send('Cancelled'));

const PORT = 3000 || process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
