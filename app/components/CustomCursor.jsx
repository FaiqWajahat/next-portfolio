"use client";

import { useEffect, useRef } from "react";

/**
 * PERFORMANCE-OPTIMIZED Custom Cursor
 *
 * Key decisions:
 * 1. Zero React state updates on mouse move — uses direct DOM style manipulation
 *    for the main cursor (bypasses React's reconciler entirely on every move).
 * 2. `mouseover` replaced with `pointerover` + closest() guard to prevent
 *    excessive callbacks from child element bubble events.
 * 3. The trailing dot uses a requestAnimationFrame lerp instead of useSpring,
 *    which is GPU-composited and never touches the React tree.
 */
export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Only show on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouse = { x: -100, y: -100 };
        let ringPos = { x: -100, y: -100 };
        let rafId;
        let isHovering = false;

        // Hide system cursor
        document.documentElement.style.cursor = "none";

        // Instantly snap the dot — zero lag
        const onMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            dot.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;
        };

        // Throttle hover detection — use `pointerover` with a guard
        const onPointerOver = (e) => {
            const target = e.target.closest("a, button, [data-cursor-hover]");
            const next = !!target;
            if (next === isHovering) return; // Skip if state hasn't changed
            isHovering = next;

            if (isHovering) {
                ring.style.width = "48px";
                ring.style.height = "48px";
                ring.style.borderColor = "rgba(59,130,246,0.9)";
                ring.style.backgroundColor = "rgba(59,130,246,0.1)";
                dot.style.opacity = "0";
                dot.style.transform += " scale(0)";
            } else {
                ring.style.width = "32px";
                ring.style.height = "32px";
                ring.style.borderColor = "rgba(59,130,246,0.6)";
                ring.style.backgroundColor = "transparent";
                dot.style.opacity = "1";
            }
        };

        // RAF loop for smooth ring trailing (lerp)
        const lerp = (a, b, t) => a + (b - a) * t;
        const tick = () => {
            ringPos.x = lerp(ringPos.x, mouse.x, 0.12);
            ringPos.y = lerp(ringPos.y, mouse.y, 0.12);
            ring.style.transform = `translate(${ringPos.x - 16}px, ${ringPos.y - 16}px)`;
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("pointerover", onPointerOver, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("pointerover", onPointerOver);
            document.documentElement.style.cursor = "";
        };
    }, []);

    return (
        <>
            {/* Trailing ring — GPU layer via translateZ */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary/60 pointer-events-none z-[9998] hidden md:block will-change-transform"
                style={{
                    transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
                    transform: "translate(-100px, -100px)",
                    mixBlendMode: "normal",
                }}
            />
            {/* Instant dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] hidden md:block will-change-transform"
                style={{
                    transition: "opacity 0.15s ease",
                    transform: "translate(-100px, -100px)",
                }}
            />
        </>
    );
}
