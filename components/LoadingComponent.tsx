import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #fff;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */

    div {
        min-width: 10rem;
        &::after {
            display: inline-block;
            animation: dotty steps(1, end) 1s infinite;
            content: '';
        }
    }

    @keyframes dotty {
        0% {
            content: '';
        }
        25% {
            content: '.';
        }
        50% {
            content: '..';
        }
        75% {
            content: '...';
        }
        100% {
            content: '';
        }
    }
`;

const LoadingComponent = () => {
    return (
        <Container>
            <div>Loading</div>
        </Container>
    );
};

export default LoadingComponent;
