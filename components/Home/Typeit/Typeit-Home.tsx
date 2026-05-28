'use client'
import TypeIt from "typeit-react";

export default function () {
  return <TypeIt
    options={{
      strings: ["کیفیت ماندگار", "تکنولوژی فردا", "طراحی هوشمند"],
      loop: true,
      speed: 100,
      breakLines: false,
      waitUntilVisible: true,
    }}
  />
}