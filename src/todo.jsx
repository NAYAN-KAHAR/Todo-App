import { useState, useEffect } from 'react';

const TodoApp  = () => {
  const [value, setValue] = useState();
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState()

//load all todos  from localstorage
  useEffect(() => {
    const getAllTodos = JSON.parse(localStorage.getItem("todos"))
    if(getAllTodos){
      setTodos(getAllTodos);
    }
  },[]);

  //setTodo on localstorage
  useEffect(() => {
     localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);


  const handleInput = (e) => {
    setValue(e.target.value)
    // console.log('value',value);
  }

  const addTodo = () => {
    if(edit){
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = value;  // Update the specific todo by index
      console.log(updatedTodos[editIndex]);
      setTodos(updatedTodos);
      setValue("");
      setEdit(false);

    }else{
        if (value.trim() === "") return; // prevent adding empty todos
        setTodos([...todos, value]);
        setEdit(false);
         setValue("");
       }
  }

  const deleteBtn = (i) => {
    const oldTodo = [...todos];
    oldTodo.splice(i,1);
    setTodos(oldTodo);
  }

const updateBtn = (data,index) => {
    setEdit(true);
    setValue(data);
    setEditIndex(index);

 }



  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 col-sm-12 col-mb-12">
          <div className="card mt-4">
          <div className="card-body">

          <div className="d-flex main-div">
          <input type="text" value={value} onChange={handleInput} className="form-control" />
          <button onClick={addTodo} className="btn btn-sm btn-primary mx-2">{edit? "Update":"Add Todo"}</button>
          <button onClick={() => setTodos([])} className="btn btn-sm btn-danger">ClearAll</button>
          </div>

          </div></div>

          <div className="card mt-4 ul-card" style={{
            display: todos && todos.length > 0 ? 'block' : 'none'
          }}>
          <div className="card-body">

          <ul className="ms-auto  mb-2 mb-lg-0">
            {todos && todos.map((data, index) => {
              return <li key={index}>{data} 
              <button onClick={(index) => deleteBtn()} className="btn btn-sm btn-danger mx-4 li-btn1">Delete</button>

              <button onClick={() => updateBtn(data,index)} className="btn btn-sm btn-warning li-btn2">Edit</button>
              </li>
            })

            }

          </ul>
          </div></div>
      </div></div></div>
    </>
  );
}

export default TodoApp;
