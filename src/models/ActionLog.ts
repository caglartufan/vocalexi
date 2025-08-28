import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export enum ActionType {
  WORD_SEARCHED = 'WORD_SEARCHED',
  WORD_GENERATED = 'WORD_GENERATED',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  QUIZ_TAKEN = 'QUIZ_TAKEN',
  SETTINGS_CHANGED = 'SETTINGS_CHANGED',
}

// ActionLog interface
export interface IActionLog extends Document {
  user: Types.ObjectId;
  actionType: ActionType;
  payload: Record<string, unknown>; // flexible JSON blob
  createdAt: Date;
}

// Word schema
const ActionLogSchema = new Schema<IActionLog>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  actionType: {
    type: String,
    enum: Object.values(ActionType),
    required: true,
  },
  payload: Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
export const ActionLog: Model<IActionLog> =
  mongoose.models.ActionLog ||
  mongoose.model<IActionLog>('ActionLog', ActionLogSchema);
