const SVGFilter = ({ width = 24, height = 24, className = "" }) => (
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
      d="M5 5.78947C5 5.35346 5.34822 5 5.77778 5H18.2222C18.6518 5 19 5.35346 19 5.78947V7.50421C18.9999 8.13226 18.754 8.73471 18.3164 9.17877C18.3164 9.17879 18.3164 9.17874 18.3164 9.17877L15.1111 12.4323V17.6316C15.1111 17.9714 14.8969 18.2731 14.5793 18.3805L9.91262 19.9595C9.67544 20.0397 9.41471 19.9994 9.21189 19.851C9.00907 19.7026 8.88889 19.4643 8.88889 19.2105V12.8052L5.60671 9.14053C5.2164 8.70465 5.00006 8.13674 5 7.54772V5.78947ZM6.55556 6.57895V7.54755C6.55556 7.54757 6.55556 7.54752 6.55556 7.54755C6.5556 7.74383 6.62768 7.93315 6.75773 8.07841C6.75775 8.07843 6.75772 8.0784 6.75773 8.07841L10.2422 11.9689C10.3723 12.1143 10.4444 12.3036 10.4444 12.5V18.1152L13.5556 17.0626V12.1053C13.5556 11.8959 13.6375 11.6951 13.7834 11.547L17.2165 8.06228C17.3623 7.9143 17.4444 7.71351 17.4444 7.50421C17.4444 7.50415 17.4444 7.50427 17.4444 7.50421V6.57895H6.55556Z"
      fill="#494F55"
    />
  </svg>
);

export default SVGFilter;