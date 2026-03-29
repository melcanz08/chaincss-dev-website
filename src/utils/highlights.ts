import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // or any theme you prefer

export const highlightCode = (code: string, language: string = 'javascript') => {
  try {
    return hljs.highlight(code, { language }).value;
  } catch {
    return code;
  }
};