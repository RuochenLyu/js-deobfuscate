export default function Header() {
  return (
    <header>
      <h1>de4js</h1>
      <h2>JavaScript Deobfuscator and Unpacker</h2>
      <div className="links">
        Others:
        <a href="https://prepack.io/repl.htm" target="_blank" rel="noreferrer">
          Prepack
        </a>
        <a href="http://jsnice.org/" target="_blank" rel="noreferrer">
          JSnice
        </a>
        <a href="https://beautifier.io/" target="_blank" rel="noreferrer">
          Beautifier
        </a>
        <a href="https://jsdec.js.org/" target="_blank" rel="noreferrer">
          JSDec
        </a>
        <a
          href="https://lelinhtinh.github.io/de4js/"
          target="_blank"
          rel="noreferrer"
        >
          de4js
        </a>
      </div>
      <style jsx>
        {`
          header {
            margin-bottom: 20px;
          }
          h1 {
            font-size: 30px;
            line-height: 1.5;
            font-weight: bold;
            color: var(--uiColor);
            -webkit-font-smoothing: antialiased;
          }
          h2 {
            font-size: 18px;
            font-weight: 300;
            color: var(--textColorLight);
          }
          .links {
            color: var(--textColorLight);
            font-size: 12px;
          }
          .links a {
            margin: 0 4px;
            color: var(--textColorLight);
          }
          .links a:hover {
            color: var(--textColor);
          }
        `}
      </style>
    </header>
  );
}
