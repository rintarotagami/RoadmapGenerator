import { AuthOptions, SessionStrategy } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        // ここに認証プロバイダーを設定します
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt" as SessionStrategy, // ここを修正
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // エラーが発生したときにリダイレクトするURL
        verifyRequest: '/auth/verify-request', // メールでの確認が必要な場合のURL
        newUser: undefined // アカウントが作成されたときにリダイレクトするURL（nullはリダイレクトなし）
    }
};
