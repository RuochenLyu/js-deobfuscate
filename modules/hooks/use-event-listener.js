import { useEffect, useRef } from 'react';

function getElement(element) {
  return typeof element === 'function' ? element() : element;
}

export default function useEventListener(
  element, eventName, handler, { skip = false, ...options } = {},
) {
  const handlerRef = useRef();
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (skip) return undefined;

    const target = getElement(element);
    if (target && handlerRef.current) {
      const eventHandler = (event) => handlerRef.current(event);
      target.addEventListener(eventName, eventHandler, options);

      return () => {
        target.removeEventListener(eventName, eventHandler, options);
      };
    }

    return undefined;
  }, [element, eventName, skip, options]);
}

export function useGlobalEventListener(eventName, handler, options) {
  useEventListener(() => window, eventName, handler, options);
}
