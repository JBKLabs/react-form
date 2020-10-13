import { useContext, useEffect, useState } from 'react';
import FormContext from './FormContext';

const useFormField = (name) => {
    const { emitter, getField } = useContext(FormContext);
    const [state, setState] = useState(getField(name));

    useEffect(() => {
        const registerEvent = `register:${name}`;
        const updateEvent = `field:${name}`;
        emitter.addListener(registerEvent, setState);
        emitter.addListener(updateEvent, setState);
        return () => {
            emitter.removeListener(registerEvent, setState);
            emitter.removeListener(updateEvent, setState);
        };
    }, [name, emitter]);

    return state;
};

export default useFormField;