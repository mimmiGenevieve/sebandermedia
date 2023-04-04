import { useEffect, useState } from 'react';
import paintings from 'constants/formData.json';
import styled from 'styled-components';

type Option = {
    size: string;
    copies: number;
    price: number;
};

type Material = {
    material: string;
    options: Option[];
};

interface Painting {
    name: string;
    options: Material[];
}

const Wrapper = styled.div`
    max-width: 100rem;
    width: 50vw;
    margin: 0 auto;
    text-align: center;
    padding: 5rem 0;

    h1,
    p {
        margin: 1rem;
    }
`;

const Form = styled.form`
    text-align: left;
    margin-top: 2rem;
    padding: 2rem;
    background-color: #f7f7f7;
    max-width: 50rem;
    margin: 3rem auto;

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

        &:hover {
            background-color: #474747;
        }
    }
`;

const Group = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    div {
        flex: 1;
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

type FormProps = {
    [id: string]: any;
    name: string;
    address: {
        [id: string]: string;
        street: string;
        zipCode: string;
        city: string;
    };
    email: string;
};

type InputProps = {
    label: string;
    value: string;
    onChange: (e: any) => void;
    id: string;
};

const inputs = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'street',
        label: 'Street',
    },
    {
        id: 'zipCode',
        label: 'Zip Code',
    },
    {
        id: 'city',
        label: 'City',
    },
    {
        id: 'email',
        label: 'Email',
    },
];

const Input = ({ label, value, onChange, id }: InputProps) => {
    return (
        <label htmlFor={id}>
            <span>{label}:</span>
            <input
                id={id}
                name={id}
                type={id === 'email' ? 'email' : 'text'}
                value={value}
                onChange={onChange}
                required
            />
        </label>
    );
};

export default function OrderForm() {
    const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
        null
    );
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
        null
    );
    const [selectedSize, setSelectedSize] = useState<Option | null>(null);
    const [form, setForm] = useState<FormProps>({
        name: '',
        address: {
            street: '',
            zipCode: '',
            city: '',
        },
        email: '',
    });
    const [message, setMessage] = useState('');

    function handleMaterial(material: string) {
        const findMaterial = selectedPainting?.options.find(
            (item) => item.material === material
        );

        setSelectedMaterial(findMaterial ?? null);
    }

    function handleSize(size: string) {
        const findSize = selectedMaterial?.options.find(
            (item) => item.size === size
        );

        setSelectedSize(findSize ?? null);
    }

    function handlePainting(painting: string) {
        const findPainting = paintings?.find(
            (item) => item.name === painting
        ) as Painting;

        setSelectedPainting(findPainting ?? null);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        setForm((prevForm: any) => {
            if (name === 'street' || name === 'zipCode' || name === 'city') {
                return {
                    ...prevForm,
                    address: {
                        ...prevForm.address,
                        [name]: value,
                    },
                };
            }

            return {
                ...prevForm,
                [name]: value,
            };
        });
    };

    const handleSubmit = () => {
        for (const key in form) {
            if (typeof form[key] === 'string' && form[key].trim() === '') {
                setMessage(
                    `${
                        key.charAt(0).toUpperCase() + key.slice(1)
                    } can't be empty`
                );
                return;
            } else if (typeof form[key] === 'object') {
                for (const innerKey in form[key]) {
                    if (
                        typeof form[key][innerKey] === 'string' &&
                        form[key][innerKey].trim() === ''
                    ) {
                        setMessage(
                            `${
                                innerKey.charAt(0).toUpperCase() +
                                innerKey.slice(1)
                            } can't be empty`
                        );
                        return;
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (message.length > 0) setTimeout(() => setMessage(''), 2000);
    }, [message]);

    return (
        <Wrapper>
            <h1>Interested in buying a painting from me?</h1>
            <p>
                Contact me through the form below, or send an email to{' '}
                <a href="mailto:hello@sebandermedia.se">
                    hello@sebandermedia.se
                </a>
            </p>

            <Form>
                <Group>
                    <div className="info">
                        <h2>Your information</h2>
                        {inputs.map(({ id, label }) => (
                            <Input
                                key={id}
                                id={id}
                                label={label}
                                value={
                                    id === 'email' ? form[id] : form.address[id]
                                }
                                onChange={(e) => handleInputChange(e)}
                            />
                        ))}
                    </div>

                    <div>
                        <label>
                            <span>Motif:</span>
                            <select
                                value={selectedPainting?.name ?? 'default'}
                                onChange={(e) => {
                                    handlePainting(e.target.value);
                                    setSelectedMaterial(null);
                                }}
                            >
                                <option value="default" disabled>
                                    Select a material
                                </option>
                                {paintings.map((painting) => (
                                    <option
                                        key={painting.name}
                                        value={painting.name}
                                    >
                                        {painting.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {selectedPainting && (
                            <>
                                <label>
                                    <span>Material:</span>
                                    <select
                                        value={
                                            selectedMaterial?.material ??
                                            'default'
                                        }
                                        onChange={(e) => {
                                            handleMaterial(e.target.value);
                                            setSelectedSize(null);
                                        }}
                                    >
                                        <option value="default" disabled>
                                            Select a material
                                        </option>
                                        {selectedPainting.options.map(
                                            (item) => (
                                                <option
                                                    key={item.material}
                                                    value={item.material}
                                                >
                                                    {item.material}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </label>
                            </>
                        )}

                        {selectedMaterial && (
                            <>
                                <label>
                                    <span>Size:</span>
                                    <select
                                        value={selectedSize?.size ?? 'default'}
                                        onChange={(e) =>
                                            handleSize(e.target.value)
                                        }
                                    >
                                        <option value="default" disabled>
                                            Select a size
                                        </option>
                                        {selectedMaterial.options.map(
                                            (item) => (
                                                <option
                                                    key={item.size}
                                                    value={item.size}
                                                >
                                                    {item.size} (limited print
                                                    of {item.copies})
                                                </option>
                                            )
                                        )}
                                    </select>
                                </label>
                            </>
                        )}
                    </div>
                </Group>
                <span className="error">{message}</span>
                <button type="button" onClick={() => handleSubmit()}>
                    Submit
                </button>
            </Form>
        </Wrapper>
    );
}
