import { Schema, model } from "mongoose";

// Schema para os itens dentro do pedido
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

// Schema principal do pedido
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
  timestamps: true, // Cria automaticamente os campos createdAt e updatedAt
  versionKey: false // Remove o campo __v que o Mongoose adiciona por padrão
});

export default model('Order', OrderSchema);