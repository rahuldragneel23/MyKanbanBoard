import "./Style.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./components/Card";
import Head from "./components/Head";
import Popup from "./components/popup";
import { groupTasks } from "./components/functions/grouptasks";
import { doneTasks } from "./components/functions/doneTasks";
function App() {
  const [optionGroup, setoptionGroup] = useState("ByStatus");
  const [optionOrder, setoptionOrder] = useState("Priority");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    
  }, []);


  const handleDisplayButtonClick = () => {
    setIsDropdownVisible((prevIsDropdownVisible) => !prevIsDropdownVisible);
  };


  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {

    document.addEventListener("mousedown", handleOutsideClick);

  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);



  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        const { tickets, users } = response.data;
        setTasks(tickets);
        setUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  function FindUsers(customid) {
    const user = users.find((user) => user.id === customid);
    return user ? user.name : null;
  }

  function FindUsersstatus(customid) {
    const user = users.find((user) => user.id === customid);
    return user ? user.available : null;
  }

  const handleGroupingChange = (value) => {
    setoptionGroup(value);
  };
  const handleOrderingChange = (value) => {
    setoptionOrder(value);
  };
  const groupedTasks = groupTasks(tasks, optionGroup, users);
  const sortedTasks = doneTasks(groupedTasks, optionOrder);

  return (
    <div>
      <div className="navbar">
        <button onClick={handleDisplayButtonClick}>
          <span class="material-symbols-outlined">tune</span>
          <span>Display</span>
          <span class="material-symbols-outlined">expand_more</span>
        </button>
        <br />
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="dropdown-container"
            onClick={(e) => e.stopPropagation()} 
          >
            <Popup
              optionGroup={optionGroup}
              optionOrder={optionOrder}
              onGroupChange={handleGroupingChange}
              onOrderChange={handleOrderingChange}
            />
          </div>
        )}
      </div>
      <div>
        <br />
        <div className="">
          <div className="card-grid-parent">
            {sortedTasks.map(([key, tasks]) => (
              <div key={key} className="card-grid">
                <Head
                  name={optionGroup}
                  keys={key}
                  size={tasks.length}
                  userjson={users}
                />

                <div className="task-cards">
                  {tasks.map((task) => (
                    <div key={task.id} className="task-card">
                      <Card
                        jsondata={task}
                        name={FindUsers(task.userId)}
                        userstatus={FindUsersstatus(task.userId)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
