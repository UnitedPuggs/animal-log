import { pb } from '$lib/pocketbase'
import { redirect } from '@sveltejs/kit';

export const actions = {
    add: async({ locals, request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);
        const email = locals.pb.authStore.model.id;
        
        const dates = Object.keys(data).filter(keys => keys != "name" && keys != "description");
        
        const pb_data = { 
            "name": data["name"],
            "owner": email,
            "description": data["description"],
            "dates": dates
        };

        const record = await pb.collection("animals").create(pb_data);

        throw redirect(302, "/animals")
    }
}