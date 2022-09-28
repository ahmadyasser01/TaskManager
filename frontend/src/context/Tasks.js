import { createContext,useState, } from "react";

export const TaskContext = createContext(null);

export const   TaskProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [tasks, setTasks] = useState([]);
    // const [lists,setLists] = useState([
    //     'Todo',
    //     'In Progress',
    //     'Under Review',
    //     'Rework',
    //     'Completed'
    // ]);
    const [lists,setLists] = useState(
      {
        "Todo":{id:"Todo",title: "Todo",tasks:[]},
        "In Progress":{id:"In Progress",title: "In Progress",tasks:[]},
        "Under Review":{id:"Under Review",title: "Under Review",tasks:[]},
        "Rework":{id:"Rework",title: "Rework",tasks:[]},
        "Completed":{id:"Completed",title: "Completed",tasks:[]},
        
      }
      );
    const [listOrder, setListOrder] = useState([]) 
    const [data,setData] = useState({});
  
    const HandleTasks = (userTasks) => {
      setTasks(userTasks)
        const obj = {};
        for( const element of userTasks){
            obj[element.title] = element
        }
        setData(prev => {return {
          ...prev,
          tasks:obj
        }});
    };
      

    // const HandleTasks = (userTasks) => {
    //     setTasks(userTasks);
    // };

    const HandleLists = (userdata) =>{
        let copiedLists = JSON.parse(JSON.stringify(lists));
        userdata.forEach(element =>
          {
            copiedLists[element.status].tasks.push(element['title']);
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
    const HandleData = (userTasks)=>{
        HandleTasks(userTasks);
        // HandleLists();
        
    }

  
    return (
      <TaskContext.Provider value={{ tasks, lists, setTasks,HandleTasks,HandleLists,data,setData,listOrder }}>
        {children}
      </TaskContext.Provider>
    );
  }

