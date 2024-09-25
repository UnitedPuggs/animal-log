import { pb } from '$lib/pocketbase';

async function getFeedings(animal) {
    const record = await pb.collection("feedings").getFullList({
        filter: `animal="${animal}"`,
        sort: '-created',
    });

    return record;
}

export async function load({ params }) {
    return {
        record: await getFeedings(params.animal) //Change this to not be await
    }
}