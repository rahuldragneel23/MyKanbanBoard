import React, { useState, useEffect } from "react";
import ProfileIcon from "./ProfileIcon";
function finduserstatus(customid, users) {
  const user = users.find((user) => user.name === customid);
  return user ? user.available : null;
}
function Head(props) {
  var name = props.name;
  var key = props.keys;
  const [displayname, setdisplayname] = useState("");
  const [displayicon, setIcon] = useState("");
  const [colorclass, setColor] = useState("Grey");
  useEffect(() => {
    if (props.name === "ByPriority") {
      console.log("we are in priority mode");
      console.log(props.keys);
      if (props.keys === "0") {
        console.log("we are inside priority mode");
        setdisplayname("No Priority");
        setIcon("more_horiz");
        setColor("Grey");
      } else if (key === "1") {
        setdisplayname("Low");
        setIcon("signal_cellular_1_bar");
      } else if (key === "2") {
        setdisplayname("Medium");
        setIcon("signal_cellular_3_bar");
      } else if (key === "3") {
        setdisplayname("High");
        setIcon("signal_cellular_4_bar");
      } else if (key === "4") {
        setdisplayname("Urgent");
        setIcon("report");
        setColor("Orange");
      } else {
        setdisplayname("None");
      }
    } else if (name === "ByUser") {
      setdisplayname(props.keys);
      setIcon("account_circle");
    } else if (name === "ByStatus") {
      setdisplayname(props.keys);
      if (key === "Todo") {
        setIcon("circle");
        setColor("Grey");
      } else if (key === "In progress") {
        setIcon("radio_button_partial");
        setColor("Yellow");
      } else if (key === "Backlog") {
        setIcon("cancel");
      } else if (key === "Done") {
        setIcon("check_circle");
        setColor("Blue");
      }
    }
  }, [props.name, props.key]);
  return (
    <div>
      <div className="headdiv">
        <div>
          {props.name === "ByUser" ? (
            <ProfileIcon
              name={displayname}
              userstatus={finduserstatus(displayname, props.userjson)}
            />
          ) : (
            <span className={colorclass}>
              <i class="material-symbols-outlined `${colorclass}`">
                {displayicon}
              </i>
            </span>
          )}
          <p>{displayname}</p>
          <p className="Grey">{props.size}</p>
        </div>
        <div>
          <i class="material-symbols-outlined Grey ">add</i>
          <i class="material-symbols-outlined Grey">more_horiz</i>
        </div>
      </div>
    </div>
  );
}
export default Head;
