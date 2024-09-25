import { pb } from '$lib/pocketbase';

export async function POST({ request, locals }) {
    const user = locals.pb.authStore.model.id;
    const { animal, food } = await request.json();
    const record = await pb.collection('animals').getFirstListItem(`owner="${user}"`, {
        filter: `name="${animal}"`
    });
    // All this shit just to get the animal id smh
    const animalId = record.id;
    
    const data = {
        "food": food,
        "animal": animalId
    };

    const feedRecord = await pb.collection("feedings").create(data);
    
    return new Response(JSON.stringify(feedRecord));
}