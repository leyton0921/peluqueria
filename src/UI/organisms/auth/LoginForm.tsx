"use client"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { FormField } from "@/UI/molecules";
import styles from "./LoginForm.module.scss"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
    ErrorResponse,
    FieldError,
    ILoginRequest,
} from "@/app/core/application/dto";

const loginSchema = yup.object()
    .shape({
        userName: yup
            .string()
            .email("el correo es inválido")
            .required("El correo es obligatorio"),
        password: yup
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .required("La contraseña es obligatoria")
    })

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema)
    })

    const router = useRouter()
    const handleLogin = async (data: ILoginRequest) => {
        console.log(data);
        //SERVICE LOGIN
        try {
            const result = await signIn("credentials", {
                redirect: false,
                username: data.userName,
                password: data.password,
            });

            console.log(result);

            if (result?.error) {
                console.log("Ocurrio un error", JSON.parse(result.error));
                handleError(JSON.parse(result.error))
                return;
            }
            router.push("/dashboard/services")
        } catch (error) {
            console.log(error);
        }
    };

    const handleError = (error: unknown) => {
        const erroData = error as ErrorResponse;
        if (erroData && erroData.errors) {
            if (Array.isArray(erroData.errors) && "field" in erroData.errors[0]) {
                erroData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof ILoginRequest, {
                        message: error,
                    });
                });
            } else {
                if ("message" in erroData.errors[0]) {
                    setError("userName", {
                        message: erroData.errors[0].message,
                    });
                }
            }
        }
    };

    return (
        <form action="" onSubmit={handleSubmit(handleLogin)} className={styles.Form}>
            <h2>Iniciar sesión</h2>
            <div className={styles.campos}>
                <FormField<ILoginRequest>
                    control={control}
                    type="email"
                    label="Correo Electrónico"
                    name="userName"
                    error={errors.userName}
                    placeholder="Ingresa tu correo"
                />

                <FormField<ILoginRequest>
                    control={control}
                    type="password"
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    placeholder="Ingresa tu contraseña"
                />
            </div>

            <button type="submit">Iniciar sesión</button>

            <div className={styles.linkContainer}><Link href="/" className={styles.Link}>¿No tienes una cuenta?Registrate</Link></div>
        </form>
    )
}