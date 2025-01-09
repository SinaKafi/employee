import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      
      @font-face {
         font-family: yekanLight;
         src: url(/fonts/FaNum/Yekan Bakh FaNum 03 Light.woff)
      }
      
      @font-face {
         font-family: yekanRegular;
         src: url(/fonts/FaNum/Yekan Bakh FaNum 04 Regular.woff)
      }

      @font-face {
        font-family: yekanMedium;
        src: url(/fonts/FaNum/Yekan Bakh FaNum 05 Medium.woff)
     }

     @font-face {
        font-family: yekanBold;
        src: url(/fonts/FaNum/Yekan Bakh FaNum 06 Bold.woff)
     }


     @font-face {
        font-family: yekanHeavy;
        src: url(/fonts/FaNum/Yekan Bakh FaNum 07 Heavy.woff)
     }
     
      `}
  />
);

export default Fonts;
