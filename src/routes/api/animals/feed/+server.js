import { pb } from '$lib/pocketbase';

export async function GET({ url, locals }) {
    const user = locals.pb.authStore.model.id;
    const animal = url.searchParams.get("animal");
    const record = await pb.collection('animals').getFirstListItem(`owner="${user}"`, {
        filter: `name~"${animal}"`
    });

    // All this shit just to get the animal id smh
    const animalId = record.id;
    
    const data = {
        "food": "Food",
        "animal": animalId
    };

    const feedRecord = await pb.collection("feedings").create(data);
    console.log(feedRecord);

    return new Response(null, { status: 204 });
}