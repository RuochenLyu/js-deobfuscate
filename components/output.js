import { useEffect, useRef } from 'react';
import { js_beautify as jsBeautify } from 'js-beautify';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import useClipboard from '@/modules/hooks/use-clipboard';

export default function Output({ content }) {
  const element = useRef();
  const { copy } = useClipboard();

  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
  }, []);

  useEffect(() => {
    hljs.highlightBlock(element.current);
  }, [content]);

  const handleCopy = () => {
    copy(jsBeautify(content));
  };

  return (
    <main>
      <pre>
        <code ref={element} className="code">
          {jsBeautify(content)}
        </code>
      </pre>

      {Boolean(content) && (
        <button type="submit" className="button-copy" onClick={handleCopy}>
          Copy Code
        </button>
      )}

      <style jsx>
        {`
          main {
            position: relative;
          }
          .code {
            padding: 12px;
          }
          .button-copy {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 120px;
            color: var(--textColorLight);
          }
        `}
      </style>
    </main>
  );
}
