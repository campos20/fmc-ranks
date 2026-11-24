import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ScrambleDisplayAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  event?: string;
  scramble?: string;
  visualization?: "2D" | "3D";
  checkered?: boolean;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "scramble-display": ScrambleDisplayAttributes;
    }
  }
}
