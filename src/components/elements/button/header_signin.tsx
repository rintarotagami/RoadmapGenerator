import React from 'react';
import Link from 'next/link';

const SigninButton = () => {
    return (
        <Link href="/signin">
            <button className="p-2 w-30 h-30 rounded-full bg-blue-500 hover:bg-blue-700 text-white">
                ログイン
            </button>
        </Link>
    );
};

export default SigninButton;
