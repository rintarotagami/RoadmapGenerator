import React from 'react';

const HomePage = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-4">ようこそ、ProgrammerRoadmapへ</h1>
            <p className="text-center mb-4">プログラミング学習者の為のロードマップ作成ツールです。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-200 p-4 rounded">
                    <h2 className="text-xl font-semibold mb-2">ロードマップを作成する</h2>
                    <p>自分だけの学習ロードマップを作成しましょう。</p>
                </div>
                <div className="bg-gray-200 p-4 rounded">
                    <h2 className="text-xl font-semibold mb-2">他のユーザーのロードマップを見る</h2>
                    <p>他のユーザーが作成したロードマップを参考にしましょう。</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
