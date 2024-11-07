import ServiceManagement from "@/UI/organisms/serviceManagement/serviceManagement"
import { ServicesService } from "@/app/infrastructure/services/services.service";
import { DefaultSession } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "../../../../../styles/global.scss"
import FormModalServices from "@/UI/organisms/modalFormAddServices/modalFormAddServices";

interface Session extends DefaultSession {
    user: {
        id ?: string;
        token ?: string;
        name ?: string | null;
        email ?: string | null;
        image ?: string | null;
    };
}
interface IProps {
    searchParams: Promise<{
        page: string;
        size: string;
    }>;
}


export default async function ServicesPage({ searchParams }: IProps) {

    const params = await searchParams;

    const page = params.page ? parseInt(params.page) : 1;
    const size = params.size ? parseInt(params.size) : 3;

    const useService = new ServicesService()
    const session = await getServerSession(authOptions) as Session;
    if (!session) {
        return <div>Loading...</div>
    }
    const token = session.user.token as string;
    const data = await useService.findAll(size, page, token)

    return (
        <div className="container-services" >
            <ServiceManagement data={data} token={token} />
        </div>
    )
}
