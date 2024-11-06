import { IPauth } from "@/app/core/application/ports";
import { ILoginRequest,ILoginResponse } from "@/app/core/application/dto";
import { HttpClient } from "../utils";

export class AuthService implements IPauth{
    private clientHttp :HttpClient;
    private basePath: string ="auth";

    constructor(){
        this.clientHttp = new HttpClient()
    }

    async login(req:ILoginRequest):Promise<ILoginResponse>{
        return this.clientHttp.post<ILoginResponse,ILoginRequest >(
            `${this.basePath}/login`,
            req
        )
    }
}