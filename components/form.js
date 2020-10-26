import {
  useState, useEffect, useRef,
} from 'react';
import useKeyPress from '@/modules/hooks/use-key-press';
import JavascriptObfuscator from '@/lib/javascriptobfuscator_unpacker';

const TYPES_MAPPING = {
  Auto: process.browser && window.autoscan,
  Eval: process.browser && window.uneval,
  'jsjiami/Obfuscator': process.browser && window.obdec_default,
  'sojson v5': process.browser && window.dec_sojsonv5_default,
  'sojson v4': process.browser && window.decsojson4,
  'sojson 高级版': process.browser && window.decsojsonp,
  'JS Beautifier': process.browser && JavascriptObfuscator.unpack,
};

export default function Form({ onChange }) {
  const textareaRef = useRef();
  const [formData, setFormData] = useState({
    content: '',
    type: 'Auto',
  });

  const handleSubmit = (event) => {
    event?.preventDefault();
    const fn = TYPES_MAPPING[formData.type];
    let result;
    try {
      result = fn(formData.content);
    } catch (error) {
      result = `Failed!\n${error}`;
    }
    onChange(result);
  };

  useEffect(() => {
    handleSubmit();
  }, [formData.content, formData.type]);

  useKeyPress(textareaRef.current, 'enter', (event) => {
    if (event.metaKey || event.ctrlKey) handleSubmit();
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClear = () => {
    setFormData((prevData) => ({
      ...prevData,
      content: '',
    }));
    onChange('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="textarea"
        value={formData.content}
        ref={textareaRef}
        name="content"
        placeholder={'Paste code here...\n\n⚠️ jsjiami.com.v5 not work'}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus
        onChange={handleChange}
      />

      <div className="settings">
        <div className="radios">
          {Object.keys(TYPES_MAPPING).map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="type"
                value={type}
                checked={type === formData.type}
                onChange={handleChange}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        <div className="buttons">
          <button type="reset" className="button-clear" onClick={handleClear}>
            Clear
          </button>
          <button
            type="submit"
            className="button-submit"
            disabled={!formData.content}
          >
            Decode
          </button>
        </div>
      </div>

      <style jsx>
        {`
          form {
            background: #fff;
            border-radius: 4px;
            border: 2px solid var(--uiColor);
          }
          .textarea {
            display: block;
            width: 100%;
            height: 120px;
            padding: 12px;
            font-size: 12px;
            outline: none;
            border: none;
            resize: none;
          }
          .settings {
            display: flex;
            justify-content: space-between;
            padding: 12px;
            line-height: 40px;
            border-top: 1px solid #eee;
          }
          label {
            display: inline-flex;
            align-items: center;
            margin-right: 12px;
            letter-spacing: -0.5px;
            cursor: pointer;
          }
          input[type='radio'] {
            margin: 0 4px 0 0;
          }
          input[type='radio']:checked + span {
            color: var(--uiColor);
            font-weight: bold;
          }
          .buttons {
            display: flex;
            font-size: 16px;
          }
          .button-clear {
            margin-right: 12px;
            color: var(--textColorLight);
          }
          .button-submit {
            width: 120px;
            color: #fff;
            background: var(--uiColor);
          }
        `}
      </style>
    </form>
  );
}
