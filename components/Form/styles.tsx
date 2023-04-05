import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 100rem;
    width: 50vw;
    margin: 0 auto;
    text-align: center;
    padding: 5rem 0;

    h1,
    p {
        margin: 1rem;
    }

    #form {
        display: none;
    }
`;

export const Form = styled.div`
    text-align: left;
    margin-top: 2rem;
    padding: 2rem;
    background-color: #f7f7f7;
    margin: 3rem auto;
    width: 45rem;

    .error {
        color: red;
        display: block;
        padding-bottom: 1rem;
    }

    h2 {
        font-size: 1.2em;
        font-weight: bold;
    }

    label {
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            min-width: 7rem;
        }
    }

    button {
        background-color: #333;
        color: #f7f7f7;
        padding: 0.5rem 1rem;
        border: none;
        font-size: 0.75rem;
        cursor: pointer;
        width: 5rem;

        &:hover {
            background-color: #474747;
        }
    }
`;

export const Group = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

    &.footer {
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 0;

        div {
            min-height: 5rem;
            display: flex;
            flex-flow: column;
            justify-content: flex-end;
        }
    }

    option:disabled {
        color: #ccc;
    }

    select {
        padding: 0.5rem;
        border: none;
        border: 1px solid #333;
        background-color: #ffffff;
        color: #333;
        margin: 0.5rem 1rem;
        width: 10rem;
    }

    select:focus {
        outline: none;
        border-radius: 0;
    }

    .order {
        height: 100%;
        min-height: 10rem;
    }

    .info {
        max-width: 20rem;
        margin-right: 2rem;
        label {
            margin: 0.5rem;

            input {
                margin-left: 0.5rem;
                padding: 0.25rem;
                width: 15rem;
            }
        }
    }
`;
