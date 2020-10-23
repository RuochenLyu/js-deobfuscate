function copy(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).catch((error) => {
      throw error !== undefined
        ? error
        : new DOMException('The request is not allowed', 'NotAllowedError');
    });
  }

  const span = document.createElement('span');
  span.textContent = text;
  span.style.whiteSpace = 'pre';
  document.body.appendChild(span);

  const selection = window.getSelection();
  const range = window.document.createRange();
  selection.removeAllRanges();
  range.selectNode(span);
  selection.addRange(range);

  let success = false;
  try {
    success = window.document.execCommand('copy');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  selection.removeAllRanges();
  window.document.body.removeChild(span);

  return success
    ? Promise.resolve()
    : Promise.reject(
      new DOMException('The request is not allowed', 'NotAllowedError'),
    );
}

const noop = () => {};

export default function useClipboard(options = {}) {
  const { onSuccess = noop, onError = noop } = options;
  const clipboardCopy = (text) => {
    copy(text).then(onSuccess).catch(onError);
  };

  const isSupported = () => !!(
    navigator.clipboard
      || (document.execCommand
        && document.queryCommandSupported
        && document.queryCommandSupported('copy'))
  );

  return {
    copy: clipboardCopy,
    isSupported,
  };
}
