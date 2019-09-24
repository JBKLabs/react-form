import { useEffect } from 'react';

const useDebug = (name, prop) => {
	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log({ [name]: prop });
	}, [name, prop]);
};

export default useDebug;
