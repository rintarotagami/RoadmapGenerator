// 必要なモジュールをインポートします
import { NextRequest, NextResponse } from "next/server"; // Next.jsのリクエストとレスポンスを扱うためのモジュール
import prisma from "@/_lib/Prisma"; // Prismaクライアントをインポートしてデータベース操作を行う
import bcrypt from "bcrypt"; // パスワードのハッシュ化に使用するbcryptモジュール
import { validationRegistSchema } from "@/validationSchema"; // バリデーションスキーマをインポート

// POSTリクエストを処理する非同期関数を定義します
export async function POST(req: NextRequest) {
    // リクエストのボディからデータを取得します
    const data = await req.json();
    const { email, password } = data; // データからemailとpasswordを抽出

    // メールアドレスの重複確認とバリデーションを同時に行います
    const [user, validationResult] = await Promise.all([
        prisma.user.findFirst({ where: { email } }), // データベースからメールアドレスが既に存在するか確認
        validationRegistSchema.safeParseAsync(data) // データのバリデーションを実行
    ]);

    // バリデーション結果に基づいてエラーを格納するオブジェクトを作成
    let errors = validationResult.success ? {} : validationResult.error.flatten().fieldErrors;
    // メールアドレスが既に存在する場合、エラーを追加
    if (user) {
        errors.email = [...(errors.email || []), "このメールアドレスは既に使用されています"];
    }

    // エラーが存在する場合、400ステータスでエラーメッセージを返す
    if (Object.keys(errors).length > 0) {
        return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    // パスワードをハッシュ化してユーザーを作成
    const hashedPassword = await bcrypt.hash(password, 10); // パスワードをハッシュ化
    await prisma.user.create({
        data: {
            email: email, // ユーザーのメールアドレス
            password: hashedPassword, // ハッシュ化されたパスワード
            username: email.split('@')[0], // ユーザー名をメールアドレスのローカル部分から生成
        },
    });

    // ユーザー作成が成功した場合、201ステータスで成功メッセージを返す
    return new NextResponse(JSON.stringify({ message: "Success" }), { status: 201 });
}