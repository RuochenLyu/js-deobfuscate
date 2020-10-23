import { useRef, useCallback, useEffect } from 'react';
import useEventListener from './use-event-listener';

const keyCodeAliasMapping = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46],
};

const keyAliasMapping = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  delete: ['Backspace', 'Delete'],
};

export const ignoreEscKeyEvents = ({ target }) => target.matches('input')
  || target.matches('textarea')
  || target.closest('form')
  || target.closest('button')
  || target.closest('[contenteditable]');

export const keyMatched = (event, keyAlias) => {
  if (event.isComposing || event.keyCode === 229) return false;

  let keyCode = keyCodeAliasMapping[keyAlias];
  if (!Array.isArray(keyCode)) keyCode = [keyCode];

  let key = keyAliasMapping[keyAlias];
  if (!Array.isArray(key)) key = [key];

  return keyCode.includes(event.keyCode) || key.includes(event.key);
};

export default function useKeyPress(element, keyAlias, handler) {
  const handlerRef = useRef();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const eventHandler = useCallback(
    (event) => {
      if (keyMatched(event, keyAlias)) {
        handlerRef.current(event);
      }
    },
    [keyAlias],
  );

  useEventListener(element, 'keydown', eventHandler);
}

export function useGlobalKeyPress(keyAlias, handler) {
  useKeyPress(() => window, keyAlias, handler);
}
