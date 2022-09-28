import { createContext,useState, } from "react";

export const TaskContext = createContext(null);

export const   TaskProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [tasks, setTasks] = useState([]);
    const [lists,setLists] = useState([
        'Todo',
        'In Progress',
        'Under Review',
        'Rework',
        'Completed'
    ]);
    // const [lists,setLists] = useState(
    //     {
    //         "Todo":{id:1,title: "Todo",tasks:[]},
    //         "In Progress":{id:2,title: "In Progress",tasks:[]},
    //         "Under Review":{id:3,title: "Under Review",tasks:[]},
    //         "Rework":{id:4,title: "Rework",tasks:[]},
    //         "Completed":{id:5,title: "Completed",tasks:[]},

    //     }
    // );
  
    // const HandleTasks = (userTasks) => {
    //     const obj = {};
    //     for( const element of userTasks){
    //         obj[element.name] = element
    //     }
    //     setTasks(obj);
    // };
      
    const HandleTasks = (userTasks) => {
        setTasks(userTasks);
    };

    // const HandleLists = () =>{
    //     let copiedLists = JSON.parse(JSON.stringify(lists));
    //     // tasks.forEach(element =>{
    //     //     copiedLists[element.status].push(element)
    //     //     console.log(copiedLists[element.status]);
    //     // })
    //     tasks.map(task =>
    //         {
    //             copiedLists[task.status][tasks] = tasks.filter(t => task.status === t.status)
    //         })
    //         console.log('====================================');
    //         console.log(copiedLists);
    //         console.log('====================================');
       
    //     setLists(copiedLists);
    // }
    const HandleData = (userTasks)=>{
        HandleTasks(userTasks);
        // HandleLists();
        console.log(tasks,lists);
    }

  
    return (
      <TaskContext.Provider value={{ tasks, lists, setTasks }}>
        {children}
      </TaskContext.Provider>
    );
  }

