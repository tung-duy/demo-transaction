const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = { name: 'Wallet', schema: WalletSchema };
