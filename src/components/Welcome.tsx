import React from "react";

interface Props {
  name?: string;
}

const Welcome: React.FC<Props> = (props) => {
  return (
    <>
      <div>{props.name === "" ? "Geust" : props.name} 님</div>
      <div>환영합니다 :)</div>
    </>
  )
}

export default Welcome;
