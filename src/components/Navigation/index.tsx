import Link from "next/link";
import Logout from "./Logout";
import UserLabel from "./UserLabel";

export default async function Navbar() {
    return (
        <div className="flex flex-wrap items-center justify-between bg-slate-100 p-2">
            <div className="flex gap-2">
                <Link href="/">Quiz App</Link>
                <UserLabel />
                <Link href="/users">Все пользователи</Link>
            </div>
            <Logout />
        </div>
    )
}
