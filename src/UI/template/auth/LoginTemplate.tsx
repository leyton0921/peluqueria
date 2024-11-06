import { LoginForm } from "@/UI/organisms"
import styles from "./LoginTemplate.module.scss"

export const LoginTemplate = ()=>{
return(
    <div className={styles.container}>
      
        <LoginForm/>
        
    </div>
)
}