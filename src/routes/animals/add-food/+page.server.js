import { pb } from "$lib/pocketbase";

async function getAnimals(user) {
    const animals = await pb.collection('animals').getFullList({
        filter: `owner="${user}"`,
        fields: "id, name"
    });

    return animals;
}

export async function load({ locals }) {
    const user = locals.pb.authStore.model.id;

    return {
        record: await getAnimals(user)
    }
}