import styles from "./serviceManagement.module.scss";
import { IServiceResponse } from "@/app/core/application/dto/servicice/service-response.dto";

interface IProps{
    data: IServiceResponse
}

const ServiceManagement = ({data}:IProps) => {
    return (
        <div className={styles.container}>
            <h3>Servicios</h3>
            <div className={styles.services}>
                {data.content.map((service)=>(
                               <div className={styles.service } key={service.id}>
                               <div className={styles.serviceInfo}>
                                   <p className={styles.serviceName}>{service.name}</p>
                                   <p className={styles.serviceTime}>{service.description}</p>
                               </div>
                               <div className={styles.servicePrice}>{service.price}</div>
                           </div>
                ))}
     
            </div>
            <button className={styles.addButton}>✂ Añadir Servicio</button>
        </div>
    );
};

export default ServiceManagement;
