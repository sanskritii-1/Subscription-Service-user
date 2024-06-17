import mongoose, { Document, Schema } from 'mongoose';

export interface IPaymentHistory extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  description: string;
}

const paymentHistorySchema = new Schema<IPaymentHistory>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true }
});

const PaymentHistory = mongoose.model<IPaymentHistory>('PaymentHistory', paymentHistorySchema);

export default PaymentHistory;
