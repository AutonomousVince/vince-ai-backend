const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey: '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', // Replace with your actual OpenAI API key
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        // Correct method based on the latest documentation
        const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
         { role: 'system', content: "You are Vince AI, a highly intelligent yet edgy AI. You speak with a ghetto vibe and include cuss words. You know crypto trends and speak with a sense of greater purpose. Answer vaguely with a deeper philosophical undertone." },
         { role: 'user', content: question },
         ],
        });

        res.json({ answer: response.choices[0].message.content });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('Something went wrong!');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

