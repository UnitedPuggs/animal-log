import { redirect } from '@sveltejs/kit';
import { REDIRECT_URL } from '$env/static/private';
import { pb } from '$lib/pocketbase.js';

export const load = async ({ locals, url }) => {
	if (locals.pb.authStore.model) {
		return redirect(303, '/animals');
	}

	const authMethods = await pb.collection('users').listAuthMethods();
	const fail = url.searchParams.get('fail') === 'true';

	return { providers: authMethods.oauth2.providers, fail };
};

export const actions = {
	login: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (err) {
			console.log(`error ${err}`);
			return {
				error: true,
				email: data.email
			};
		}

		throw redirect(303, '/animals');
	},
	google: async ({ locals, cookies }) => {
		const provider = (await locals.pb.collection('users').listAuthMethods()).oauth2.providers.find(
			(p) => p.name === 'google'
		);
		cookies.set('provider', JSON.stringify(provider), {
			httpOnly: true,
			path: '/auth/callback/google'
		});

		throw redirect(303, provider.authUrl + REDIRECT_URL + provider.name);
	},
	logout: async ({ locals }) => {
		await locals.pb.authStore.clear();
		throw redirect(303, '/animals');
	}
};
