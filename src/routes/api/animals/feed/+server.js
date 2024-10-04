import { pb } from '$lib/pocketbase';

export async function GET({ request, locals }) {
    const user = locals.pb.authStore.model.id;
    //const { animal, food } = await request.json();
    //const record = await pb.collection('animals').getFirstListItem(`owner="${user}"`, {
    //    filter: `name="${animal}"`
    //});
    // All this shit just to get the animal id smh
    //const animalId = record.id;
    
    const data = {
        "food": "placeholder",
        "animal": "n4goymvcbg31puy"
    };

    const feedRecord = await pb.collection("feedings").create(data);
    
    return new Response(null, { status: 204 });
}