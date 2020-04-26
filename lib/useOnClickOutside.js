import { useEffect } from "react";

const useOnClickOutside = (ref, callback) => {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener(`click`, handler);
    return () => {
      document.removeEventListener(`click`, handler);
    };
  }, [ref, callback]);
};

export default useOnClickOutside;
