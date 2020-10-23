import { useState, useRef } from 'react';
import {
  autoscan,
  uneval,
  decsojson4,
  decsojsonp,
  dec_sojsonv5_default as decSojsonv5Default,
  dec_jsjiamiv6_default as decJsjiamiv6Default,
  obdec_default as obdecDefault,
} from '@/lib/deobfuscate';
import useKeyPress from '@/modules/hooks/use-key-press';

const TYPES_MAPPING = {
  Auto: autoscan,
  Eval: uneval,
  'sojson v4': decsojson4,
  'sojson 高级版': decsojsonp,
  'sojson v5': decSojsonv5Default,
  'jsjiami v6': decJsjiamiv6Default,
  'JS Obfuscator': obdecDefault,
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
    const result = fn(formData.content);
    onChange(result);
  };

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
        placeholder="Paste code here..."
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
