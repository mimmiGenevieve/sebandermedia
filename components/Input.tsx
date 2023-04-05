import { InputProps } from './Form/interface';
const Input = ({ label, value, onChange, id, type }: InputProps) => {
    return (
        <label htmlFor={id}>
            <span>{label}:</span>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required
            />
        </label>
    );
};

export default Input;
