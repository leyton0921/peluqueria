"use client"
import React from "react";
import styles from "./pagination.module.scss";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { IServiceResponse } from "@/app/core/application/dto/servicice/service-response.dto";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    data: IServiceResponse;
}

const Pagination: React.FC<PaginationProps> = ({ data }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Función para manejar el cambio de página
    const onPageChange = (newPage: number) => {
        // Log para depurar y verificar el número de página
        console.log("Navigating to page:", newPage);
        
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        // Cambia la ruta incluyendo el nuevo número de página
        router.push(`/dashboard/services?${params.toString()}`);
    };

    // Calcula la página actual a partir de data.pageable.pageNumber
    const currentPage = data.pageable.pageNumber + 1;

    return (
        <div className={styles.pagination}>
            {/* Botón para ir a la página anterior */}
            <button
                className={styles.paginationButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <MdNavigateBefore />
            </button>

            {/* Muestra el número de página actual y el total de páginas */}
            <span>Página {currentPage} de {data.totalPages}</span>

            {/* Botón para ir a la página siguiente */}
            <button
                className={styles.paginationButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === data.totalPages}
            >
                <MdNavigateNext />
            </button>
        </div>
    );
};

export default Pagination;
