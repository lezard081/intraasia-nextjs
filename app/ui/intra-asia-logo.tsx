import { robotoCondensed } from "@/app/ui/fonts";
import Image from "next/image";

export default function IntraAsiaLogo() {
    return (
        <div
            className={`${robotoCondensed.className} flex flex-row items-center leading-none text-white`}
            >
        <Image 
            src="/intraasia-logo.svg" 
            alt="Intraasia" 
            width={1838} 
            height={388}
            className="w-[30vw] h-auto max-h-10 sm:max-h-12 md:max-h-14 min-w-0"
        />
        </div>
    )
}
