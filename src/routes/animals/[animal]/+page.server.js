import { pb } from '$lib/pocketbase';

async function getFeedings(animal) {
	const record = await pb.collection('feedings').getFullList({
		filter: `animal="${animal}"`,
		sort: '-created'
	});

	return record;
}

async function getName(animal) {
	const record = await pb.collection('animals').getFirstListItem(`id="${animal}"`, {
		fields: 'name'
	});

	return record.name;
}

export async function load({ params }) {
	return {
		feedings: getFeedings(params.animal), //Change this to not be await
		name: await getName(params.animal)
	};
}
