import { Data } from '@/types';
import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    height: 100vh;
    width: 100vw;

    img {
        object-fit: cover;
    }
`;

const HeroImage = ({ item }: { item: Data }) => {
    return (
        <Container>
            <span>{item.title}</span>
            <Image
                src={item.image.url ?? ''}
                alt={item.image.fileName ?? ''}
                fill
            />
        </Container>
    );
};

export default HeroImage;
