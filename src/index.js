import React from 'react';
import ReactDOM from 'react-dom/client';
import Example from './example/Example';

import '../src/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export { default as ImageBox } from './components/ImageBox';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>
);
