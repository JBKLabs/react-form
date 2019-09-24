import { useEffect } from 'react';

const useDebug = (name, prop) => {
	useEffect(() => {
		console.log({ [name]: prop });
	}, [name, prop]);
};

export default useDebug;
