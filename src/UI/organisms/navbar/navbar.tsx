"use client"
import styles from "./navbar.module.scss"
import Link from "next/link"
import { usePathname } from "next/navigation";


const NavBar = ()=>{
    const currentPath = usePathname();

    return(
        <nav className={styles.Nav}>
            <Link href="/citas" className={`${styles.link} ${currentPath === "/dashboard/citas"?styles.active: ""}`}>Citas</Link>
            <Link href="/dashboard/services"className={`${styles.link} ${currentPath === "/dashboard/services"?styles.active: ""}`}>Servicios</Link>
            <Link href="/clientes" className={`${styles.link} ${currentPath === "/dashboard/clientes"?styles.active: ""}`}>Clientes</Link>
        </nav>
    )
}

export default NavBar