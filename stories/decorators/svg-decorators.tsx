import { Decorator } from "@storybook/react";
import React from "react";

import { SVG_BOARD_SIZE, SVG_SQUARE_SIZE } from "../../src/constants";

type AspectRatioContainerProps = {
  aspectRatio: number | string,
  children: React.ReactNode
}

/**
 * This is a handy utility component that uses CSS container queries to maintain an aspect ratio of
 * a child element constrained by the width and height of the parent. It has a very similar behavior
 * to applying `object-fit: contain` to an `<img />` element.
 */
function AspectRatioContainer({ aspectRatio, children }: AspectRatioContainerProps) {
  // NOTE: I'm inlining the styles here in order to avoid having to import a CSS file into
  // Storybook. This isn't good practice, and shouldn't be used as an example.
  const styles = `
    html, body, #storybook-root {
      height: 100%;
      box-sizing: border-box;
    }

    #storybook-root {
      padding: 1em;
    }
  
    .aspect-ratio-container {
      container-type: size;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .aspect-ratio-container > * {
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: ${ aspectRatio };
      width: 100%;
    }

    @container (min-aspect-ratio: ${ aspectRatio }) {
      .aspect-ratio-container > * {
        width: auto;
        height: 100%;
      }
    }
  `;

  return <>
    <style>{ styles }</style>
    <div className="aspect-ratio-container">
      { children }
    </div>
  </>;
}

export const SVGBoardDecorator: Decorator = (Story) => {
  return <AspectRatioContainer aspectRatio={ 1 }>
    <svg viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }>
      <defs>
        <pattern
          id="squares"
          patternUnits="userSpaceOnUse"
          width={ SVG_SQUARE_SIZE * 2 }
          height={ SVG_SQUARE_SIZE * 2 }
        >
          <rect
            x="0"
            y="0"
            width={ SVG_SQUARE_SIZE }
            height={ SVG_SQUARE_SIZE }
            fill="rgba(255, 255, 255, 0.25)"
          />
          <rect
            x={ SVG_SQUARE_SIZE }
            y={ SVG_SQUARE_SIZE }
            width={ SVG_SQUARE_SIZE }
            height={ SVG_SQUARE_SIZE }
            fill="rgba(255, 255, 255, 0.25)"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width={ SVG_BOARD_SIZE } height={ SVG_BOARD_SIZE } fill="url(#squares)" />
      <Story />
    </svg>
  </AspectRatioContainer>;
};
