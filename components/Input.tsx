import { InputProps } from './Form/interface';
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

export default Input;
