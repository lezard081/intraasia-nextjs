import { robotoCondensed } from "@/app/ui/fonts";
import Image from "next/image";

export default function IntraAsiaLogo() {
    return (
        <div
            className={`${robotoCondensed.className} flex flex-row items-center leading-none text-white p-0 m-0`}
        >
        <Image
            src="/intraasia-logo.svg" 
            alt="Intraasia" 
            width={1838} 
            height={388}
            className="w-[30vw] h-auto max-h-[16vw] sm:max-h-[14vw] md:max-h-[18.8vw] min-w-0 p-0 m-0"
        />
        </div>
    )
}
