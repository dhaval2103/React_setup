import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import ThemeContext from "./context/ThemeContext";
import SocketContextProvider from "./context/Socket";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SimpleReactLightbox>
                <SocketContextProvider>
                    <BrowserRouter basename='/AZ-security/admin'>
                        <ThemeContext>
                            <App />
                        </ThemeContext>
                    </BrowserRouter>
                </SocketContextProvider>
            </SimpleReactLightbox>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
