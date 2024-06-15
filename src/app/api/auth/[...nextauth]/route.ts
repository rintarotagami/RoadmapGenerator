// `next-auth`と関連プロバイダをインポートします。
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";//credential:資格
// Prismaアダプターをインポートして、データベースとの連携を設定します。
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/_lib/Prisma";

// NextAuthの設定を行います。
const handler = NextAuth({
    // セキュリティのための秘密鍵を環境変数から取得します。
    secret: process.env.NEXTAUTH_SECRET,
    // Prismaアダプターを使用して、データベース操作を行います。
    adapter: PrismaAdapter(prisma),
    // 認証プロバイダーを設定します。
    providers: [
        // ユーザー名とパスワードによる認証を設定します。
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            // ユーザー認証の処理を定義します。
            async authorize(credentials) {
                let user = null; // ユーザー情報を格納する変数を初期化します。
                try {
                    // メールアドレスによるユーザー検索を試みます。
                    user = await prisma.user.findUnique({
                        where: { email: credentials?.email },
                    });
                } catch (error) {
                    // エラーが発生した場合はnullを返して認証を失敗させます。
                    return null;
                }
                // 認証に成功したユーザー情報を返します。
                return user;
            },
        }),
        // GitHubを使ったOAuth認証を設定します。
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        }),
        // Googleを使ったOAuth認証を設定します。
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    // サインインページのカスタムURLを設定します。
    pages: {
        signIn: "/signIn",
    },
    // セッション管理の戦略をJWTに設定します。
    session: {
        strategy: "jwt",
    },
    // リダイレクト処理をカスタマイズします。
    callbacks: {
        async redirect({ url, baseUrl }) {
            // リダイレクト先をルートページに設定します。
            return "/roadmap";
        },
    },
});

// GETとPOSTリクエストで同じハンドラを使用するようにエクスポートします。
export { handler as GET, handler as POST };
