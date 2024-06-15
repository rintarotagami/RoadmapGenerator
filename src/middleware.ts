import { withAuth } from "next-auth/middleware"

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: '/signin',
    }
})

export const config = {
    matcher: [
        '/roadmap/create',
        '/roadmap/test',
    ]
}