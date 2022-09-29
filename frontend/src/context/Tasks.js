import { createContext,useState, } from "react";

export const TaskContext = createContext(null);

export const   TaskProvider = ({ children }) => {
    const initLists = {
      "Todo":{id:"Todo",title: "Todo",tasks:[]},
      "In Progress":{id:"In Progress",title: "In Progress",tasks:[]},
      "Under Review":{id:"Under Review",title: "Under Review",tasks:[]},
      "Rework":{id:"Rework",title: "Rework",tasks:[]},
      "Completed":{id:"Completed",title: "Completed",tasks:[]},
      
    }
   
    const [tasks, setTasks] = useState([]);

    const [lists,setLists] = useState(initLists);
    const [listOrder, setListOrder] = useState([]) 
    const [data,setData] = useState({});
  
    const HandleTasks = (userTasks) => {
      setTasks(userTasks)
        const obj = {};
        for( const element of userTasks){
            obj[element._id] = element
        }
        setData(prev => {return {
          ...prev,
          tasks:obj
        }});
    };
      


    const HandleLists = (userdata) =>{
        let copiedLists = JSON.parse(JSON.stringify(lists));
        userdata.forEach(element =>
          {
            copiedLists[element.status].tasks.push(element['_id']);
          })
        setLists(copiedLists);
        const newLists = Object.keys(copiedLists)
        setListOrder(newLists);
        setData(prev =>{
          return {
            ...prev,
            lists: copiedLists
          }
        })
    }


  
    return (
      <TaskContext.Provider value={{ tasks,setTasks, lists, setTasks,HandleTasks,HandleLists,data,setData,listOrder }}>
        {children}
      </TaskContext.Provider>
    );
  }

