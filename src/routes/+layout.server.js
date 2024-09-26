import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights();

export const load = async({ locals }) => {
    const user = locals.pb.authStore.model;
    
    return { user: structuredClone(user) }
}