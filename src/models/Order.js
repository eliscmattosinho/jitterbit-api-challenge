import { Schema, model } from "mongoose";

// Schema for the items within the order
const ItemSchema = new Schema({
  productId: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false });

// Main order schema
const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  items: [ItemSchema]
}, {
  timestamps: true,
  versionKey: true
});

export default model('Order', OrderSchema);