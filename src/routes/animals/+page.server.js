import { pb } from '$lib/pocketbase';

async function getAnimals(user) {
    const record = await pb.collection("animals").getFullList({
        filter: `owner="${user}"`
    });

    return record;
}

async function getFeedings(user) {
    const record = await pb.collection("feedings").getList(1, 10, {
        filter: `animal.owner.id="${user}"`,
        expand: 'animal.owner',
        sort: '-created'
    });

    return record.items;
}

export async function load({ locals }) {
    return { 
        animals: getAnimals(locals.pb.authStore.model.id),
        feedings: getFeedings(locals.pb.authStore.model.id)
    }
}