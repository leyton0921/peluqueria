"use client"
import { useState } from "react";
import styles from "./serviceManagement.module.scss";
import { IServiceResponse } from "@/app/core/application/dto/servicice/service-response.dto";
import Pagination from "@/UI/molecules/pagination/pagination";
import FormModalServices from "../modalFormAddServices/modalFormAddServices";

interface IProps {
    data: IServiceResponse;
    token: string;
}

const ServiceManagement = ({ data, token }: IProps) => {
  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddServiceClick = () => {
        setIsModalOpen(true); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    return (
        <div className={styles.container}>
            <h3>Servicios</h3>
            <div className={styles.services}>
                {data.content.map((service) => (
                    <div className={styles.service} key={service.id}>
                        <div className={styles.serviceInfo}>
                            <p className={styles.serviceName}>{service.name}</p>
                            <p className={styles.serviceTime}>{service.description}</p>
                        </div>
                        <div className={styles.servicePrice}>$ {service.price}</div>
                    </div>
                ))}
            </div>

            <div>
                <Pagination data={data} />
            </div>


            <button 
                className={styles.addButton} 
                onClick={handleAddServiceClick}
            >
                ✂ Añadir Servicio
            </button>


            {isModalOpen && (
                <FormModalServices 
                    token={token} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default ServiceManagement;
