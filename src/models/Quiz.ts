// Interface for quiz option
import mongoose, { Model, Schema } from 'mongoose';

export interface IQuizOption {
  value: string;
  isCorrect: boolean;
  explanation: { [key: string]: string };
}

// Interface for quiz question
export interface IQuiz {
  wordId: Schema.Types.ObjectId | string;
  question: string;
  options: IQuizOption[];
}

// Quiz option schema
const QuizOptionSchema = new Schema<IQuizOption>(
  {
    value: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    explanation: {
      type: Map,
      of: String,
      required: true,
    },
  },
  { _id: false },
);

// Quiz schema
const QuizSchema = new Schema<IQuiz>(
  {
    wordId: {
      type: Schema.Types.ObjectId,
      ref: 'Word',
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [QuizOptionSchema],
      required: true,
      validate: {
        validator: function (options: IQuizOption[]) {
          return options.length >= 2;
        },
        message: 'Quiz must have at least 2 options',
      },
    },
  },
  { timestamps: true },
);

// Export the model
export const Word: Model<IQuiz> =
  mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
