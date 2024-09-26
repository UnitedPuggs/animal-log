import { redirect } from '@sveltejs/kit'
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights();

export function load({locals}) {
    if(!locals.pb.authStore.modal) {
        return redirect(303, '/login')
    }
}