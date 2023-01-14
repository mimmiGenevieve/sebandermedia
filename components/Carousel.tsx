import { Data } from '@/types'

const Carousel = ({ item }: { item: Data }) => {
    console.log(item)

    return <span>{item.title}</span>
}

export default Carousel
