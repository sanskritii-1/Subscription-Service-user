import { config } from "../config/appConfig";

export const getAcessTokenSecret = ():string => {
    if(!config.ACCESS_TOKEN_SECRET){
        throw new Error("Access Token Secret not set");
    }
    
    return config.ACCESS_TOKEN_SECRET;
}
