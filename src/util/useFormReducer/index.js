import { useReducer, useMemo } from 'react';

import * as reducers from './reducers';

const useFormReducer = () => {
	console.log(reducers);
	const [form, dispatch] = useReducer(
		(state, action) => reducers[action.type](state, action),
		{
			values: {},
			defaults: {},
			keys: {},
			errors: {},
			formValid: false,
			triggerOnChange: false
		}
	);

	const dispatchHelper = useMemo(() => {
		return Object
			.keys(reducers)
			.reduce((helper, type) => ({
				...helper,
				[type]: (action) => dispatch({ ...action, type })
			}), {});
	}, [dispatch]);

	return [form, dispatchHelper];
}

export default useFormReducer;
