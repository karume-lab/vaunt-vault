"use client";

import { Box, Center, Container, Stack, Text, Title } from "@mantine/core";
import NextImage from "next/image";
import { useEffect, useRef } from "react";

const LOGO_SIZE = 150;
const DEFAULT_SPEED = 1.25; // slow idle bounce speed (px per frame)
const MAX_THROW_SPEED = 18;
const FRICTION = 0.9;

export default function Maintenance() {
  const logoRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 120, y: 80 });
  const velRef = useRef({ x: DEFAULT_SPEED, y: DEFAULT_SPEED * 0.65 });
  const draggingRef = useRef(false);
  const lastClientRef = useRef({ x: 0, y: 0 });
  const throwVelRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    let alive = true;

    const tick = () => {
      if (!alive) return;

      if (!draggingRef.current) {
        const maxX = window.innerWidth - LOGO_SIZE;
        const maxY = window.innerHeight - LOGO_SIZE;

        posRef.current.x += velRef.current.x;
        posRef.current.y += velRef.current.y;

        // Apply friction after throw, but maintain a minimum idle speed
        const speed = Math.hypot(velRef.current.x, velRef.current.y);
        if (speed > DEFAULT_SPEED) {
          velRef.current.x *= FRICTION;
          velRef.current.y *= FRICTION;
        } else if (speed < DEFAULT_SPEED) {
          // Restore minimum bouncing speed
          const scale = DEFAULT_SPEED / (speed || 0.001);
          velRef.current.x *= scale;
          velRef.current.y *= scale;
        }

        // Bounce off walls
        if (posRef.current.x <= 0) {
          posRef.current.x = 0;
          velRef.current.x = Math.abs(velRef.current.x);
        } else if (posRef.current.x >= maxX) {
          posRef.current.x = maxX;
          velRef.current.x = -Math.abs(velRef.current.x);
        }

        if (posRef.current.y <= 0) {
          posRef.current.y = 0;
          velRef.current.y = Math.abs(velRef.current.y);
        } else if (posRef.current.y >= maxY) {
          posRef.current.y = maxY;
          velRef.current.y = -Math.abs(velRef.current.y);
        }

        el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    throwVelRef.current = { x: 0, y: 0 };
    lastClientRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = performance.now();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !logoRef.current) return;

    const now = performance.now();
    const dt = now - lastTimeRef.current || 16;

    const dx = e.clientX - lastClientRef.current.x;
    const dy = e.clientY - lastClientRef.current.y;

    posRef.current.x = Math.max(
      0,
      Math.min(window.innerWidth - LOGO_SIZE, posRef.current.x + dx),
    );
    posRef.current.y = Math.max(
      0,
      Math.min(window.innerHeight - LOGO_SIZE, posRef.current.y + dy),
    );

    logoRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;

    // Weighted velocity tracking for throw
    const frameVx = (dx / dt) * 16;
    const frameVy = (dy / dt) * 16;
    throwVelRef.current.x = throwVelRef.current.x * 0.4 + frameVx * 0.6;
    throwVelRef.current.y = throwVelRef.current.y * 0.4 + frameVy * 0.6;

    lastClientRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = now;
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    // Clamp throw velocity
    const throwSpeed = Math.hypot(throwVelRef.current.x, throwVelRef.current.y);
    if (throwSpeed > MAX_THROW_SPEED) {
      const scale = MAX_THROW_SPEED / throwSpeed;
      velRef.current = {
        x: throwVelRef.current.x * scale,
        y: throwVelRef.current.y * scale,
      };
    } else if (throwSpeed > DEFAULT_SPEED) {
      velRef.current = { ...throwVelRef.current };
    }
    // else keep current idle velocity
  };

  return (
    <Box
      bg="linen.1"
      c="slate.7"
      mih="100vh"
      pos="relative"
      style={{ overflow: "hidden" }}
    >
      {/* Physics-driven bouncing logo */}
      <Box pos="fixed" inset={0} style={{ zIndex: 50, pointerEvents: "none" }}>
        <div
          ref={logoRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            cursor: "grab",
            pointerEvents: "all",
            userSelect: "none",
            touchAction: "none",
            willChange: "transform",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <NextImage
            src="/images/core/logo.webp"
            alt="VauntVault Logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            loading="eager"
            priority
            draggable={false}
            style={{
              borderRadius: 8,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              border: "1px solid var(--mantine-color-slate-7)",
              display: "block",
              pointerEvents: "none",
            }}
          />
        </div>
      </Box>

      <Center mih="100vh" p="xl">
        <Container size="xs" pos="relative" style={{ zIndex: 10 }} ta="center">
          <Stack gap="xl">
            <Title
              order={1}
              ff="'Cinzel', 'Playfair Display', 'Georgia', serif"
              fw={700}
              style={{ fontSize: "2.25rem", letterSpacing: "-0.025em" }}
            >
              Under Maintenance
            </Title>

            <Text opacity={0.7} size="lg" lh={1.625}>
              We're currently performing some scheduled maintenance to improve
              our experience. We'll be back shortly!
            </Text>

            <Text
              opacity={0.5}
              size="sm"
              fw={600}
              tt="uppercase"
              style={{ letterSpacing: "0.1em" }}
            >
              &copy; {new Date().getFullYear()} VauntVault.
            </Text>
          </Stack>
        </Container>
      </Center>

      {/* Footer */}
      <Box
        pos="fixed"
        bottom={0}
        left={0}
        right={0}
        py="sm"
        ta="center"
        style={{ zIndex: 10 }}
      >
        <Text opacity={0.4} size="xs">
          Powered by{" "}
          <Text
            component="a"
            href="https://karume.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            opacity={0.4}
            size="xs"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            karume-lab
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
