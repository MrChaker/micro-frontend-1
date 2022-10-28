import React from "react";
import ReactDOM from "react-dom";
import CMS from "./CMS";
import useCanvaStore from "store/Store";

import "./index.scss";

const App = () => {
    const cart = useCanvaStore((state) => state.cart);
    console.log(cart);
    return (
        <div className="mt-10 text-3xl mx-auto max-w-6xl">
            <CMS />
            {/* <Canva /> */}
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById("app"));
