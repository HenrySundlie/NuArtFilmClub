import{j as o,t}from"./index-WnMDAWwk.js";import{a as n}from"./emotion-CuswJqH_.js";import{L as s}from"./react-Afj6T7yh.js";const a=`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  padding: 0.65rem 1rem;
  border-radius: ${t.radii.md};
  border: 1px solid ${t.colors.text.light};
  background: ${t.colors.surfaceDeep};
  color: #ffffff; /* Match FilmMenu ticket button */
  font-family: ${t.typography.fontFamily};
  transition: background ${t.transitions.default}, color ${t.transitions.default}, border-color ${t.transitions.default}, filter ${t.transitions.default};

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
  @media (hover: hover) {
    &:hover { filter: brightness(1.1); }
  }
  &:active { filter: brightness(0.95); }

  /* Desktop-only: slightly lighter charcoal background */
  ${t.breakpoints.desktop} {
    background: #141414; /* mid charcoal */
    @media (hover: hover) { &:hover { background: #181818; } }
    &:active { background: #101010; }
  }
`,l=n(s,{target:"e17mxq8b1"})(a,";"),i=n("a",{target:"e17mxq8b0"})(a,";");function c(e){return!!e&&/^(?:[a-z]+:)?\/\//i.test(e)}function m({to:e,...r}){return e?c(e)?o(i,{href:e,...r}):o(l,{to:e,...r}):o(i,{...r})}export{m as L};
