import { useEffect, useState } from "react";
import ProfileIcon from "./ProfileIcon";



function Card(props) {
  const obj = props.jsondata;
  console.log(obj);
  const [displayicon, setIcon] = useState("");
  const [colorclass, setColor] = useState("");
  useEffect(() => {
    if (obj.status === "Todo") {
      setIcon("circle");
      setColor("Grey");
    } else if (obj.status === "In progress") {
      setIcon("radio_button_partial");
      setColor("Yellow");
    } else if (obj.status === "Done") {
      setIcon("check_circle");
      setColor("Blue");
    } else if (obj.status === "Backlog") {
      setIcon("cancel");
    }
  }, [obj.status]);
  return (
    <div className="card">
      <div>
        <span className="Grey">{obj.id}</span>
        <ProfileIcon name={props.name} userstatus={props.userstatus} />
      </div>
      <div>
        <span className={colorclass}>
          <i class="material-symbols-outlined ">{displayicon}</i>
        </span>
        <span>{obj.title}</span>
      </div>
      {obj.tag.map((item) => (
        <div className="tag-card" key={item}>
          <div></div>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
export default Card;
