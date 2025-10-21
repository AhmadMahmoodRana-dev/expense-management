"use client";

import Sidebar from "@/components/Sidebar";
import { Context } from "@/context/Context";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { HiCog } from "react-icons/hi";

export default function DashboardLayout({ children }) {
  const toggleThemeBox = () => setShowThemeBox(!showThemeBox);
  const [showThemeBox, setShowThemeBox] = useState(false);
  const { setThemeColor, themeColor } = useContext(Context);

  const colorOptions = [
    {
      color: "#000",
      value: "dark",
    },
    {
      color: "#fff",
      value: "light",
    },
  ];

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <Sidebar />
      <main className="flex-1">
        <div className=" px-4 py-3 right-0 z-10 absolute flex items-center justify-center">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.button
              onClick={toggleThemeBox}
              whileHover={{ rotate: 360 }}
              animate={{
                rotate: showThemeBox ? 360 : 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors relative shadow-lg"
            >
              <HiCog
                size={24}
                className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
              />
            </motion.button>

            {/* Sliding Theme Box - right side */}
            <AnimatePresence>
              {showThemeBox && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: -20, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute top-1/2 -translate-y-1/2 right-full bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-3 flex gap-3"
                >
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setThemeColor(color.value)}
                      className="w-7 h-7 rounded-full"
                      style={{
                        backgroundColor: color?.color,
                        borderColor:
                          themeColor === color ? "#000" : "transparent",
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        {children}
      </main>
    </div>
  );
}
