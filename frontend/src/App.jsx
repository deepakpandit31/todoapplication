import { useState, useEffect } from 'react'

import './index.css'
import api from './api/axios.js'
function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edittodo, editodobyID] = useState(null);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (edittodo) {

      api.put(`/todos/${edittodo}`, {
        title: title,
        description: description
      }).then((response) => {
        console.log("Updated todo", response);
        setTodos(
          todos.map((todo) => {
            if (todo._id === edittodo) {
              return response.data.todo;
            }
            else {
              return todo;
            }
          })
        );
        editodobyID(null);
        setTitle("");
        setDescription("");
      }).catch((error) => {
        alert("Failed to update todo. Please try again.");
        console.log("UPDATE ERROR:", error.response);
      });
      return;
    }
    api.post(`/todos`, {
      title: title,
      description: description,
      status: status
    }).then((response) => {
      setTodos([...todos, response.data.todo]);
      setTitle("");
      setDescription("");
      setStatus("pending");
    }).catch((error) => {
      alert("Failed to add todo. Please try again.");
      console.log(error);
    });


  }
  const handleDeletetodo = (id) => {
    console.log("Deleting ID:", id);
    api.delete(`/todos/${id}`).then((response) => {
      console.log(response);
      setTodos(todos.filter((todo) => todo._id !== id));
    }).catch((error) => {
      alert("Failed to delete todo. Please try again.");
      console.log(error.response);
    })


  }

  const handleEditTodo = (id) => {
    api.get(`/todos/${id}`)
      .then((response) => {
        setTitle(response.data.todobyid.title);
        setDescription(response.data.todobyid.description);
        editodobyID(id);
      }).catch((error) => {
        alert("Failed to edit your task . Please try again.");
        console.log(error.response);
      })
  };
  const handleStatusChanged = (id, newStatus) => {
    api.patch(`/todos/${id}/status`, {
      status: newStatus
    }).then((response) => {
      console.log("status updated :", response);
      setTodos(
        todos.map((todo) => {
          if (todo._id === id) {
            return response.data.todo;
          } else {
            return todo;
          }
        })
      )
    }).catch((error) => {
      alert("Failed to update status. Please try again.");
      console.log("status updated error:", error)
    })
  };
  const handlesearch = () => {
    api.get(`/todos?search=${search}`)
      .then((response) => {
        setTodos(response.data.todos)
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          setTodos([]);
          alert("No todos found");
        } else {
          alert("Something went wrong. Please try again.");
        }
      })

  }
  useEffect(() => {
    setLoading(true);
    api.get("/todos")
      .then((response) => {
        setTodos(response.data.todos);
        console.log(response);
      })
      .catch((error) => {
        alert("Failed to load todo. Please try again.");

        console.log(error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-amber-50 text-center m:text-5xl ">
            My Todo Website
          </h1>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search todos"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-pink-400 focus:ring-2"
            />

            <button onClick={handlesearch}
       
              className="rounded-xl bg-linear-to-r from-yellow-200 to-pink-500  px-6 py-3 font-bold text-slate-950 transition hover:bg-blue-300 active:scale-95"
            >
              Search
            </button>
          </div>
          {loading ? (
            <p>Loading todo list ......</p>
          ) : todos.length === 0 ? (
            <p>No todos found</p>
          ) : (
            todos.map((todo) => (
              <div key={todo._id}
                className="mb-4 rounded-2xl text-white border border-yellow-500 bg-gray-600 p-5 shadow-lg shadow-black/10 transition hover:border-blue-400"
              >
                <p className="text-lg font-semibold text-white">{todo.title}</p>
                <p className="mt-1.5 mb-1.5 text-m  text-slate-400">{todo.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <select
                    value={todo.status}
                    onChange={(e) => handleStatusChanged(todo._id, e.target.value)}
                    className={`rounded-lg border border-pink-200 bg-black px-3 py-2 text-sm font-medium outline-none transition  ${todo.status === "pending" ? "text-red-500" : "text-green-500"
                      }`}
                  >
                    <option value="pending" className=' text-red-500'>Pending</option>
                    <option value="completed" className=' text-green-500'>Completed</option>
                  </select>

                  <button
                    className="rounded-lg bg-pink-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-pink-400 active:scale-95"
                    onClick={() => handleEditTodo(todo._id)}
                  >
                    Edit todo
                  </button>

                  <button
                    className="rounded-lg bg-pink-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-red-400 active:scale-95"
                    onClick={() => handleDeletetodo(todo._id)}
                  >
                    Delete
                  </button>
                </div>
                {/* <select
                  value={todo.status}
                  onChange={(e) => handleStatusChanged(todo._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>

                <button className='bg-amber-100  p-0.5 m-1' onClick={() => handleEditTodo(todo._id)} >Edit todo</button>
                <button className='bg-amber-100  p-0.5 m-1' onClick={() => handleDeletetodo(todo._id)}>
                  Delete
                </button> */}
              </div>

            )))}
          <form onSubmit={handlesubmit}>
            <div className="mt-8 rounded-2xl border border-pink-500/40 bg-gray-900 p-5 shadow-lg">
  <div className="flex flex-col gap-4">
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="title"
      className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
    />

    <input
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="description"
      className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
    />

    <button
      type="Submit"
      className="w-full rounded-xl bg-linear-to-r from-yellow-200 to-pink-500 px-5 py-3 font-bold text-black transition hover:from-yellow-300 hover:to-pink-400 active:scale-[0.98]"
    >
      Add Todo
    </button>
  </div>
</div>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
