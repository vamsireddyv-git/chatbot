import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

export const generateResponse = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ message: "please send a valid query" });
        }

        const reply = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [message] 
        });

        res.status(200).json({
            success: true,
            reply: reply.text 
        });

    } catch (err) {
        console.error("AI Generation Error:", err); 
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};   