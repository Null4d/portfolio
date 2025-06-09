import React, { useCallback } from "react";
import PropTypes from "prop-types";

let audioEngineInstance = null;

class AudioEngine {
  constructor() {
    this.sounds = { hover: null, click: null };
    this.isInitialized = false;
    this.lastHoverTime = 0;
    this.cleanupHandlers = [];

    this.paths = {
      hover: "/sounds/process.mp3",
      click: "/sounds/click.mp3",
    };

    this.initOnInteraction();
  }

  static getInstance() {
    if (!audioEngineInstance) {
      audioEngineInstance = new AudioEngine();
    }
    return audioEngineInstance;
  }

  initOnInteraction() {
    const handleInteraction = () => {
      this.preloadSounds();
      this.cleanupHandlers.forEach((cleanup) => cleanup());
      this.cleanupHandlers = [];
    };

    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      const handler = () => handleInteraction();
      document.addEventListener(event, handler, { once: true, passive: true });
      this.cleanupHandlers.push(() =>
        document.removeEventListener(event, handler),
      );
    });
  }

  preloadSounds() {
    if (this.isInitialized) return;

    Object.entries(this.paths).forEach(([key, path]) => {
      try {
        const audio = new Audio(path);
        audio.preload = "auto";

        const volumes = { hover: 0.03, click: 0.3 };
        audio.volume = volumes[key] || 0.3;

        const errorHandler = () => {
          this.sounds[key] = null;
          audio.removeEventListener("error", errorHandler);
        };

        audio.addEventListener("error", errorHandler);
        this.sounds[key] = audio;
      } catch {
        this.sounds[key] = null;
      }
    });

    this.isInitialized = true;
  }

  playHover() {
    if (!this.isInitialized || !this.sounds.hover) return;

    const now = performance.now();
    if (now - this.lastHoverTime < 150) return;

    this.lastHoverTime = now;
    this.sounds.hover.currentTime = 0;
    this.sounds.hover.play().catch(() => {});
  }

  playClick() {
    if (!this.isInitialized || !this.sounds.click) return;

    this.sounds.click.currentTime = 0;
    this.sounds.click.play().catch(() => {});
  }

  setVolume(type, volume) {
    if (this.sounds[type]) {
      this.sounds[type].volume = Math.max(0, Math.min(1, volume));
    }
  }

  destroy() {
    this.cleanupHandlers.forEach((cleanup) => cleanup());
    this.cleanupHandlers = [];

    Object.values(this.sounds).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.load();
      }
    });

    this.sounds = { hover: null, click: null };
    this.isInitialized = false;
    audioEngineInstance = null;
  }
}

const audioEngine = AudioEngine.getInstance();

const SoundWrapper = React.memo(
  ({
    children,
    playHover = true,
    playClick = true,
    onClick,
    onMouseEnter,
    className = "",
    disabled = false,
    as: Component = "div",
    role,
    tabIndex,
    ...props
  }) => {
    const handleMouseEnter = useCallback(
      (e) => {
        if (!disabled && playHover) audioEngine.playHover();
        onMouseEnter?.(e);
      },
      [disabled, playHover, onMouseEnter],
    );

    const handleClick = useCallback(
      (e) => {
        if (!disabled) {
          if (playClick) audioEngine.playClick();
          onClick?.(e);
        }
      },
      [disabled, playClick, onClick],
    );

    const handleTouchStart = useCallback(() => {
      if (!disabled && playHover) audioEngine.playHover();
    }, [disabled, playHover]);

    const handleKeyDown = useCallback(
      (e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          if (playClick) audioEngine.playClick();
          onClick?.(e);
        }
      },
      [disabled, playClick, onClick],
    );

    const getRole = () => {
      if (role) return role;
      return onClick ? "button" : undefined;
    };

    const getTabIndex = () => {
      if (tabIndex !== undefined) return tabIndex;
      return onClick && !disabled ? 0 : undefined;
    };

    return (
      <Component
        className={className}
        onMouseEnter={handleMouseEnter}
        onClick={disabled ? undefined : handleClick}
        onTouchStart={disabled ? undefined : handleTouchStart}
        onKeyDown={disabled ? undefined : handleKeyDown}
        role={getRole()}
        tabIndex={getTabIndex()}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

SoundWrapper.displayName = "SoundWrapper";

SoundWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  playHover: PropTypes.bool,
  playClick: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  as: PropTypes.elementType,
  role: PropTypes.string,
  tabIndex: PropTypes.number,
};

export { AudioEngine, SoundWrapper };
export default audioEngine;
