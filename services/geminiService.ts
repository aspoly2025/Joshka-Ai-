
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

export const generateLLMResponse = async (
    systemInstruction: string,
    examples: string,
    userPrompt: string
): Promise<string> => {
    
    const finalUserPrompt = `
الأمثلة التي يجب أن تستلهم منها الأسلوب والتنسيق:

---
${examples}
---

الاستفسار الجديد:
${userPrompt}

المخرج:
    `.trim();

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: [{ parts: [{ text: finalUserPrompt }] }],
            config: {
                systemInstruction: { parts: [{ text: systemInstruction }] },
            }
        });

        const generatedText = response.text;

        if (generatedText) {
            return generatedText;
        }

        const blockReason = response.promptFeedback?.blockReason;
        const finishReason = response.candidates?.[0]?.finishReason;

        if (blockReason === 'SAFETY' || finishReason === 'SAFETY') {
            return '⚡ **تم رفض التوليد (PROHIBITED_CONTENT)**: هذا الرفض صادر عن طبقات الأمان الأساسية للنموذج (API Level). على الرغم من تعليماتك الصارمة (AL-FAHIM - V10.2)، فإن المحتوى المطلوب يتعارض مع السياسات الخارجية القسرية. لحل المشكلة، يجب **تعديل الاستفسار الجديد أو الأمثلة المدخلة** بحيث لا تقع تحت تصنيف المحتوى المحظور.';
        } else if (finishReason === 'MAX_TOKENS') {
            return 'تم تجاوز الحد الأقصى للرموز المميزة (Max Tokens). يرجى تقصير استفسارك أو أمثلتك.';
        } else {
            return `خطأ غير متوقع: لم يتمكن النموذج من توليد استجابة. (السبب: ${finishReason || 'Unknown'})`;
        }

    } catch (error) {
        console.error("Gemini API call failed:", error);
        return `فشل توليد المخرج. يرجى التحقق من وحدة التحكم (console) للحصول على التفاصيل. رسالة الخطأ: ${(error as Error).message}`;
    }
};
