import 'server-only';
import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface for quiz option
export interface IQuizOption {
  value: string;
  isCorrect: boolean;
  explanation: { [key: string]: string };
}

// Interface for quiz question
export interface IQuiz {
  question: string;
  options: IQuizOption[];
}

// Word interface
export interface IWord extends Document {
  word: string;
  audioURL: string | null;
  language: string;
  ipa: string | null;
  romanization: string | null;
  meanings: string[];
  examples: { [key: string]: string[] };
  quizzes: IQuiz[];
  createdAt: Date;
  updatedAt: Date;
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
  { _id: false },
);

// Word schema
const WordSchema = new Schema<IWord>(
  {
    word: {
      type: String,
      required: true,
    },
    audioURL: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      required: true,
    },
    ipa: {
      type: String,
      default: null,
    },
    romanization: {
      type: String,
      default: null,
    },
    meanings: {
      type: [String],
      required: true,
      validate: {
        validator: function (meanings: string[]) {
          return meanings.length >= 1;
        },
        message: 'At least one meaning is required',
      },
    },
    examples: {
      type: Map,
      of: [String],
      required: true,
      validate: {
        validator: function (examples: Map<string, string[]>) {
          return examples.size >= 1;
        },
        message: 'At least one example is required',
      },
    },
    quizzes: {
      type: [QuizSchema],
      required: true,
    },
  },
  { timestamps: true },
);

// Export the model
export const Word: Model<IWord> =
  mongoose.models.Word || mongoose.model<IWord>('Word', WordSchema);
