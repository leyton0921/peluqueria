"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";  
import { FormField } from "@/UI/molecules";
import * as yup from "yup";
import { ServicesService } from "@/app/infrastructure/services/services.service";
import styles from "./servicesForm.module.scss";
import { ICreateService } from "@/app/core/application/dto/servicice/service-request.dto";
import { IResponsecreateservice } from "@/app/core/application/dto/servicice/service-response.dto";
import { useRouter } from "next/navigation";
import {
    ErrorResponse,
    FieldError
} from "@/app/core/application/dto";
import { IoIosCloseCircleOutline } from "react-icons/io";

const serviceSchema = yup.object().shape({
    name: yup.string().required("El nombre del servicio es obligatorio"),
    price: yup
        .number()
        .typeError("El precio debe ser un número")
        .positive("El precio debe ser un valor positivo")
        .required("El precio es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
});

interface FormCreateServicesProps {
    token: string; 
    onClose: ()=>void
}

const FormCreateServices = ( {token,onClose}:FormCreateServicesProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,  
    } = useForm<ICreateService>({
        resolver: yupResolver(serviceSchema),
        mode: "onChange",
    });

    const router = useRouter();
    const useService = new ServicesService()

    const onSubmit: SubmitHandler<ICreateService> = async (data: ICreateService) => {
        console.log("Datos enviados:", data);
        try {

            const response: IResponsecreateservice = await useService.createService(data,token);
            console.log("Servicio creado:", response);
            router.push("/dashboard/services");
            onClose()
        } catch (error) {
            handleError(error);  
        }
    };

  
    const handleError = (error: unknown) => {
        const errorData = error as ErrorResponse;  
        if (errorData && errorData.errors) {
            if (Array.isArray(errorData.errors) && "field" in errorData.errors[0]) {
                errorData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof ICreateService, {
                        type: "manual",  
                        message: error,
                    });
                });
            } else {
                if ("message" in errorData.errors[0]) {
                    setError("price", {
                        type: "manual",
                        message: errorData.errors[0].message,
                    });
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
            <button onClick={onClose} className={styles.close}><IoIosCloseCircleOutline size={25}/></button>
            <div className={styles.campos}>
                <FormField<ICreateService>
                    control={control}
                    name="name"
                    label="Nombre del servicio"
                    placeholder="Nombre del servicio"
                    error={errors.name}
                    type="text"
                />
                <FormField<ICreateService>
                    control={control}
                    name="price"
                    label="Precio "
                    placeholder="Precio"
                    type="number"
                    error={errors.price}
                />
                <FormField<ICreateService>
                    control={control}
                    name="description"
                    label="Descripción del servicio"
                    placeholder="Descripción del servicio"
                    error={errors.description}
                    type="text"

                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Añadir Servicio
            </button>
        </form>
    );
};

export default FormCreateServices;
