
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check for the presence of the auth cookie
    // Note: The actual validation happens on the backend or client-side /user/me call
    // This is just a preliminary check to avoid loading the app if obviously not logged in
    const token = request.cookies.get('token'); // Adjust cookie name if known, or monitor network
    // If backend uses a different name (e.g. 'connect.sid' or 'jwt'), this needs updating.
    // Assuming 'token' or 'jwt' for now. If unknown, we might skip this strict check 
    // and rely on AuthProvider's client-side redirect.

    // For now, let's just log and pass through, or basic protection if we knew the name.
    // Since we don't know the exact cookie name the backend sets (User didn't provide it),
    // and cookies are HttpOnly, we can see them here.

    // Let's rely on AuthProvider for the logic for now to avoid blocking valid users if name is wrong.
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
