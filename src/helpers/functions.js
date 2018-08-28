import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export const includeNavs = (Component) => {
    return class includeHeaderComponent extends React.Component{ render(){ return ( <div><Header/><Component /><Footer /></div> ); } };
};