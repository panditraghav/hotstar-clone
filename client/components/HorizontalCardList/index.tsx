import Card from "../Card"
import CardSlider from "./CardSlider"

interface Props {
    categoryTitle: string
}

export default function HorizontalCardList({ categoryTitle }: Props) {
    return (
        <div className="w-full my-8 text-white ">
            <h3 className="font-medium text-xl mb-4 pl-6">{categoryTitle}</h3>
            <CardSlider cardWidth={128} slideFactor={3} gap={8}>
                <Card width={128} height={176} image="/images/bala.webp" title="Bala" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/bhuj.webp" title="Bhuj" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/chichhore.webp" title="Chichhore" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/human.webp" title="Human" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/junglee.webp" title="Junglee" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/moonknight.webp" title="Moon Knight" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/rudra.webp" title="Rudra" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/tanhaji.webp" title="Tanhaji" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/turning-red.webp" title="Turning Red" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/moonknight.webp" title="Moon Knight" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/chichhore.webp" title="Chichhore" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/tanhaji.webp" title="Tanhaji" description="Bala is a blal man with no hair and with one boy"/>
                <Card width={128} height={176} image="/images/bhuj.webp" title="Bhuj" description="Bala is a blal man with no hair and with one boy"/>
            </CardSlider>
        </div>
    )
}