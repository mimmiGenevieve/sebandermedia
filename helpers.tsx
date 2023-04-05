import { FormProps } from './components/Form/interface';

export function makeUpperCase(item: string) {
    return item.charAt(0).toUpperCase() + item.slice(1);
}

export function validateForm(form: FormProps) {
    const errors = [];
    for (const key in form) {
        if (typeof form[key] === 'string' && form[key].trim() === '') {
            errors.push(key);
        } else if (typeof form[key] === 'object') {
            for (const innerKey in form[key]) {
                if (
                    typeof form[key][innerKey] === 'string' &&
                    form[key][innerKey].trim() === ''
                ) {
                    if (innerKey === 'zipCode') errors.push('zip code');
                    else errors.push(innerKey);
                }
            }
        }
    }
    return errors;
}
