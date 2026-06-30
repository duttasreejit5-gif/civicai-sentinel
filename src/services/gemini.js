import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function analyzeImage(base64Image) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        {
          text: "Identify the civic issue in this image. Return:\nIssue:\nSeverity:\nDescription:",
        },
      ],
    });

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    return "⚠️ Gemini AI is currently busy. Please try again in a few moments.";
  }
}