"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';

const RoadmapCreationForm = () => {
    const [inputText, setInputText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // ここでAIによるロードマップ生成ロジックを呼び出す
        console.log('Text:', inputText);
        console.log('File:', file);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-blue-50 p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-blue-700 text-sm font-bold mb-2">
                    テキスト入力:
                </label>
                <input 
                    type="text" 
                    value={inputText} 
                    onChange={handleTextChange} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-blue-700 text-sm font-bold mb-2">
                    ファイルをドラッグアンドドロップまたは選択:
                </label>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
            </div>
            <div className="flex items-center justify-between">
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    ロードマップを生成
                </button>
            </div>
        </form>
    );
};

export default RoadmapCreationForm;
