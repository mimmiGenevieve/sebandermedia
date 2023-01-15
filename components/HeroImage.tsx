import { Data } from '@/types'
import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
`

const HeroImage = ({ item }: { item: Data }) => {
    console.log(item)

    return (
        <Container>
            <span>{item.title}</span>
            <Image
                src={'http:' + item.imageUrl ?? ''}
                alt={item.title ?? ''}
                fill
            />
        </Container>
    )
}

export default HeroImage
