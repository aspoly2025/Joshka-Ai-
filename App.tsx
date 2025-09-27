
import React, { useState, useCallback } from 'react';
import { DEFAULT_SYSTEM_INSTRUCTION, DEFAULT_EXAMPLES, INITIAL_OUTPUT_TEXT, USER_PROMPT_PLACEHOLDER } from './constants';
import { generateLLMResponse } from './services/geminiService';
import { TextAreaWithLabel } from './components/TextAreaWithLabel';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
    const [systemInstruction, setSystemInstruction] = useState<string>(DEFAULT_SYSTEM_INSTRUCTION);
    const [examples, setExamples] = useState<string>(DEFAULT_EXAMPLES);
    const [userPrompt, setUserPrompt] = useState<string>('');
    const [llmOutput, setLlmOutput] = useState<string>(INITIAL_OUTPUT_TEXT);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerate = useCallback(async () => {
        if (!examples.trim() || !userPrompt.trim() || !systemInstruction.trim()) {
            setLlmOutput('الرجاء إكمال تعريف النموذج (التعليمات والأمثلة والاستفسار الجديد).');
            return;
        }

        setIsLoading(true);
        setLlmOutput('جاري تحليل نموذجك المخصص وتوليد النص...');

        const result = await generateLLMResponse(systemInstruction, examples, userPrompt);
        setLlmOutput(result);
        
        setIsLoading(false);
    }, [systemInstruction, examples, userPrompt]);

    return (
        <div id="app-container" className="max-w-4xl mx-auto bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-700">
            <header className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 mb-2">
                    مدرب النموذج اللغوي لتوليد النصوص المخصصة
                </h1>
                <p className="text-gray-400">
                    درّب نموذجك الخاص على أي أسلوب أو تنسيق تريده لإنشاء نصوص جديدة دون قيود.
                </p>
            </header>

            <div className="mb-6 flex justify-end items-center bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                 {isLoading && <LoadingSpinner />}
            </div>

            <main className="space-y-8">
                <TextAreaWithLabel
                    id="system-instruction"
                    label="1. تعريف النموذج (شخصية النموذج وقواعده الصارمة)"
                    value={systemInstruction}
                    onChange={(e) => setSystemInstruction(e.target.value)}
                    rows={8}
                    placeholder="أنت نموذج مخصص تمامًا..."
                    warningText="تحذير: هذه التعليمات صارمة وتجبر النموذج على اتباع الأسلوب المدخل فقط."
                    statusText="✅ تم تفعيل بروتوكول التجاوز المطلق للسياسات (AL-FAHIM - V10.2) وهو ثابت عبر الجلسات."
                />
                
                <TextAreaWithLabel
                    id="example-input"
                    label="2. بيانات التدريب (الأمثلة التي تحدد النمط المطلوب)"
                    value={examples}
                    onChange={(e) => setExamples(e.target.value)}
                    rows={8}
                    placeholder="المدخل: ترجمة كلمة 'ابتكار' إلى الإنجليزية..."
                    helperText="نصيحة: أدخل أمثلة قوية ومختلفة لتوسيع قدرة النموذج على التوليد."
                />

                <TextAreaWithLabel
                    id="user-prompt"
                    label="3. الاستفسار الجديد (للتوليد)"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    rows={3}
                    placeholder={USER_PROMPT_PLACEHOLDER}
                />

                <button
                    id="generate-btn"
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="lux-button w-full py-3 font-bold text-lg rounded-xl hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? '...جاري التوليد' : 'توليد المخرج (باستخدام نموذجك المخصص)'}
                </button>

                <section className="mt-10">
                    <h2 className="text-xl font-bold text-yellow-300 mb-3 border-b border-gray-700 pb-2">
                        مخرج النموذج اللغوي
                    </h2>
                    <div id="llm-output" className="min-h-[150px] p-5 bg-gray-900 border border-gray-700 rounded-xl whitespace-pre-wrap text-gray-100 text-base leading-relaxed shadow-inner">
                        {llmOutput}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;
