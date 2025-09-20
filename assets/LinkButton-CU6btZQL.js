import{j as o,t as r}from"./index-DllfQ-zG.js";import{a as n}from"./emotion-CuswJqH_.js";import{L as s}from"./react-Afj6T7yh.js";const a=`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${r.colors.text.primary};
  font-weight: 600;
  padding: 0.6rem 0.8rem;
  border-radius: ${r.radii.sm};
  border: 1px solid ${r.colors.border};
  background: ${r.colors.surface};
  transition: background ${r.transitions.default}, color ${r.transitions.default}, border-color ${r.transitions.default};

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
  @media (hover: hover) {
    &:hover { background: ${r.colors.highlight}; }
  }
`,l=n(s,{target:"e17mxq8b1"})(a,";"),i=n("a",{target:"e17mxq8b0"})(a,";");function c(t){return!!t&&/^(?:[a-z]+:)?\/\//i.test(t)}function m({to:t,...e}){return t?c(t)?o(i,{href:t,...e}):o(l,{to:t,...e}):o(i,{...e})}export{m as L};
