import React, { useState } from "react";

const CMS = () => {
    const [text, setText] = useState("noooooooooo");
    return <div onClick={() => setText("suiiiiiiiiii")}>{text}</div>;
};

export default CMS;
