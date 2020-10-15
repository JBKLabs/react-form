import { useContext, useLayoutEffect, useState } from 'react';

import FormContext from "./FormContext";

const useFormState = (name) => {
    const { emitter, formValid, getField } = useContext(FormContext);
    const [state, setState] = useState(getField(name));

    useLayoutEffect(() => {
        emitter.addListener(name, setState);
        return () => emitter.removeListener(name, setState)
    }, [name, emitter, setState]);

    return [state, formValid];
};

export default useFormState;