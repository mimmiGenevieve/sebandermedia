import { Data } from '@/types';
import React from 'react';
import Carousel from './Carousel';
import HeroImage from './HeroImage';

type Props = {
    item: Data;
};

const RenderItem: React.FC<Props> = ({ item }) => {
    if (item.__typename === 'Carousel') {
        return <Carousel item={item} />;
    }
    if (item.__typename === 'HeroImage') {
        return <HeroImage item={item} />;
    }

    return null;
};

export default RenderItem;
