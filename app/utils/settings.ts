export enum Theme {
  dark = "dark",
  luxury = "luxury",
  forest = "forest",
  dracula = "dracula",
  coffee = "coffee",
  night = "night",
}

export interface Settings {
  theme: Theme;
  audioSpeed: {
    value: number;
    min: number;
    max: number;
    step: number;
  };
  [key: string]: any;
}

export const initSettings: Settings = {
  theme: Theme.dark,
  audioSpeed: {
    value: 1,
    min: 0.5,
    max: 2,
    step: 0.25,
  },
};
