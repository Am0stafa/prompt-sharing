import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId, // the user id
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

//get the model if it exists or create a new one if it doesn't
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;