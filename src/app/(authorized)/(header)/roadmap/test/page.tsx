"use client";
import React, { useState } from 'react';

const RoadmapTestPage = () => {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [score, setScore] = useState<number | null>(null);

    const questions = [
        {
            id: 'q1',
            question: 'プログラミング学習の最初のステップは何ですか？',
            options: ['HTMLを学ぶ', 'データベースを学ぶ', 'ネットワークを学ぶ', 'セキュリティを学ぶ'],
            correctAnswer: 'HTMLを学ぶ'
        },
        {
            id: 'q2',
            question: 'JavaScriptの主な用途は何ですか？',
            options: ['スタイルシート', 'サーバーサイドプログラミング', 'クライアントサイドプログラミング', 'データベース管理'],
            correctAnswer: 'クライアントサイドプログラミング'
        },
        // 他の質問を追加できます
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
        setAnswers({
            ...answers,
            [questionId]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newScore = 0;
        questions.forEach((question) => {
            if (answers[question.id] === question.correctAnswer) {
                newScore += 1;
            }
        });
        setScore(newScore);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-4">ロードマップ理解度テスト</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {questions.map((question) => (
                    <div key={question.id} className="mb-4">
                        <p className="text-lg font-semibold mb-2">{question.question}</p>
                        {question.options.map((option) => (
                            <label key={option} className="block mb-2">
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    onChange={(e) => handleChange(e, question.id)}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    テストを提出
                </button>
            </form>
            {score !== null && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">あなたのスコア: {score} / {questions.length}</h2>
                </div>
            )}
        </div>
    );
};

export default RoadmapTestPage;

