import FormCreateServices from "../services/servicesForm";
import Overlay from "@/UI/atoms/overlay/overlay";

interface IProps {
    token: string; 
    onClose:()=>void
}


const FormModalServices = ({token,onClose}:IProps)=>{
    return (
        <Overlay>
            <FormCreateServices token={token} onClose={onClose}/>
        </Overlay>
    )
}

export default FormModalServices