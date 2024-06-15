import React from 'react';
import Link from 'next/link';

const SignupButton = () => {
    return (
        <Link href="/signup">
            <button className="p-2 w-30 h-30 rounded-full bg-blue-500 hover:bg-blue-700 text-white">
                アカウント作成
            </button>
        </Link>
    );
};

export default SignupButton;
