const Wave = () => {
  return (
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox="0 0 1440 690"
      xmlns="http://www.w3.org/2000/svg"
      className="transition duration-300 ease-in-out delay-150"
    >
      <style>{`
    .path-0{
      animation:pathAnim-0 4s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    @keyframes pathAnim-0{
      0%{
        d: path("M 0,700 L 0,131 C 66.43146684987977,119.28993473033321 132.86293369975954,107.57986946066644 197,89 C 261.13706630024046,70.42013053933356 322.9797320508416,44.97045688766747 390,69 C 457.0202679491584,93.02954311233253 529.218138096874,166.5383029886637 600,193 C 670.781861903126,219.4616970113363 740.1477155616626,198.87633115767778 816,188 C 891.8522844383374,177.12366884232222 974.1909996564752,175.95637238062523 1041,160 C 1107.8090003435248,144.04362761937477 1159.0882858124357,113.29817931982136 1223,106 C 1286.9117141875643,98.70182068017864 1363.455857093782,114.85091034008931 1440,131 L 1440,700 L 0,700 Z");
      }
      25%{
        d: path("M 0,700 L 0,131 C 48.300927516317415,138.0065269666781 96.60185503263483,145.01305393335622 168,130 C 239.39814496736517,114.98694606664377 333.8935073857781,77.95431123325316 403,76 C 472.1064926142219,74.04568876674684 515.8241154242529,107.16970113363104 592,123 C 668.1758845757471,138.83029886636896 776.8100309172105,137.36688423222262 846,147 C 915.1899690827895,156.63311576777738 944.935760906905,177.3627619374785 1004,184 C 1063.064239093095,190.6372380625215 1151.44692545517,183.1820680178633 1229,172 C 1306.55307454483,160.8179319821367 1373.276537272415,145.90896599106836 1440,131 L 1440,700 L 0,700 Z");
      }
      50%{
        d: path("M 0,700 L 0,131 C 63.023016145654424,166.97045688766747 126.04603229130885,202.94091377533496 189,182 C 251.95396770869115,161.05908622466504 314.83888698041903,83.2068017863277 387,68 C 459.16111301958097,52.79319821367229 540.5984197870147,100.23187907935419 610,105 C 679.4015802129853,109.76812092064581 736.7674338715219,71.86568189625557 815,84 C 893.2325661284781,96.13431810374443 992.331844726898,158.3053933356235 1055,173 C 1117.668155273102,187.6946066643765 1143.9051872208863,154.91274476125042 1202,140 C 1260.0948127791137,125.08725523874958 1350.0474063895567,128.04362761937477 1440,131 L 1440,700 L 0,700 Z");
      }
      75%{
        d: path("M 0,700 L 0,131 C 65.24081071796633,146.4785297148746 130.48162143593265,161.95705942974922 198,152 C 265.51837856406735,142.04294057025078 335.3143249742356,106.65029199587772 408,88 C 480.6856750257644,69.34970800412228 556.2610786671248,67.44177258673996 633,87 C 709.7389213328752,106.55822741326004 787.6413603572655,147.58261765716247 849,159 C 910.3586396427345,170.41738234283753 955.1734799038131,152.2277567846101 1023,139 C 1090.8265200961869,125.77224321538989 1181.664720027482,117.50635520439711 1255,117 C 1328.335279972518,116.49364479560289 1384.167639986259,123.74682239780145 1440,131 L 1440,700 L 0,700 Z");
      }
      100%{
        d: path("M 0,700 L 0,131 C 66.43146684987977,119.28993473033321 132.86293369975954,107.57986946066644 197,89 C 261.13706630024046,70.42013053933356 322.9797320508416,44.97045688766747 390,69 C 457.0202679491584,93.02954311233253 529.218138096874,166.5383029886637 600,193 C 670.781861903126,219.4616970113363 740.1477155616626,198.87633115767778 816,188 C 891.8522844383374,177.12366884232222 974.1909996564752,175.95637238062523 1041,160 C 1107.8090003435248,144.04362761937477 1159.0882858124357,113.29817931982136 1223,106 C 1286.9117141875643,98.70182068017864 1363.455857093782,114.85091034008931 1440,131 L 1440,700 L 0,700 Z");
      }
    }`}</style>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="5%" stop-color="#F78DA7"></stop>
          <stop offset="95%" stop-color="#8ED1FC"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,700 L 0,131 C 66.43146684987977,119.28993473033321 132.86293369975954,107.57986946066644 197,89 C 261.13706630024046,70.42013053933356 322.9797320508416,44.97045688766747 390,69 C 457.0202679491584,93.02954311233253 529.218138096874,166.5383029886637 600,193 C 670.781861903126,219.4616970113363 740.1477155616626,198.87633115767778 816,188 C 891.8522844383374,177.12366884232222 974.1909996564752,175.95637238062523 1041,160 C 1107.8090003435248,144.04362761937477 1159.0882858124357,113.29817931982136 1223,106 C 1286.9117141875643,98.70182068017864 1363.455857093782,114.85091034008931 1440,131 L 1440,700 L 0,700 Z"
        stroke="none"
        stroke-width="0"
        fill="url(#gradient)"
        fill-opacity="0.4"
        className="transition-all duration-300 ease-in-out delay-150 path-0"
      ></path>
      <style>
        {` .path-1{
      animation:pathAnim-1 4s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    @keyframes pathAnim-1{
      0%{
        d: path("M 0,700 L 0,306 C 53.53624184129164,304.9385091034009 107.07248368258328,303.87701820680184 167,311 C 226.92751631741672,318.12298179319816 293.24630711095847,333.4304362761937 380,332 C 466.75369288904153,330.5695637238063 573.9422878735829,312.40123668842324 654,316 C 734.0577121264171,319.59876331157676 786.9845413947096,344.9646169701134 850,335 C 913.0154586052904,325.0353830298866 986.1195465475782,279.7402954311233 1059,263 C 1131.8804534524218,246.25970456887669 1204.5372724149777,258.07420130539333 1268,270 C 1331.4627275850223,281.92579869460667 1385.7313637925113,293.96289934730333 1440,306 L 1440,700 L 0,700 Z");
      }
      25%{
        d: path("M 0,700 L 0,306 C 87.02439024390245,295.00927516317415 174.0487804878049,284.0185503263483 243,292 C 311.9512195121951,299.9814496736517 362.8292682926829,326.9350738577808 434,344 C 505.1707317073171,361.0649261422192 596.6341463414635,368.24115424252835 653,355 C 709.3658536585365,341.75884575747165 730.6341463414633,308.10030917210577 788,280 C 845.3658536585367,251.8996908278942 938.8292682926831,229.35760906904846 1020,244 C 1101.170731707317,258.64239093095154 1170.0487804878048,310.46925455170043 1238,327 C 1305.9512195121952,343.53074544829957 1372.9756097560976,324.76537272414976 1440,306 L 1440,700 L 0,700 Z");
      }
      50%{
        d: path("M 0,700 L 0,306 C 85.02919958777053,292.78529714874617 170.05839917554107,279.5705942974923 238,299 C 305.94160082445893,318.4294057025077 356.79560288560623,370.50291995877706 422,361 C 487.20439711439377,351.49708004122294 566.7591892820336,280.41772586739955 631,285 C 695.2408107179664,289.58227413260045 744.1676399862591,369.8261765716249 805,365 C 865.8323600137409,360.1738234283751 938.5702507729302,270.27756784610096 1006,260 C 1073.4297492270698,249.722432153899 1135.55135692202,319.06355204397113 1207,340 C 1278.44864307798,360.93644795602887 1359.22432153899,333.4682239780144 1440,306 L 1440,700 L 0,700 Z");
      }
      75%{
        d: path("M 0,700 L 0,306 C 50.708347646856765,297.334249398832 101.41669529371353,288.66849879766403 180,279 C 258.58330470628647,269.33150120233597 365.0415664720027,258.66025420817584 440,269 C 514.9584335279973,279.33974579182416 558.4170388182755,310.69048436963243 613,305 C 667.5829611817245,299.30951563036757 733.2902782548952,256.5778083132944 810,267 C 886.7097217451048,277.4221916867056 974.4218481621438,340.99828237719 1045,367 C 1115.5781518378562,393.00171762281 1169.0223290965305,381.42906217794575 1232,365 C 1294.9776709034695,348.57093782205425 1367.4888354517348,327.2854689110271 1440,306 L 1440,700 L 0,700 Z");
      }
      100%{
        d: path("M 0,700 L 0,306 C 53.53624184129164,304.9385091034009 107.07248368258328,303.87701820680184 167,311 C 226.92751631741672,318.12298179319816 293.24630711095847,333.4304362761937 380,332 C 466.75369288904153,330.5695637238063 573.9422878735829,312.40123668842324 654,316 C 734.0577121264171,319.59876331157676 786.9845413947096,344.9646169701134 850,335 C 913.0154586052904,325.0353830298866 986.1195465475782,279.7402954311233 1059,263 C 1131.8804534524218,246.25970456887669 1204.5372724149777,258.07420130539333 1268,270 C 1331.4627275850223,281.92579869460667 1385.7313637925113,293.96289934730333 1440,306 L 1440,700 L 0,700 Z");
      }
    }`}
      </style>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="5%" stop-color="#F78DA7"></stop>
          <stop offset="95%" stop-color="#8ED1FC"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,700 L 0,306 C 53.53624184129164,304.9385091034009 107.07248368258328,303.87701820680184 167,311 C 226.92751631741672,318.12298179319816 293.24630711095847,333.4304362761937 380,332 C 466.75369288904153,330.5695637238063 573.9422878735829,312.40123668842324 654,316 C 734.0577121264171,319.59876331157676 786.9845413947096,344.9646169701134 850,335 C 913.0154586052904,325.0353830298866 986.1195465475782,279.7402954311233 1059,263 C 1131.8804534524218,246.25970456887669 1204.5372724149777,258.07420130539333 1268,270 C 1331.4627275850223,281.92579869460667 1385.7313637925113,293.96289934730333 1440,306 L 1440,700 L 0,700 Z"
        stroke="none"
        stroke-width="0"
        fill="url(#gradient)"
        fill-opacity="0.53"
        className="transition-all duration-300 ease-in-out delay-150 path-1"
      ></path>
      <style>
        {`  .path-2{
      animation:pathAnim-2 4s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    @keyframes pathAnim-2{
      0%{
        d: path("M 0,700 L 0,481 C 61.172105805565096,450.81587083476467 122.34421161113019,420.63174166952933 181,446 C 239.6557883888698,471.36825833047067 295.7952593610444,552.2889041566472 376,543 C 456.2047406389556,533.7110958433528 560.4747509446926,434.21264170388184 632,420 C 703.5252490553074,405.78735829611816 742.3057368601856,476.8605290278255 812,490 C 881.6942631398144,503.1394709721745 982.3023016145655,458.34524218481624 1048,449 C 1113.6976983854345,439.65475781518376 1144.4850566815526,465.7585022329097 1204,477 C 1263.5149433184474,488.2414977670903 1351.7574716592237,484.62074888354516 1440,481 L 1440,700 L 0,700 Z");
      }
      25%{
        d: path("M 0,700 L 0,481 C 65.16180006870493,469.35314324974235 130.32360013740987,457.7062864994847 204,472 C 277.67639986259013,486.2937135005153 359.86739951906554,526.5279972518035 437,514 C 514.1326004809345,501.47200274819653 586.2068017863278,436.18172449330126 649,438 C 711.7931982136722,439.81827550669874 765.3053933356234,508.7451047749914 831,509 C 896.6946066643766,509.2548952250086 974.5716248711783,440.8378564067331 1050,439 C 1125.4283751288217,437.1621435932669 1198.4081071796631,501.9034695980763 1263,520 C 1327.5918928203369,538.0965304019237 1383.7959464101684,509.54826520096185 1440,481 L 1440,700 L 0,700 Z");
      }
      50%{
        d: path("M 0,700 L 0,481 C 80.04259704568878,465.5888010992786 160.08519409137756,450.17760219855717 218,459 C 275.91480590862244,467.82239780144283 311.7018206801786,500.87839230504983 386,518 C 460.2981793198214,535.1216076949502 573.107523187908,536.3088285812436 640,536 C 706.892476812092,535.6911714187564 727.8680865681896,533.8862933699759 792,529 C 856.1319134318104,524.1137066300241 963.4201305393337,516.1459979388526 1043,500 C 1122.5798694606663,483.85400206114736 1174.4513912744762,459.5297148746135 1236,455 C 1297.5486087255238,450.4702851253865 1368.774304362762,465.7351425626932 1440,481 L 1440,700 L 0,700 Z");
      }
      75%{
        d: path("M 0,700 L 0,481 C 79.19203023016146,494.6640329783579 158.38406046032293,508.3280659567159 223,508 C 287.6159395396771,507.6719340432841 337.6557883888698,493.3517691514943 402,506 C 466.3442116111302,518.6482308485057 544.9927859841979,558.2648574373068 620,538 C 695.0072140158021,517.7351425626932 766.3730676743388,437.5888010992786 836,425 C 905.6269323256612,412.4111989007214 973.5149433184472,467.3799381655788 1045,483 C 1116.4850566815528,498.6200618344212 1191.5671590518723,474.8914462384061 1258,468 C 1324.4328409481277,461.1085537615939 1382.2164204740639,471.0542768807969 1440,481 L 1440,700 L 0,700 Z");
      }
      100%{
        d: path("M 0,700 L 0,481 C 61.172105805565096,450.81587083476467 122.34421161113019,420.63174166952933 181,446 C 239.6557883888698,471.36825833047067 295.7952593610444,552.2889041566472 376,543 C 456.2047406389556,533.7110958433528 560.4747509446926,434.21264170388184 632,420 C 703.5252490553074,405.78735829611816 742.3057368601856,476.8605290278255 812,490 C 881.6942631398144,503.1394709721745 982.3023016145655,458.34524218481624 1048,449 C 1113.6976983854345,439.65475781518376 1144.4850566815526,465.7585022329097 1204,477 C 1263.5149433184474,488.2414977670903 1351.7574716592237,484.62074888354516 1440,481 L 1440,700 L 0,700 Z");
      }
    }`}
      </style>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="5%" stop-color="#F78DA7"></stop>
          <stop offset="95%" stop-color="#8ED1FC"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,700 L 0,481 C 61.172105805565096,450.81587083476467 122.34421161113019,420.63174166952933 181,446 C 239.6557883888698,471.36825833047067 295.7952593610444,552.2889041566472 376,543 C 456.2047406389556,533.7110958433528 560.4747509446926,434.21264170388184 632,420 C 703.5252490553074,405.78735829611816 742.3057368601856,476.8605290278255 812,490 C 881.6942631398144,503.1394709721745 982.3023016145655,458.34524218481624 1048,449 C 1113.6976983854345,439.65475781518376 1144.4850566815526,465.7585022329097 1204,477 C 1263.5149433184474,488.2414977670903 1351.7574716592237,484.62074888354516 1440,481 L 1440,700 L 0,700 Z"
        stroke="none"
        stroke-width="0"
        fill="url(#gradient)"
        fill-opacity="1"
        className="transition-all duration-300 ease-in-out delay-150 path-2"
      ></path>
    </svg>
  );
};

export default Wave;