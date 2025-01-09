import { memo, useEffect, useRef, useState } from "react";
import SVGClockHour8 from "../svgs/SVGClockHour8";
import { Text } from "@chakra-ui/react";

const ShowTime = () => {
  const animationFrameRef = useRef<number | null>(null);
  const [Time, setTime] = useState("");
  const updateCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h24",
      // second: "numeric",
    });
    // .replace("AM", "صبح")
    // .replace("PM", "شب");

    setTime(currentTime);
    animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
  };
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white p-10 rounded-lg flex items-center gap-base">
      <div className="bg-alpha-halfWhite p-sm rounded-xs">
        <SVGClockHour8 className="text-primary-500" />
      </div>
      <Text
        className="!text-sm !font-normal "
        style={{
          direction: "ltr",
        }}
      >
        {Time}
      </Text>
    </div>
  );
};

export default memo(ShowTime);
