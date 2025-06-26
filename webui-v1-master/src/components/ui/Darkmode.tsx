import { darkAtom } from "@/utils/darkAtom";
import { Button } from "@nextui-org/button";
import { useAtom } from "jotai/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect } from "react";
import React from "react";
const Darkmode = () => {
  const [darkMode, setDarkMode] = useAtom(darkAtom);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      <div className="space-x-2">
        <Button
          color="secondary"
          className=""
          isIconOnly
          size="md"
          onPress={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
    </>
  );
};

export default Darkmode;
