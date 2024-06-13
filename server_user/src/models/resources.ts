import mongoose,{Document} from "mongoose"

export interface IResource extends Document{
    title: string,
    description: string,
    url: string,
}

const resourceSchema = new mongoose.Schema<IResource>({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    }
})


const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;