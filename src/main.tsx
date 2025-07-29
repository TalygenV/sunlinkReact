
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom'; // <-- import router
// import App from './App.tsx';
// import './index.css';
// import { Provider } from 'react-redux';
// import { store } from './store';
// import "./firebase.ts";
// import { FormProvider } from './context/FormContext.tsx';

// createRoot(document.getElementById('root')!).render(
//   //<StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//       <FormProvider>
//         <App />
//         </FormProvider>
//       </BrowserRouter>
//     </Provider>
//   //</StrictMode>
// );

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // ✅ use HashRouter instead
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import "./firebase.ts";
import { FormProvider } from './context/FormContext.tsx';
import { LoaderProvider } from "./context/LoaderContext";

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <Provider store={store}>
      <HashRouter>
        <FormProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
        </FormProvider>
      </HashRouter>
    </Provider>
  //</StrictMode>
);
