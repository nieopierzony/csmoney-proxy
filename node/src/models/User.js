'use strict';

const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    ip: { type: String },
    accessTill: { type: Date, default: 0 },
    inventory: [
      {
        id: { type: Number },
        fullName: { type: String },
        img: { type: String },
        price: { type: String, default: 0 },
        fade: { type: Number, default: -1 },
        blue: { type: Number, default: -1 },
        overpay: {
          float: { type: Number, default: -1 },
          pattern: { type: Number, default: -1 },
          stickers: { type: Number, default: -1 },
        },
      },
    ],
    customItemSettings: [
      {
        id: { type: Number },
        fade: { type: Number, default: -1 },
        blue: { type: Number, default: -1 },
        overpay: {
          float: { type: Number, default: -1 },
          pattern: { type: Number, default: -1 },
          stickers: { type: Number, default: -1 },
        },
      },
    ],
  },
  { versionKey: false },
);

module.exports = model('users', UserSchema);
