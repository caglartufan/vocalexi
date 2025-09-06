import 'server-only';
import mongoose, { Document, Model, Schema } from 'mongoose';

// Word interface
export interface IWord extends Document {
  word: string;
  audioURL: string | null;
  language: string;
  ipa: string | null;
  romanization: string | null;
  meanings: string[];
  examples: { [key: string]: string[] };
  createdAt: Date;
  updatedAt: Date;
}

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
  },
  { timestamps: true },
);

// Export the model
export const Word: Model<IWord> =
  mongoose.models.Word || mongoose.model<IWord>('Word', WordSchema);
