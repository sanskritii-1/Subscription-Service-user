import mongoose,{Document} from "mongoose"

/**
 * @swagger
 * components:
 *  schemas:
 *      Resource:
 *          type: object
 *          required:
 *              - title
 *              - blur_url
 *          properties:
 *              title:
 *                  type: string
 *                  description: The resource/picture's heading
 *              description:
 *                  type: string
 *                  description: The resource/picture's description
 *              blur_url:
 *                  type: string
 *                  description: The blur resource/picture's url
 *          example:
 *              title: Sunset
 *              description: A beautiful sunset by the beach
 *              blur_url: https://s3.com/blursunsetpic.jpg
 */
export interface IResource extends Document{
    title: string,
    description: string,
    url: string,
    blur_url: string,
}

const resourceSchema = new mongoose.Schema<IResource>({
    title: {
        type: String,
        required:true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    blur_url: {
        type: String,
        required: true,
        unique: true,
    }
})


const Resource = mongoose.model<IResource>('Resource', resourceSchema);

export default Resource;