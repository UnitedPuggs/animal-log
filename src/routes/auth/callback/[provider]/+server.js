import { redirect } from "@sveltejs/kit";
import { REDIRECT_URL } from '$env/static/private'

export const GET = async({ locals, url, cookies }) => {
    const provider = JSON.parse(cookies.get('provider') || '{}');

    if(provider.state !== url.searchParams.get('state')) {
        throw new Error("State params don't match");
    }

    try { 
        await locals.pb.collection('users').authWithOAuth2Code(
            provider.name,
            url.searchParams.get('code') || '',
            provider.codeVerifier,
            REDIRECT_URL + provider.name
        );
    } catch(error) {
        console.error(error);
        return redirect(303, "/login?fail=true");
    }

    throw redirect(303, '/animals');
}