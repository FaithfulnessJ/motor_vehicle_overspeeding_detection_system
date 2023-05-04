type CongratsProps = {
  width: string;
  height: string;
};

export const Congrats = ({ width, height }: CongratsProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      image-rendering="optimizeQuality"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 512 169.53"
      height={height}
      width={width}
    >
      <path
        fill="#1A1A1A"
        fill-rule="nonzero"
        d="M117.2 80.11c-.85 0-1.83.18-2.97.52-1.13.35-2.28.99-3.46 1.96-1.17.95-2.33 2.3-3.45 4.02-1.13 1.74-2.14 3.97-3.04 6.72-.9 2.75-1.63 6.08-2.17 10-1.15 8.27-1.21 18.87 0 27.14.54 3.73 1.28 6.92 2.22 9.54.91 2.62 1.97 4.77 3.16 6.43 1.21 1.67 2.46 2.96 3.78 3.89 6.05 4.2 13.13 2.48 18.59-1.58 1.11-.85 2.14-1.83 3.08-2.92l2.11 2.12c-.93 1.16-2.07 2.35-3.39 3.55a24.98 24.98 0 0 1-4.58 3.3c-1.76 1-3.7 1.8-5.87 2.43-2.17.62-4.57.95-7.21.95-4.11 0-7.94-.79-11.48-2.37-3.52-1.57-6.6-4-9.22-7.33-2.63-3.31-4.68-7.56-6.18-12.73-3-10.51-3.09-26 .13-36.47 1.56-5.11 3.7-9.39 6.4-12.83 2.7-3.44 5.87-6.03 9.52-7.77 3.65-1.75 7.52-2.62 11.64-2.62 2.73 0 5.21.26 7.46.77 2.25.53 4.18 1.29 5.82 2.27 1.62 1 2.89 2.22 3.79 3.68.89 1.45 1.34 3.1 1.34 4.97 0 .84-.15 1.74-.42 2.65-.29.94-.72 1.79-1.3 2.54-.58.78-1.29 1.4-2.14 1.9-.85.48-1.83.73-2.98.73-.99 0-1.78-.23-2.33-.67-.54-.43-.95-1.01-1.22-1.73-.26-.72-.43-1.56-.51-2.48-.08-.93-.13-1.88-.16-2.84-.04-.98-.12-1.93-.23-2.87-.09-.91-.32-1.75-.66-2.47-.32-.71-.8-1.3-1.43-1.74-.63-.43-1.51-.66-2.64-.66zm19.12 31.45c1.19-3.1 2.78-5.67 4.78-7.75 1.99-2.07 4.31-3.63 6.96-4.66 5.26-2.09 11.27-2.04 16.58-.13 2.63.97 4.95 2.43 6.94 4.41 2 1.97 3.59 4.48 4.78 7.52 2.48 6.22 2.36 15.45 0 21.69-1.19 3.17-2.78 5.84-4.78 8.01-1.99 2.15-4.31 3.81-6.94 4.92-5.28 2.22-11.28 2.2-16.58.1a19.715 19.715 0 0 1-6.96-4.7c-2-2.07-3.59-4.66-4.78-7.77-2.39-6.25-2.41-15.38 0-21.64zm26.92 3.06c-.16-2.33-.5-4.42-1.02-6.24-.49-1.82-1.22-3.28-2.15-4.36-1.9-2.19-5.61-2.17-7.44.1-.95 1.14-1.68 2.65-2.18 4.52-.49 1.86-.83 4-.99 6.38-.3 4.9-.3 9.81 0 14.71.16 2.41.5 4.55.99 6.43.5 1.9 1.23 3.41 2.18 4.55 1.91 2.35 5.56 2.3 7.44-.06.93-1.21 1.66-2.77 2.15-4.71.52-1.95.86-4.15 1.02-6.59.34-4.86.36-9.88 0-14.73zm51.42 8.41c0-3.96-.18-7.13-.55-9.49-.35-2.38-.84-4.18-1.43-5.42-.6-1.24-1.25-2.06-1.98-2.46-.72-.38-1.46-.58-2.22-.58-.91 0-1.72.24-2.43.73-.7.48-1.31 1.04-1.83 1.67-.51.63-.96 1.25-1.32 1.88-.37.63-.67 1.11-.91 1.42v31.46c0 .42-.07.9-.2 1.5-.12.58-.43 1.12-.91 1.64-.49.51-1.21.96-2.17 1.32-.95.36-2.27.54-3.93.54-1.67 0-2.97-.19-3.94-.59-.96-.39-1.68-.85-2.18-1.39-.52-.53-.82-1.09-.95-1.65-.13-.56-.19-1.01-.19-1.37v-36.35c0-.92-.21-1.71-.63-2.38-.44-.68-1.14-1.02-2.14-1.02-.55 0-1 .09-1.37.28-.38.19-.78.46-1.23.8l-.98-1.17c.72-.6 1.52-1.19 2.42-1.77.89-.58 1.87-1.09 2.9-1.53 1.03-.45 2.15-.8 3.34-1.09 1.19-.28 2.44-.42 3.76-.42 2.05 0 3.64.34 4.76 1.01 1.14.68 1.96 1.48 2.49 2.43.55.93.87 1.91.99 2.94.09 1.02.16 1.88.16 2.58 1.15-1.68 2.47-3.17 3.95-4.49.6-.56 1.27-1.11 2-1.64.74-.53 1.52-1.01 2.36-1.45.84-.41 1.7-.75 2.64-1.01.93-.24 1.88-.37 2.84-.37 2.14 0 4.04.4 5.68 1.22 1.65.82 3.04 2.19 4.18 4.1 1.12 1.92 1.99 4.46 2.59 7.61.59 3.15.88 7.07.88 11.75 0 4.55-.4 8.51-1.22 11.87-.82 3.36-1.88 6.22-3.2 8.58-1.32 2.35-2.81 4.28-4.47 5.76-1.67 1.49-3.34 2.67-5.05 3.52-1.69.84-3.31 1.43-4.87 1.77-1.56.32-2.89.5-4.04.53l-.51-1.93a9.24 9.24 0 0 0 2.62-1.03c.8-.48 1.53-1.17 2.19-2.07.66-.92 1.23-2.08 1.73-3.47.52-1.39.95-3.14 1.31-5.25.35-2.1.62-4.6.8-7.46.16-2.88.26-6.24.26-10.06zm22.18-6.18c0-3.2.57-5.99 1.68-8.41 1.12-2.39 2.62-4.4 4.5-6.03a18.73 18.73 0 0 1 6.54-3.61c2.49-.81 5.1-1.21 7.83-1.21 2.74 0 5.32.35 7.77 1.08 2.44.72 4.61 1.85 6.49 3.34.6-.9 1.1-1.86 1.47-2.86.38-1.01.56-2.01.56-3.02 0-1.32-.35-2.37-1.06-3.15-.71-.79-1.61-1.18-2.7-1.18v-1.36c.69-.23 1.3-.42 1.83-.6s1.03-.3 1.46-.4c.44-.1.89-.16 1.32-.21.44-.05.93-.07 1.47-.07 1.47 0 2.6.46 3.39 1.37.79.9 1.17 2.16 1.17 3.76 0 .94-.22 1.89-.66 2.8-.43.93-.99 1.82-1.65 2.67-.66.84-1.39 1.64-2.19 2.4-.8.75-1.56 1.41-2.28 1.97 1.31 1.52 2.34 3.27 3.07 5.28.72 2.01 1.07 4.31 1.07 6.88 0 3.23-.56 6.09-1.67 8.57-1.11 2.49-2.62 4.57-4.5 6.27-1.88 1.69-4.07 2.98-6.54 3.84-2.48.86-5.08 1.29-7.82 1.29-1.6 0-3.18-.15-4.71-.42-1.54-.29-2.99-.69-4.34-1.22-.5.37-.93.84-1.28 1.41-.37.57-.55 1.19-.55 1.89 0 1.15.5 2.02 1.51 2.58.99.57 2.33.97 4 1.23 1.66.25 3.54.41 5.65.46 2.1.07 4.26.18 6.48.31 2.21.14 4.37.42 6.48.8 2.1.4 3.98 1.05 5.64 1.93 1.67.9 3.01 2.12 4 3.65 1.02 1.54 1.51 3.54 1.51 5.98 0 1.8-.37 3.41-1.12 4.84-.76 1.43-1.77 2.69-3.04 3.77-1.27 1.09-2.75 2-4.42 2.78-1.69.77-3.46 1.4-5.34 1.88-1.87.48-3.76.83-5.69 1.06-1.93.22-3.78.34-5.53.34-3.2 0-6.1-.18-8.65-.5-2.56-.34-4.73-.84-6.53-1.53-1.79-.69-3.17-1.59-4.13-2.68-.98-1.11-1.47-2.43-1.47-3.96 0-1.11.25-2.12.76-3.04a9.79 9.79 0 0 1 1.99-2.55c.84-.78 1.77-1.45 2.8-2.08 1.05-.61 2.09-1.17 3.17-1.7-1.58-.68-2.88-1.68-3.94-3.01-1.05-1.33-1.58-3.09-1.58-5.29 0-1.16.21-2.24.61-3.23.41-.98.94-1.9 1.58-2.74.64-.82 1.35-1.57 2.12-2.25.78-.67 1.51-1.25 2.24-1.72-1.29-.75-2.48-1.67-3.56-2.76-1.07-1.08-2.01-2.3-2.78-3.67-.77-1.36-1.36-2.88-1.78-4.55-.44-1.65-.65-3.47-.65-5.42zm26.9-.37c0-1.83-.09-3.6-.29-5.32-.17-1.74-.51-3.26-.98-4.61-.46-1.35-1.11-2.45-1.93-3.28-.82-.84-1.86-1.26-3.15-1.26-1.28 0-2.35.44-3.17 1.3-.81.87-1.46 2-1.92 3.4-.47 1.4-.81 2.97-.99 4.76-.19 1.77-.28 3.57-.28 5.38 0 1.85.09 3.68.28 5.47.18 1.78.52 3.39.99 4.81.46 1.41 1.11 2.55 1.92 3.41.82.86 1.89 1.3 3.17 1.3 1.29 0 2.33-.45 3.15-1.37.82-.92 1.47-2.09 1.93-3.55.47-1.46.81-3.11.98-4.92.2-1.83.29-3.67.29-5.52zm7.16 42.16c0-1.01-.39-1.83-1.18-2.47-.78-.65-1.81-1.16-3.08-1.56-1.27-.39-2.72-.7-4.33-.89-1.62-.21-3.26-.37-4.92-.48-1.67-.1-3.29-.21-4.85-.31-1.58-.09-2.95-.21-4.1-.37-.66.47-1.3.98-1.92 1.53-.61.55-1.14 1.13-1.59 1.75a8.92 8.92 0 0 0-1.11 1.93 5.12 5.12 0 0 0-.43 2.04c0 1.2.35 2.19 1.04 3 .7.8 1.63 1.43 2.8 1.91 1.18.47 2.54.8 4.1.98 1.56.19 3.2.29 4.92.29 2.3 0 4.36-.19 6.18-.6 1.81-.38 3.36-.91 4.61-1.59 1.25-.67 2.22-1.46 2.88-2.33.66-.88.98-1.83.98-2.83zm32.19-51.11c1.19-1.82 2.46-3.48 3.81-4.94.56-.64 1.17-1.25 1.83-1.85.66-.59 1.35-1.12 2.06-1.59.71-.48 1.43-.85 2.19-1.14.75-.28 1.51-.42 2.26-.42 1.59 0 2.85.48 3.77 1.43.91.97 1.36 2.3 1.36 4.04 0 1.06-.08 2.09-.26 3.08-.17.99-.51 2.19-1.01 3.61h-1.32c-.19-.98-.62-1.79-1.31-2.43-.7-.65-1.71-.97-3.03-.97-.96 0-1.93.18-2.86.55-.95.35-1.86.8-2.77 1.33-.88.54-1.73 1.11-2.54 1.74-.8.64-1.52 1.24-2.18 1.8v30.57c0 .42-.07.9-.19 1.46-.13.56-.44 1.09-.92 1.61-.48.5-1.21.93-2.17 1.29-.95.36-2.27.54-3.93.54-1.67 0-2.97-.19-3.93-.59-.97-.39-1.69-.85-2.19-1.39-.52-.53-.82-1.09-.95-1.65-.13-.56-.19-1.01-.19-1.37v-36.35c0-.92-.21-1.71-.63-2.38-.43-.68-1.14-1.02-2.14-1.02-.54 0-1 .09-1.37.28-.38.19-.78.46-1.23.8l-.98-1.17c.72-.6 1.52-1.19 2.42-1.77.89-.58 1.87-1.09 2.9-1.53 1.03-.45 2.15-.8 3.34-1.09 1.19-.28 2.45-.42 3.77-.42 1.35 0 2.5.18 3.47.55.95.35 1.74.82 2.35 1.41.61.58 1.09 1.22 1.43 1.95.35.72.61 1.44.78 2.18.18.74.28 1.45.31 2.13.03.67.05 1.25.05 1.72zm43.52 14.55c0-.77-.25-1.38-.75-1.79-.52-.4-1.16-.61-1.93-.61-1.11 0-2.16.26-3.14.76-.99.5-1.86 1.24-2.62 2.22-.75.96-1.35 2.17-1.78 3.6-.45 1.43-.66 3.09-.66 4.97 0 1.81.13 3.33.4 4.52.26 1.19.63 2.13 1.08 2.84.45.71.98 1.21 1.57 1.5.6.27 1.22.41 1.88.41.82 0 1.6-.2 2.32-.64a6.77 6.77 0 0 0 1.88-1.62c.53-.66.97-1.4 1.27-2.21.32-.82.48-1.63.48-2.46v-11.49zm-7.49-20.63c-1.08 0-2.06.13-2.97.39-.9.24-1.69.56-2.35.93-.66.38-1.17.8-1.56 1.25-.37.45-.56.89-.56 1.29 0 .48.24.82.72 1.01.5.21 1.03.45 1.62.71.6.27 1.15.64 1.63 1.14.5.48.74 1.22.74 2.24 0 .65-.13 1.25-.4 1.81-.28.55-.63 1.03-1.08 1.45-.47.43-1 .76-1.61 1-.61.24-1.25.35-1.91.35-1.76 0-3.17-.59-4.26-1.78-1.08-1.21-1.63-2.79-1.63-4.76 0-1.92.5-3.56 1.51-4.92 1-1.37 2.32-2.5 3.93-3.38 1.62-.88 3.45-1.53 5.5-1.96 2.04-.42 4.08-.63 6.12-.63 2.45 0 4.78.27 7.01.81 2.24.53 4.2 1.38 5.92 2.53 1.7 1.16 3.07 2.64 4.1 4.43 1.01 1.8 1.53 3.95 1.53 6.51v26.61c0 .29.01.59.05.95.03.34.11.66.22.93.13.29.32.51.58.71.24.19.61.29 1.08.29.56 0 1.09-.23 1.57-.65.48-.41.92-.85 1.3-1.3l1.18 1c-.47.66-1.03 1.38-1.69 2.17-.68.79-1.46 1.53-2.41 2.2-.95.69-2.04 1.29-3.3 1.75-1.25.47-2.68.71-4.29.71-1.98 0-3.73-.59-5.28-1.77-1.52-1.17-2.54-2.99-3-5.43-1.02 1.35-2.06 2.48-3.14 3.39-1.08.9-2.18 1.64-3.33 2.2-1.12.57-2.26.98-3.4 1.23-1.15.25-2.3.38-3.46.38-1.51 0-2.98-.24-4.39-.71-1.42-.46-2.67-1.22-3.8-2.23-1.1-1.03-2-2.35-2.68-3.99-.68-1.62-1.01-3.62-1.01-5.98 0-2.86.57-5.19 1.7-7.01 1.13-1.83 2.62-3.36 4.45-4.6 1.84-1.24 3.93-2.3 6.26-3.18 2.35-.87 4.74-1.8 7.19-2.78 1.81-.73 3.15-1.79 3.98-3.22.84-1.43 1.24-2.89 1.24-4.41 0-2.33-.67-4.19-2.04-5.57-1.37-1.4-3.23-2.11-5.58-2.11zm49.59.19v34.81c0 1.66.32 2.82.95 3.46.62.64 1.49.96 2.58.96.86 0 1.61-.22 2.27-.7.66-.47 1.22-1 1.69-1.6.56-.65 1.06-1.43 1.46-2.31l1.47.66c-.47 1.01-1.03 2.1-1.68 3.3-.64 1.2-1.49 2.3-2.57 3.32-1.06 1.02-2.41 1.89-4.02 2.58-1.62.67-3.65 1.03-6.11 1.03-1.38 0-2.7-.21-3.97-.62a9.294 9.294 0 0 1-3.39-1.93c-1-.88-1.79-1.97-2.38-3.29-.6-1.32-.9-2.91-.9-4.76v-34.91h-5.28v-3.39c.89 0 2.11-.23 3.69-.68 1.56-.46 3.16-1.22 4.82-2.29 1.64-1.07 3.18-2.5 4.6-4.28 1.4-1.8 2.41-4 3.01-6.64h3.76v13.89h7.68c2.51 0 3.77-.42 3.77-1.27 0-.32-.15-.53-.47-.64-.31-.1-.66-.24-1.06-.42a3.79 3.79 0 0 1-1.06-.73c-.31-.32-.47-.83-.47-1.55 0-.89.27-1.58.82-2.08.55-.5 1.27-.75 2.16-.75.56 0 1.04.11 1.48.35.41.24.77.55 1.06.95.27.38.48.83.62 1.33.15.5.21 1.01.21 1.51 0 2.05-.58 3.67-1.75 4.88-1.19 1.2-3.07 1.81-5.68 1.81h-7.31zm32.37-.29c-.73 0-1.42.1-2.06.29-.65.2-1.21.5-1.72.92-.5.42-.89.96-1.18 1.61-.29.64-.42 1.4-.42 2.28 0 1.22.44 2.44 1.34 3.65.9 1.21 2.01 2.46 3.34 3.76 1.34 1.3 2.78 2.66 4.34 4.05 1.55 1.4 3 2.88 4.33 4.43 1.33 1.56 2.46 3.21 3.34 4.98.91 1.75 1.36 3.63 1.36 5.64 0 2.27-.39 4.28-1.16 6.03-.77 1.77-1.87 3.25-3.3 4.47-1.43 1.24-3.15 2.17-5.18 2.82-2.02.64-4.27.96-6.77.96-2.17 0-4.13-.3-5.88-.91-1.75-.62-3.33-1.37-4.68-2.27-1.37-.9-2.54-1.85-3.52-2.85-.97-1.01-1.72-1.91-2.25-2.73l1.64-1.17c.42.46.93.98 1.56 1.52.63.55 1.32 1.06 2.09 1.53.77.47 1.59.85 2.47 1.16.89.29 1.77.45 2.69.45 2.27 0 4.12-.55 5.56-1.63 1.45-1.09 2.17-2.7 2.17-4.84 0-1.19-.4-2.42-1.19-3.69-.78-1.27-1.76-2.58-2.95-3.93-1.21-1.35-2.5-2.75-3.88-4.19a61.368 61.368 0 0 1-3.86-4.47c-1.19-1.55-2.19-3.14-2.96-4.76-.78-1.64-1.19-3.33-1.19-5.1 0-1.98.41-3.7 1.21-5.18.8-1.48 1.86-2.7 3.2-3.66 1.33-.98 2.86-1.71 4.58-2.21 1.71-.48 3.47-.72 5.29-.72 2.11 0 4.02.19 5.76.56 1.72.39 3.2.95 4.44 1.72 1.23.78 2.2 1.74 2.87 2.9.68 1.16 1.02 2.51 1.02 4.05 0 1.19-.39 2.23-1.18 3.12-.79.87-1.88 1.32-3.29 1.32-1.35 0-2.38-.29-3.09-.89-.71-.58-1.06-1.36-1.06-2.38 0-.66.16-1.17.5-1.54.32-.39.69-.69 1.11-.92.4-.24.77-.45 1.09-.61.34-.17.5-.4.5-.69 0-.88-.47-1.57-1.42-2.09-.93-.53-2.15-.79-3.61-.79z"
      />
      <path
        fill="#F18020"
        fill-rule="nonzero"
        d="M497.41 47.46c-.71 2.03-1.53 4.52-2.35 7.05-6.03 18.46-12.39 37.96-37.81 42.29l-6.93 1.1-1.31-9.43 3.3-.49 3.33-.57c19.76-3.37 25.21-20.05 30.36-35.84.75-2.3 1.5-4.6 2.43-7.24l8.98 3.13zM23.57 44.33c.93 2.64 1.68 4.94 2.43 7.24 5.15 15.79 10.6 32.47 30.36 35.84l3.33.57 3.3.49-1.31 9.43-6.93-1.1c-25.42-4.33-31.78-23.83-37.81-42.29-.82-2.53-1.64-5.02-2.35-7.05l8.98-3.13z"
      />
      <path
        fill="#0B9444"
        fill-rule="nonzero"
        d="m397.16 17.52.83 1.29c8.83 13.57 18.03 27.7 3.29 45.69l-7.38-6.04c10.34-12.62 3.08-23.77-3.88-34.48l-.84-1.28 7.98-5.18z"
      />
      <circle
        fill="#0B9444"
        transform="scale(.46134 .46135) rotate(45 303.862 1417.254)"
        r="18.65"
      />
      <path
        fill="#283890"
        d="M374.22 41.45c3.35 3.36 3.35 8.81 0 12.16-3.37 3.36-8.81 3.36-12.17 0-3.36-3.35-3.36-8.8 0-12.16 3.36-3.36 8.8-3.36 12.17 0zm-236.44 0c-3.35 3.36-3.35 8.81 0 12.16 3.37 3.36 8.81 3.36 12.17 0 3.36-3.35 3.36-8.8 0-12.16-3.36-3.36-8.8-3.36-12.17 0zm346.48 105.7-9.54 6.22 2.74 10.46-8.6-6.65-9.31 5.73 3.88-10.13-8.36-7.01 10.86.49 4.23-10.47 2.75 10.84z"
      />
      <path
        fill="#0B9444"
        fill-rule="nonzero"
        d="m122.82 22.7-.84 1.28c-6.96 10.71-14.22 21.86-3.88 34.48l-7.38 6.04c-14.74-17.99-5.54-32.12 3.29-45.69l.83-1.29 7.98 5.18z"
      />
      <path
        fill="#ED1B24"
        d="M87.01 2.52c-3.35 3.36-3.35 8.81 0 12.17A8.607 8.607 0 0 0 99.18 2.52a8.607 8.607 0 0 0-12.17 0zM504.23 140.1c-4.26-2.44-8.03-5.57-11.83-8.72-9.98-8.28-20.19-16.74-35.06-4.57l-6.03-7.38c20.94-17.14 34.19-6.15 47.17 4.61 3.56 2.95 7.1 5.88 10.48 7.83l-4.73 8.23zM424.99 2.52c3.35 3.36 3.35 8.81 0 12.17a8.607 8.607 0 0 1-12.17-12.17 8.607 8.607 0 0 1 12.17 0zM3.04 131.87c3.38-1.95 6.92-4.88 10.48-7.83 12.98-10.76 26.23-21.75 47.17-4.61l-6.03 7.38c-14.87-12.17-25.08-3.71-35.06 4.57-3.8 3.15-7.57 6.28-11.83 8.72l-4.73-8.23z"
      />
      <path
        fill="#0186C9"
        d="M75.53 56.34c-3.36 3.36-3.36 8.8 0 12.17 3.36 3.35 8.81 3.35 12.17 0a8.607 8.607 0 0 0-12.17-12.17zm396.7-48.59-7.67 15.13 11.33 11.45-16.05-2.18-7.73 14.32-2.55-15.95-16-2.82 14.38-7.45-2.35-16.65 11.62 11.92 15.02-7.77zm-35.76 48.59c3.36 3.36 3.36 8.8 0 12.17-3.36 3.35-8.81 3.35-12.17 0a8.607 8.607 0 0 1 12.17-12.17zM39.77 7.75l7.67 15.13-11.33 11.45 16.05-2.18 7.73 14.32 2.55-15.95 16-2.82-14.38-7.45L66.41 3.6 54.79 15.52 39.77 7.75z"
      />
      <circle
        fill="#0B9444"
        transform="scale(-.46134 .46135) rotate(45 -251.037 77.609)"
        r="18.65"
      />
      <path
        fill="#283890"
        d="m27.74 147.15 9.54 6.22-2.74 10.46 8.6-6.65 9.31 5.73-3.88-10.13 8.36-7.01-10.86.49-4.23-10.47-2.75 10.84z"
      />
    </svg>
  );
};
