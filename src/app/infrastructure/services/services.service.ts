import { HttpClient } from "../utils";
import { IGetServiceRequest } from "@/app/core/application/dto/servicice/service-request.dto";
import { IServiceResponse } from "@/app/core/application/dto/servicice/service-response.dto";
export class ServicesService {

  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }


  
  findAll(page: number, size: number, token: string) {
    try {
      const response = this.httpClient.get<IServiceResponse>(`services?page=${page}&size=${size}`, token);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }





  //   async getVacancieById(id: string) {
  //     const { data: session } = useSession(); 

  //     if (!session || !session.accessToken) {
  //       throw new Error("No hay token de autenticación disponible.");
  //     }

  //     const token = session.accessToken;

  //     try {
  //    
  //       const vacants = await this.httpClient.get<IServiceRequest>(`vacants/${id}`, token);
  //       console.log(vacants);
  //       return vacants;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }
}
