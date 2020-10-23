export default function Header() {
  return (
    <header>
      <h1>de4js</h1>
      <h2>JavaScript Deobfuscator and Unpacker</h2>
      <style jsx>
        {`
          header {
            margin-bottom: 20px;
            font-family: var(--MonospaceFont);
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
        `}
      </style>
    </header>
  );
}
