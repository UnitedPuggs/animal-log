import { pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';

async function getAnimals(user) {
	const animals = await pb.collection('animals').getFullList({
		filter: `owner="${user}"`,
		fields: 'id, name'
	});

	return animals;
}

export const actions = {
	add: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		console.log(data);
		const date = data.fed ? new Date(data.fed) : new Date();

		const feed_data = {
			food: data.food,
			animal: data.animal,
			fed: date
		};

		const addFeed = await pb.collection('feedings').create(feed_data);
		const updateLastFed = await pb.collection('animals').update(`${data.animal}`, {lastFed: date});

		throw redirect(302, '/animals');
	}
};

export async function load({ locals, url }) {
	const user = locals.pb.authStore.model.id;
	const animal = url.searchParams?.get('animal');
	const date = url.searchParams?.get('date') || new Date(); // feeds are either today or from scheduled feeds

	return {
		record: await getAnimals(user),
		animal,
		date
	};
}
