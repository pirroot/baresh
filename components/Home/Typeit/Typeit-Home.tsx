'use client'
import TypeIt from "typeit-react";

export default function TypeitHome() {
  return (
    <TypeIt
      options={{
        strings: ["کیفیت ماندگار", "تکنولوژی فردا", "طراحی هوشمند"],
        loop: true,
        speed: 100,
        breakLines: false,
        waitUntilVisible: true,
      }}
      style={{
        color: "rgb(56, 189, 248)",
        fontWeight: 700,
      }}
    />
  );
}