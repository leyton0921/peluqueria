import { ILoginRequest, ILoginResponse } from "../dto";

export interface IPauth{
    /**
     * 
     * @param {ILoginRequest} 
     * @param {ILoginResponse} 
     * @returns {Promise<ILoginResponse>}
     * @throws {Error}
     * 
     */
    login(req:ILoginRequest):Promise<ILoginResponse>
}