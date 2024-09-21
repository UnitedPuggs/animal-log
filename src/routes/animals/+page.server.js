import { pb } from '$lib/pocketbase';

export async function load({ locals }) {
    const records = await pb.collection("animals").getFullList({
        filter: `owner="${locals.pb.authStore.model.id}"`
    });

    return { records }
}