import { redirect } from '@sveltejs/kit'

export function load({locals}) {
    if(!locals.pb.authStore.modal) {
        return redirect(303, '/login')
    }
}