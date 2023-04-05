import styled from 'styled-components';

export const Wrapper = styled.div`
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

    @media only screen and (min-width: 600px) {
        width: 50vw;
        max-width: 100rem;
    }
`;

export const Form = styled.div`
    text-align: left;
    margin-top: 2rem;
    padding: 2rem;
    background-color: #f7f7f7;
    margin: 3rem auto;
    position: relative;

    @media only screen and (min-width: 600px) {
        width: 45rem;
    }

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
    flex-flow: column-reverse;

    @media only screen and (min-width: 600px) {
        flex-flow: row;
        margin-bottom: 2rem;

        .info {
            max-width: 20rem;
            margin-right: 2rem;

            h2 {
                margin-top: 0;
            }

            label {
                input {
                    width: 15rem;
                }
            }
        }

        .order {
            height: 100%;
        }

        &.footer {
            justify-content: space-between;
        }
    }

    &.footer {
        flex-flow: column;
        min-height: 6rem;
        justify-content: flex-end;
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

    .info {
        h2 {
            margin-top: 2rem;
        }

        p {
            font-size: 0.8rem;
            margin: 0;
            padding-bottom: 1rem;
        }

        label {
            margin: 0.5rem;

            input {
                margin-left: 0.5rem;
                padding: 0.25rem;
                width: 10rem;
            }
        }
    }

    .order {
        min-height: 11rem;
    }
`;
