export interface Option {
    size: string;
    copies: number;
    price: number;
}

export interface Material {
    material: string;
    options: Option[];
}

export interface Painting {
    name: string;
    options: Material[];
}

export interface FormProps {
    [id: string]: any;
    name: string;
    address: {
        [id: string]: string;
        street: string;
        zipCode: string;
        city: string;
    };
    email: string;
}

export interface InputProps {
    label: string;
    value: string;
    onChange: (e: any) => void;
    id: string;
}
