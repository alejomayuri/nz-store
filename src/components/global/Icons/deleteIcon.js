import * as React from "react"

const DeleteIcon = (props) => (
  <svg
    style={{
      enableBackground: "new 0 0 128 128",
    }}
    viewBox="0 0 128 128"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={64}
      cy={64}
      r={64}
    />
    <path
      d="M100.3 90.4 73.9 64l26.3-26.4c.4-.4.4-1 0-1.4l-8.5-8.5c-.4-.4-1-.4-1.4 0L64 54.1 37.7 27.8c-.4-.4-1-.4-1.4 0l-8.5 8.5c-.4.4-.4 1 0 1.4L54 64 27.7 90.3c-.4.4-.4 1 0 1.4l8.5 8.5c.4.4 1.1.4 1.4 0L64 73.9l26.3 26.3c.4.4 1.1.4 1.5.1l8.5-8.5c.4-.4.4-1 0-1.4z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
)

export default DeleteIcon