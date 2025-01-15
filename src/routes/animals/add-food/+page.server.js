import { pb } from "$lib/pocketbase";
import { redirect } from "@sveltejs/kit";

async function getAnimals(user) {
    const animals = await pb.collection('animals').getFullList({
        filter: `owner="${user}"`,
        fields: "id, name"
    });

    return animals;
}

export const actions = {
    add: async({ locals, request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);
        const DATE = data.fed ? new Date(data.fed) : new Date();

        const feed_data = {
            "food": data.food,
            "animal": data.animal,
            "fed": DATE
        };

        const record = await pb.collection('feedings').create(feed_data);

        const extdata = {
            "lastFed": DATE
        }

        const feed = await pb.collection('animals').update(`${data.animal}`, extdata)

        throw redirect(302, '/animals')
    }
}

export async function load({ locals, url }) {
    const user = locals.pb.authStore.model.id;
    const animal = url.searchParams?.get('animal')

    //Maybe I can use URL params and set the 'selected', so when the nfc sticker is scanned it'll have the animal selected.
    return {
        record: await getAnimals(user),
        animal
    }
}