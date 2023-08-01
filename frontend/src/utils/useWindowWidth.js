import React from "react";

const UseWindowWidth = () => {
    const [windowWidth, setWindowWidth] = React.useState({
        width: window.innerWidth,
    });

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth({
                width: window.innerWidth,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowWidth;
};

export default UseWindowWidth;