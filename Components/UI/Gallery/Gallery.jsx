"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import styles from "./Gallery.module.scss";

const photo = (file, alt) => ({ src: `/gallery/WhatsApp Image 2026-08-05 at ${file}.jpeg`, alt });
const video = (file, alt) => ({ src: `/gallery/WhatsApp Video ${file}.mp4`, alt, video: true });
const media = [
  photo("21.28.04 (1)", "Boxes and furniture carefully packed inside our moving truck"),
  photo("21.28.05 (3)", "Furniture and appliances secured for transport"),
  photo("21.28.05 (4)", "Moving boxes stacked above blanket-protected furniture"),
  video("2026-08-16 at 21.58.36", "Our moving team at work"),
  photo("21.28.05 (5)", "A truck loaded with boxes and protected household items"),
  video("2026-08-16 at 21.58.38", "A closer look at a recent move"),
  photo("21.28.06 (2)", "Wrapped furniture safely loaded in the truck"),
  photo("21.28.06 (3)", "Protective wrapping around large furniture items"),
  photo("21.29.01 (3)", "A member of our team moving furniture from a home"),
  photo("21.29.01 (4)", "Household furniture arranged inside the moving truck"),
  photo("21.29.01 (5)", "Packed boxes ready for transport"),
  photo("21.29.02 (3)", "Furniture and boxes protected with moving blankets"),
  photo("21.29.02 (4)", "Loading furniture into the moving truck"),
  photo("21.29.02 (5)", "Our team handling furniture during a move"),
  photo("21.29.40 (1)", "A wooden display cabinet ready to be moved"),
  video("2026-08-16 at 21.57.22", "Behind the scenes of a recent move"),
  video("2026-08-05 at 21.29.33 (1)", "Our team handling a furniture move"),
];

export default function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);
  const toggleRef = useRef(null);
  const visibleMedia = expanded ? media : media.slice(0, 8);

  return (
    <section className={styles.section} id="our-work" aria-labelledby="gallery-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Our work</span>
          <h2 id="gallery-title"><span>Real moves.</span> Handled with care.</h2>
          <p>A look at recent moves completed by our team in Hamilton, Waikato and surrounding areas.</p>
        </header>
        <div id="gallery-grid" className={styles.grid}>
          {visibleMedia.map((item, index) => (
            <div key={item.src} className={`${styles.tile} ${index === 0 ? styles.featured : ""} ${item.video ? styles.video : ""}`}>
              {item.video ? (
                <video controls playsInline preload="metadata" aria-label={item.alt} onPlay={(event) => {
                  event.currentTarget.closest("section").querySelectorAll("video").forEach((player) => {
                    if (player !== event.currentTarget) player.pause();
                  });
                }}>
                  <source src={`${item.src}#t=0.1`} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : (
                <button className={styles.photo} onClick={() => setSelected(item)} aria-label={`View photo: ${item.alt}`}>
                  <Image src={item.src} alt={item.alt} fill sizes={index === 0 ? "(max-width: 700px) 100vw, 600px" : "(max-width: 700px) 50vw, 300px"} />
                  <span className={styles.zoom} aria-hidden="true">↗</span>
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button ref={toggleRef} className={styles.toggle} aria-expanded={expanded} aria-controls="gallery-grid" onClick={() => {
            setExpanded(!expanded);
            if (expanded) requestAnimationFrame(() => toggleRef.current?.scrollIntoView({ block: "nearest" }));
          }}>
            {expanded ? "Show fewer photos & videos" : `View all ${media.length} photos & videos`}
          </button>
        </div>
      </div>
      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="lg" fullWidth aria-label={selected?.alt || "Gallery photo"} PaperProps={{ className: styles.dialog }} sx={{ zIndex: 11000 }}>
        {selected && <>
          <button className={styles.close} onClick={() => setSelected(null)} aria-label="Close photo">×</button>
          <div className={styles.fullPhoto}><Image src={selected.src} alt={selected.alt} fill sizes="90vw" /></div>
          <p className={styles.caption}>{selected.alt}</p>
        </>}
      </Dialog>
    </section>
  );
}
