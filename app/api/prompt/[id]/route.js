import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
/**
 * Retrieves a prompt from the database.
 * 
 * @param {Object} request - The request object containing information about the HTTP request.
 * @param {Object} params - The params object containing the ID of the prompt.
 * @returns {Object} - The response object containing the retrieved prompt or an error message.
 * @throws {Error} - If any error occurs during the process.
  */
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
/**
 * Updates a prompt in a MongoDB database.
 * @param {object} request - The request object containing the prompt and tag data to be updated.
 * @param {object} params - The parameters object containing the ID of the prompt to be updated.
 * @returns {object} - A response object indicating the success or failure of the update operation.
 *                    If the update is successful, the response will have a status code of 200 and a message of "Successfully updated the Prompts".
 *                    If there is an error during the update operation, the response will have a status code of 500 and a message of "Error Updating Prompt".
  * @throws {Error} - If any error occurs during the process.
  */
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};
