import { robotoCondensed } from "@/app/ui/fonts";
import Image from "next/image";

export default function IntraAsiaLogo() {
    return (
        <div
            className={`${robotoCondensed.className} flex flex-row items-center leading-none text-white w-1/2 md:w-1/2`}
            >
        <Image src="/intraasia-logo.svg" alt="Intraasia" width={1838} height={388} />
        </div>
    )
}