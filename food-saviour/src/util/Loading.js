import React from "react";

function LoadingComponent(Component) {
    return function LoadingComponent({ isLoading, ...props }) {
        if (!isLoading) {
            return <Component {...props} />;
        }
        return (
            <div></div>
		);
    };
}

export default LoadingComponent;