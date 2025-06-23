import mongoose from "mongoose";

export interface IQuestion extends Document {
  q: string;
  choice: string[];
  qType: string;
  required: boolean;
  answer?: string;
}

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    q: {
      type: String,
      required: true,
    },
    choice: [
      {
        type: String,
      },
    ],
    qType: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: true,
    },
    answer: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export interface ITopic extends Document {
  name: string;
  questions: IQuestion[];
}

const topicSchema = new mongoose.Schema<ITopic>(
  {
    name: {
      type: String,
      required: true,
      match: [
        /^[\u0590-\u05FFA-Z](?:[\u0590-\u05FF a-z]*[\u0590-\u05FFa-z])?$/,
        "Topic's name is not valid",
      ],
    },
    questions: [questionSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

topicSchema.index({ name: 1 }, { unique: true });

const Topic = mongoose.model<ITopic>("Topic", topicSchema);

export default Topic;
