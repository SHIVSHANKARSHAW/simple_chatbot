import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', async (req, res) => {
  const { message } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(message);
    const responseText = result.response.text();
    res.json({ fulfillmentText: responseText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing your request');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});