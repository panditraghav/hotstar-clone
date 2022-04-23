import { useRouter } from "next/router"

interface Props {
    name: string,
    link: string
}

export default function BtnPrimary(props: Props) {
    const router = useRouter();
    return (
        <button
            onClick={()=> router.push(props.link)}
            className="ml-3 bg-brand-blue text-xs font-bold font-sans rounded-md py-[1px] px-3"
        >
            {props.name}
        </button>
    )

}