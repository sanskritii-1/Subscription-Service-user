import mongoose, {CallbackError, Document} from "mongoose";
import bcrypt from "bcryptjs";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email id
 *         name:
 *           type: string
 *           description: The user's name
 *         password:
 *           type: string
 *           description: The user's hashed password
 *       example:
 *         email: johndoe@gmail.com
 *         name: John Doe
 *         password: 5f4dcc3b5aa765d61d8327deb882cf99
 */
export interface IUser extends Document{
    email: string,
    name: string,
    password: string,
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    name:{
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    
},
{
    timestamps: true,
})


// hashing password before storing it in db
userSchema.pre<IUser>('save', async function(next){
    const user = this;


    if(!user.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);

        user.password = hashedPassword;

        next();
    }
    catch(err){
        console.log(err);
        next(err as CallbackError);
    }
})


// checks if user entered password matches the password stored in db
userSchema.methods.comparePassword = async function(candidatePassword:string): Promise<boolean>{
    return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;