const SVGCalendar = ({ width = 24, height = 24, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.88889 4C9.31844 4 9.66667 4.35817 9.66667 4.8V5.6H14.3333V4.8C14.3333 4.35817 14.6816 4 15.1111 4C15.5407 4 15.8889 4.35817 15.8889 4.8V5.6H16.6667C17.2855 5.6 17.879 5.85286 18.3166 6.30294C18.7542 6.75303 19 7.36348 19 8V17.6C19 18.2365 18.7542 18.847 18.3166 19.2971C17.879 19.7471 17.2855 20 16.6667 20H7.33333C6.71449 20 6.121 19.7471 5.68342 19.2971C5.24583 18.847 5 18.2365 5 17.6V8C5 7.36348 5.24583 6.75303 5.68342 6.30294C6.121 5.85286 6.7145 5.6 7.33333 5.6H8.11111V4.8C8.11111 4.35817 8.45933 4 8.88889 4ZM8.11111 7.2H7.33333C7.12705 7.2 6.92922 7.28429 6.78336 7.43431C6.6375 7.58434 6.55556 7.78783 6.55556 8V10.4H17.4444V8C17.4444 7.78783 17.3625 7.58434 17.2166 7.43431C17.0708 7.28429 16.8729 7.2 16.6667 7.2H15.8889V8C15.8889 8.44183 15.5407 8.8 15.1111 8.8C14.6816 8.8 14.3333 8.44183 14.3333 8V7.2H9.66667V8C9.66667 8.44183 9.31844 8.8 8.88889 8.8C8.45933 8.8 8.11111 8.44183 8.11111 8V7.2ZM17.4444 12H6.55556V17.6C6.55556 17.8122 6.6375 18.0157 6.78336 18.1657C6.92922 18.3157 7.12705 18.4 7.33333 18.4H16.6667C16.8729 18.4 17.0708 18.3157 17.2166 18.1657C17.3625 18.0157 17.4444 17.8122 17.4444 17.6V12ZM10.4444 14.4C10.4444 13.9582 10.7927 13.6 11.2222 13.6H12C12.4296 13.6 12.7778 13.9582 12.7778 14.4V16.8C12.7778 17.2418 12.4296 17.6 12 17.6C11.5704 17.6 11.2222 17.2418 11.2222 16.8V15.2C10.7927 15.2 10.4444 14.8418 10.4444 14.4Z"
      fill="currentColor"
    />
  </svg>
);

export default SVGCalendar;