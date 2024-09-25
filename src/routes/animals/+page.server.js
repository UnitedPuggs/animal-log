import { pb } from '$lib/pocketbase';

async function getAnimals(user) {
    const record = await pb.collection("animals").getFullList({
        filter: `owner="${user}"`
    });

    return record;
}

export async function load({ locals }) {
    return { 
        records: await getAnimals(locals.pb.authStore.model.id)
    }
}