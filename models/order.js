const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
      }],
      shippingAddress1: {
          type: String,
          required: true,
      },
      shippingAddress2: {
          type: String,
      },
      city: {
          type: String
      },
      zip: {
          type: String,
          required: true,
      },
      country: {
          type: String,
          required: true
      },
      phone: {
          type: String,
          required: true
      },
      status: {
          type: String,
          required: true,
          default: 'Pending',
      },
      totalPrice: {
          type: Number,
      },
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
      },
      dateOrdered: {
          type: Date,
          default: Date.now,
      },
});

/** Order EXamples
 {
     "orderItems": [
         {
         "quantity": 3,
         "product": "623326aaf52de90f09fb80be"
         },
         {
             "quantity": 2,
             "product": "62341f9d1113c11268e637da"
         }
     ],
     "shippingAddress1": "Flowers Street, 45",
     "shippingAddress2": "1-8",
     "city": "praque",
     "zip": "00000",
     "country": "Czech Republic",
     "phone": "+4447070707050503",
     "user": "623dac02e664a35ddf519331"
 }
 **/

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
  orderSchema.set('toJSON', {
    virtuals: true,
  });

exports.Order = mongoose.model("Order", orderSchema);
