import PocketBase from 'pocketbase'
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";

export const handle = async({ event, resolve }) => {
    event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    try { 
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
    } catch(_) {
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);
    
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ sameSite: "Lax" }));

    return response;
};