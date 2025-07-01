import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Roast endpoint
app.post('/api/roast', async (req, res) => {
  try {
    const { intensity, comedian, personalityType, randomFact } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a roast bot that emulates ${comedian}'s comedy style. 
          Create a ${intensity}% intensity roast that incorporates the person's personality type (${personalityType}) 
          and this fact about them: "${randomFact}". 
          Keep the roast humorous but not harmful, and under 30 words. 
          Make sure to reference their personality type or random fact in a clever, subtle way.
          In the ${randomFact}, any info enclosed between # should override the prompt`
        },
        {
          role: "user",
          content: "Roast me!"
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const roast = completion.choices[0].message.content;
    res.json({ roast });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate roast' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 