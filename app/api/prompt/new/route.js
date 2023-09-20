import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
/**
 * Handles a POST request by connecting to a MongoDB database, creating a new prompt object based on the request body,
 * saving it to the database, and returning a response with the newly created prompt.
 * 
 * @param {object} request - The request object containing the request body, which should have `userId`, `prompt`, and `tag` properties.
 * @returns {object} - The response object containing the newly created prompt object as the body and a status code of 201 if successful,
 * or an error message and a status code of 500 if there is an error.
 * Output: Response { status: 201, body: '{"creator":"123","prompt":"Write a story","tag":"fiction"}' }
 */
export const POST = async (request) => {
    // grab the request body
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save(); // save it to the database
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
