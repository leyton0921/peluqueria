"use client"
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaCog } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import styles from "./head.module.scss"

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>Beauty Salon</h1>
            </div>
            <div className={styles.actions}>
                {session && (
                    <>
                        <button className={styles.adminMode} onClick={() => router.push('/admin')}>
                            <FaCog /> Modo Administrador
                        </button>
                        <button className={styles.logout} onClick={() => signOut()}>
                            <IoLogOutOutline /> Cerrar Sesión
                        </button>
                    </>
                )}
                
            </div>
        </header>
    );
};

export default Header;
