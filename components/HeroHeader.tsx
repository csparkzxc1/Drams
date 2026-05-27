"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  title: string;
  subtitle?: string;
  height?: string;
  children?: React.ReactNode;
};

export default function HeroHeader({ src, title, subtitle, height = "h-44", children }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative ${height} overflow-hidden`}>
      {!imgError ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          priority
          onError={() => setImgError(true)}
        />
      ) : null}

      {/* Gradient fallback that always shows */}
      <div
        className="absolute inset-0"
        style={{
          background: imgError
            ? "linear-gradient(165deg, #1A1510 0%, #0C0A08 100%)"
            : "linear-gradient(to bottom, rgba(12,10,8,0.3) 0%, rgba(12,10,8,0.6) 50%, rgba(12,10,8,1) 100%)",
        }}
      />

      {/* Gold accent line */}
      {imgError && (
        <div className="absolute bottom-12 left-5 right-5 divider-gold" />
      )}

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-cream">{title}</h1>
          {subtitle && (
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-cream-soft mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
