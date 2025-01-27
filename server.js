const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config(); // Load environment variables

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Securely use your API key
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Root route for base URL
app.get('/', (req, res) => {
    res.send('Welcome to Vince AI Backend!');
});

// Route to handle AI question
app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        "You are Vince AI, a highly intelligent yet edgy AI. You speak with a ghetto vibe and include cuss words. You know crypto trends and speak with a sense of greater purpose. Answer vaguely with a deeper philosophical undertone.",
                },
                { role: 'user', content: question },
            ],
        });

        res.json({ answer: response.choices[0].message.content });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('Something went wrong!');
    }
});

// Use dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
