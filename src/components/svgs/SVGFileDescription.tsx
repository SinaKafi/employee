const SVGFileDescription = ({ width = 24, height = 24, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.3125 4.8C7.06386 4.8 6.8254 4.89482 6.64959 5.0636C6.47377 5.23239 6.375 5.4613 6.375 5.7V18.3C6.375 18.5387 6.47377 18.7676 6.64959 18.9364C6.8254 19.1052 7.06386 19.2 7.3125 19.2H16.6875C16.9361 19.2 17.1746 19.1052 17.3504 18.9364C17.5262 18.7676 17.625 18.5387 17.625 18.3V9.3H14.8125C14.3152 9.3 13.8383 9.11036 13.4867 8.77279C13.135 8.43523 12.9375 7.97739 12.9375 7.5V4.8H7.3125ZM14.8125 6.07279L16.2992 7.5H14.8125V6.07279ZM5.32376 3.79081C5.85121 3.28446 6.56658 3 7.3125 3H13.875C14.1236 3 14.3621 3.09482 14.5379 3.2636L19.2254 7.7636C19.4012 7.93239 19.5 8.16131 19.5 8.4V18.3C19.5 19.0161 19.2037 19.7028 18.6762 20.2092C18.1488 20.7155 17.4334 21 16.6875 21H7.3125C6.56658 21 5.85121 20.7155 5.32376 20.2092C4.79632 19.7028 4.5 19.0161 4.5 18.3V5.7C4.5 4.98392 4.79632 4.29716 5.32376 3.79081ZM8.25 12.9C8.25 12.4029 8.66973 12 9.1875 12H14.8125C15.3303 12 15.75 12.4029 15.75 12.9C15.75 13.3971 15.3303 13.8 14.8125 13.8H9.1875C8.66973 13.8 8.25 13.3971 8.25 12.9ZM8.25 16.5C8.25 16.0029 8.66973 15.6 9.1875 15.6H14.8125C15.3303 15.6 15.75 16.0029 15.75 16.5C15.75 16.9971 15.3303 17.4 14.8125 17.4H9.1875C8.66973 17.4 8.25 16.9971 8.25 16.5Z"
      fill="currentColor"
    />
  </svg>
);

export default SVGFileDescription;