import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

/**
 * Retrieves prompts created by a user from a MongoDB database.
 * 
 * @param {Object} request - The request object containing information about the HTTP request.
 * @param {Object} params - An object containing parameters passed in the request URL, specifically the `id` of the user.
 * @returns {Object} - A `Response` object with the prompts created by the user as a JSON string and a status code of 200 if the retrieval is successful. 
 *                     A `Response` object with an error message and a status code of 500 if an error occurs during the retrieval process.
 */
export const GET = async (request, { params }) => {
  //the params is the [id] by params.id  
  try {
        await connectToDB()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}
