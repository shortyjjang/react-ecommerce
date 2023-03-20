import { useEffect } from 'react';

const useScript = (url) => {
  useEffect(() => {
    const documentScript = document.createElement('script');

    documentScript.src = url;
    // documentScript.async = true;

    document.body.appendChild(documentScript);
    return () => {
      document.body.removeChild(documentScript);
    };
  }, [url]);
};

export default useScript;
