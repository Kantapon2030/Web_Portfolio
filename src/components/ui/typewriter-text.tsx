import { useState, useEffect } from "react";

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className = "",
}: TypewriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentFullText = textArray[textIndex] || "";

  useEffect(() => {
    if (!currentFullText) return;

    let deleteTimeout: NodeJS.Timeout;

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          if (currentText.length > 0) {
            setCurrentText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextIndex((prev) => (prev + 1) % textArray.length);
          }
        } else {
          if (currentIndex < currentFullText.length) {
            setCurrentText((prev) => prev + currentFullText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            deleteTimeout = setTimeout(() => setIsDeleting(true), delay);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => {
      clearTimeout(timeout);
      if (deleteTimeout) clearTimeout(deleteTimeout);
    };
  }, [
    currentIndex,
    isDeleting,
    currentFullText,
    loop,
    speed,
    deleteSpeed,
    delay,
    currentText,
    textArray.length,
  ]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse ml-0.5 inline-block text-emerald-400 font-mono">
        {cursor}
      </span>
    </span>
  );
}

export default Typewriter;
