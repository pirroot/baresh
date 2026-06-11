"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import "./heroslider.css"
import { ISlider } from "@/types/SliderDto";

export interface HeroSliderProps {
  slides: ISlider[];
  autoplayDelay?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
}

export default function HeroSlider({
  slides,
  autoplayDelay = 4000,
  loop = true,
  showDots = true,
  showArrows = true,
}: HeroSliderProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, direction: "rtl" },
    [autoplayPlugin.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="hero-slider" aria-label="اسلایدر تصاویر">
      <div className="hero-slider__viewport" ref={emblaRef}>
        <div className="hero-slider__container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="hero-slider__slide"
              aria-roledescription="اسلاید"
              aria-label={`${index + 1} از ${slides.length}`}
            >
              <div className="hero-slider__image-wrapper">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="hero-slider__image"
                />
                <div className="hero-slider__overlay" aria-hidden="true" />
              </div>

              <div className="hero-slider__content">
                <span className="hero-slider__eyebrow">شیرآلات صنعتی</span>
                <h2 className="hero-slider__title">{slide.title}</h2>
                <div className="hero-slider__divider" />
                <p className="hero-slider__subtitle">{slide.short_description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            className="hero-slider__arrow hero-slider__arrow--prev"
            onClick={scrollPrev}
            disabled={!loop && !canScrollPrev}
            aria-label="اسلاید قبلی"
          >
            <BiRightArrow size={18} />
          </button>
          <button
            className="hero-slider__arrow hero-slider__arrow--next"
            onClick={scrollNext}
            disabled={!loop && !canScrollNext}
            aria-label="اسلاید بعدی"
          >
            <BiLeftArrow size={18} />
          </button>
        </>
      )}

      {showDots && (
        <div className="hero-slider__dots" role="tablist" aria-label="انتخاب اسلاید">
          {slides.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`اسلاید ${index + 1}`}
              className={`hero-slider__dot ${index === selectedIndex ? "hero-slider__dot--active" : ""}`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}