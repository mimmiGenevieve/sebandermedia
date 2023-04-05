import styled from 'styled-components';
import { Data } from '@/types';
import RenderItem from 'components/RenderItem';
import Logo from 'components/logo';
import { useEffect, useRef, useState } from 'react';
import OrderForm from '@/components/Form';

const Wrapper = styled.div`
    position: relative;
`;

const Title = styled.h1`
    cursor: default;
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: padding 0.1s ease;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    z-index: 9;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    text-align: center;
    padding: 0 2%;

    @media only screen and (min-width: 600px) {
        padding: 2rem;
    }

    svg {
        height: 5rem;
        max-width: 100%;
        transition: height 0.5s ease;
    }

    &.sticky {
        position: fixed;
        top: 0;
        left: 0;
        transform: none;

        @media only screen and (min-width: 600px) {
            padding: 1rem;
        }

        svg {
            height: 2.5rem;
        }
    }
`;

const Home = ({ componentsCollection }: { componentsCollection: any }) => {
    const bloks = componentsCollection;
    const [isSticky, setIsSticky] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const handleScroll = () => {
        if (
            window.pageYOffset > window.innerHeight / 4 &&
            titleRef.current &&
            titleRef.current.getBoundingClientRect().top <= 0
        ) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <Wrapper>
                <Title className={isSticky ? 'sticky' : ''} ref={titleRef}>
                    <Logo />
                </Title>

                {bloks.items.map((item: Data) => (
                    <RenderItem
                        item={item}
                        key={item.title?.replace(' ', '-')}
                    />
                ))}
                <OrderForm />
            </Wrapper>
        </>
    );
};

export async function getStaticProps() {
    const response = await fetch(
        'http://localhost:3000/api/graphql?type=landingpage'
    );
    const data = await response.json();

    return { props: data.pageCollection.items[0] };
}

export default Home;
