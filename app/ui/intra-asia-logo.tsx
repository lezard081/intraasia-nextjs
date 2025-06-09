import { robotoCondensed } from "@/app/ui/fonts";
import Image from "next/image";

export default function IntraAsiaLogo() {
    return (
        <div
            className={`${robotoCondensed.className} flex flex-row items-center leading-none text-white`}
            >
        <Image src="/intraasia-logo.svg" alt="Intraasia logo" width={612} height={136} />
        </div>
    )
}