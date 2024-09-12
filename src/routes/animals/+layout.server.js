import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
    if(!cookies.get('pb_auth')) { // not sure why locals seems to cause a race condition thing
        redirect(303, '/login')
    }
}