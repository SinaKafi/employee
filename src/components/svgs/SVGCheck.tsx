const SVGCheck = ({ width = 24, height = 24, className = "" }) => (
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
      d="M19.7416 7.24408C20.0861 7.56951 20.0861 8.09715 19.7416 8.42259L10.918 16.7559C10.5735 17.0814 10.0148 17.0814 9.6702 16.7559L5.25844 12.5893C4.91385 12.2638 4.91385 11.7362 5.25844 11.4107C5.60302 11.0853 6.16169 11.0853 6.50627 11.4107L10.2941 14.9882L18.4937 7.24408C18.8383 6.91864 19.397 6.91864 19.7416 7.24408Z"
      fill="#494F55"
    />
  </svg>
);

export default SVGCheck;
