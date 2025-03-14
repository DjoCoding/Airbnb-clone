import useAuth from "../../../../hooks/auth/useAuth"
import DataItem from "./Data/DataItem";


export default function Data() {
    const { user } = useAuth();

    return(
        <div className="flex flex-col gap-3 w-full px-3 py-2">
            <DataItem isEditable={true} name="first name" field="firstname" value={user.firstname}/>
            <DataItem isEditable={true} name="last name"  field="lastname" value={user.lastname}/>
            <DataItem isEditable={true} name="email"      field="email" value={user.email} />
            <DataItem isEditable={false} name="user since" value={user.createdAt} />
        </div>
    )
}