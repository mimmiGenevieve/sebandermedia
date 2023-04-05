import { FormEvent, useEffect, useRef, useState } from 'react';
import paintings from 'constants/formData.json';
import inputs from 'constants/formInput.json';
import { Wrapper, Form, Group } from './styles';
import { FormProps, Material, Painting, Option } from './interface.js';
import Input from '../Input';
import { makeUpperCase, validateForm } from '@/helpers';
import emailjs from 'emailjs-com';
import LoadingComponent from '../LoadingComponent';

export default function OrderForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<FormProps>({
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            zipCode: '',
            city: '',
        },
        order: {
            painting: null,
            material: null,
            size: null,
        },
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        setForm((prevForm: FormProps) => {
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
        const errors = validateForm(form);

        if (errors.length > 0) {
            setMessage(makeUpperCase(errors.join(', ')) + " can't be empty");
        } else {
            setIsLoading(true);
            formRef?.current?.requestSubmit();
        }
    };

    function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
        emailjs
            .sendForm(
                process.env.serviceID ?? '',
                process.env.templateID ?? '',
                event.target as HTMLFormElement,
                process.env.emaiJSToken ?? ''
            )
            .then(() => {
                setIsSent(true);
                setIsLoading(false);
            });
    }

    const handleOrder = (
        value: string,
        array: Painting[] | Material[] | Option[],
        id: string
    ) => {
        let newOrder = { ...form.order };

        switch (id) {
            case 'painting':
                newOrder = {
                    painting: (array as Painting[]).find(
                        (item: Painting) => item.name === value
                    ),
                    material: null,
                    size: null,
                };
                break;
            case 'material':
                newOrder = {
                    ...newOrder,
                    material: (array as Material[])?.find(
                        (item: Material) => item.material === value
                    ),
                    size: null,
                };
                break;
            default:
                newOrder = {
                    ...newOrder,
                    size: (array as Option[])?.find(
                        (item: Option) => item.size === value
                    ),
                };
                break;
        }

        setForm((prevForm: FormProps) => {
            return {
                ...prevForm,
                order: {
                    ...newOrder,
                },
            };
        });
    };

    useEffect(() => {
        if (message.length > 0) setTimeout(() => setMessage(''), 2000);
    }, [message]);

    return (
        <Wrapper>
            <form
                id="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitInquiry(e);
                }}
                ref={formRef}
            >
                <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    value={form.name}
                    readOnly
                />
                <input
                    type="text"
                    name="user_phone"
                    id="user_phone"
                    value={form.phone}
                    readOnly
                />
                <input
                    type="text"
                    name="painting_name"
                    id="painting_name"
                    value={form.order.painting?.name}
                    readOnly
                />
                <input
                    type="text"
                    name="painting_material"
                    id="painting_material"
                    value={form.order.material?.material}
                    readOnly
                />
                <input
                    type="text"
                    name="painting_size"
                    id="painting_size"
                    value={form.order.size?.size}
                    readOnly
                />
                <input
                    type="text"
                    name="user_email"
                    id="user_email"
                    value={form.email}
                    readOnly
                />
                <input
                    type="text"
                    name="user_address_street"
                    id="user_address_street"
                    value={form.address.street}
                    readOnly
                />
                <input
                    type="text"
                    name="user_address_zipcode"
                    id="user_address_zipcode"
                    value={form.address.zipCode}
                    readOnly
                />
                <input
                    type="text"
                    name="user_address_city"
                    id="user_address_city"
                    value={form.address.city}
                    readOnly
                />
            </form>

            <h1>Interested in buying a painting from me?</h1>
            <p>
                Contact me through the form below, or send an email to{' '}
                <a href="mailto:hello@sebandermedia.se">
                    hello@sebandermedia.se
                </a>
            </p>

            {isSent ? (
                <Form>
                    Thank you for purchase inquiry! I will get back to you as
                    soon as possible.
                </Form>
            ) : (
                <Form>
                    {isLoading && <LoadingComponent />}
                    <Group>
                        <div className="info">
                            <h2>Your information</h2>
                            <p>
                                Please note that only an address within Sweden
                                is accepted for delivery purposes.
                            </p>
                            {inputs.map(({ id, label, type }) => (
                                <Input
                                    key={id}
                                    id={id}
                                    label={label}
                                    type={type ?? 'text'}
                                    value={
                                        id === ('street' || 'city' || 'zipCode')
                                            ? form.address[id]
                                            : form[id]
                                    }
                                    onChange={(e) => handleInputChange(e)}
                                />
                            ))}
                        </div>

                        <div className="order">
                            <label>
                                <span>Motif:</span>
                                <select
                                    value={
                                        form.order.painting?.name ?? 'default'
                                    }
                                    onChange={(e) => {
                                        handleOrder(
                                            e.target.value,
                                            paintings as Painting[],
                                            'painting'
                                        );
                                    }}
                                >
                                    <option value="default" disabled>
                                        Select a painting
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
                            {form.order.painting && (
                                <>
                                    <label>
                                        <span>Material:</span>
                                        <select
                                            value={
                                                form.order.material?.material ??
                                                'default'
                                            }
                                            onChange={(e) => {
                                                handleOrder(
                                                    e.target.value,
                                                    form.order.painting
                                                        .options as Material[],
                                                    'material'
                                                );
                                            }}
                                        >
                                            <option value="default" disabled>
                                                Select a material
                                            </option>
                                            {form.order.painting.options.map(
                                                (item: Material) => (
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

                            {form.order.material && (
                                <>
                                    <label>
                                        <span>Size:</span>
                                        <select
                                            value={
                                                form.order.size?.size ??
                                                'default'
                                            }
                                            onChange={(e) =>
                                                handleOrder(
                                                    e.target.value,
                                                    form.order.material
                                                        .options as Option[],
                                                    'size'
                                                )
                                            }
                                        >
                                            <option value="default" disabled>
                                                Select a size
                                            </option>
                                            {form.order.material.options.map(
                                                (item: Option) => (
                                                    <option
                                                        key={item.size}
                                                        value={item.size}
                                                    >
                                                        {item.size} (limited
                                                        print of {item.copies})
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </label>
                                </>
                            )}
                            {form.order.size && (
                                <div className="price">
                                    Price: {form.order.size.price}SEK
                                </div>
                            )}
                        </div>
                    </Group>
                    <Group className="footer">
                        <span className="error">{message}</span>
                        <button type="button" onClick={() => handleSubmit()}>
                            Submit
                        </button>
                    </Group>
                </Form>
            )}
        </Wrapper>
    );
}
