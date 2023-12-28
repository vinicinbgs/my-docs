import React from "react";
import Admonition from "@theme-original/Admonition";

export default function AdmonitionWrapper(props) {
  if (props.type == "youknow") {
    return (
      <Admonition title="Você sabia?" className="bg-gray-100" {...props} />
    );
  }
  return <Admonition {...props} />;
}
