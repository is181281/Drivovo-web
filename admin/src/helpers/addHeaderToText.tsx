import * as React from "react";
import reactStringReplace from "react-string-replace";

const addHeadersToText = (
  text: string,
  headerClassName?: string
): Iterable<React.ReactNode> | string => {
  return reactStringReplace(text, /<strong>(.*?)<\/strong>/gs, (match) => (
    <span className={headerClassName}>{match}</span>
  ));
};

export default addHeadersToText;
