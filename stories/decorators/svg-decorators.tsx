import { Decorator } from "@storybook/react";
import React from "react";

import { Squares } from "../../src/components/squares";
import { SVG_BOARD_SIZE, SVG_SQUARE_SIZE, WHITE } from "../../src/constants";
import { Player, Square } from "../../src/types";
import { squareToSVGCoordinates } from "../../src/utilities/svg";

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
      height: auto;
    }

    #storybook-docs .aspect-ratio-container {
      container-type: normal;
      max-width: 480px;
      margin: 0 auto;
    }

    @container (min-aspect-ratio: ${ aspectRatio }) {
      .sb-main-fullscreen .aspect-ratio-container > * {
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
      <Squares orientation={ WHITE } />
      <Story />
    </svg>
  </AspectRatioContainer>;
};

type SquareComponentProps = { square: Square, orientation: Player }

export const SVGSquareDecorator: Decorator<SquareComponentProps> = (Story, context) => {
  const { args } = context;
  const { orientation, square } = args;

  const coordinates = squareToSVGCoordinates(square, orientation);

  const viewBox = [
    coordinates[0],
    coordinates[1],
    coordinates[0] + SVG_SQUARE_SIZE,
    coordinates[1] + SVG_SQUARE_SIZE
  ].join(" ");

  return <svg
    viewBox={ viewBox }
  >
    <Story />
  </svg>;
};
