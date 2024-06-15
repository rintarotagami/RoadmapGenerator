import React from "react";
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import ProfileToggleButton from '../../elements/button/header_profile';
import ConfigButton from '../../elements/button/header_config';
import SigninButton from '../../elements/button/header_signin';
import SignupButton from '../../elements/button/header_signup';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from "@/config/authOptions"; // authOptions の正しいパスを指定してください

interface AuthToggleWrapProps {
    isLoggedIn: boolean;
}

export default function AuthToggleWrap({ isLoggedIn }: AuthToggleWrapProps) {
    const { data: session, status } = useSession()

    return (
        <div className="flex items-center justify-end">
            {isLoggedIn ? (
                <>
                    <ProfileToggleButton />
                    <ConfigButton />
                </>
            ) : (
                <>
                    <SigninButton />
                    <SignupButton />
                </>
            )}
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session: Session | null = await getServerSession(context.req, context.res, authOptions);
    return {
        props: {
            isLoggedIn: !!session?.user,
        },
    };
}
