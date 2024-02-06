import { useEffect } from "react";
import WebFont from "webfontloader";
/*eslint-disable */
export const FontLoader = ({ fontFamilies }) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: fontFamilies, // Replace with your chosen font and styles
      },
    });
  }, [fontFamilies]);

  return null;
};
