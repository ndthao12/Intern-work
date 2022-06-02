import { useEffect, useState } from 'react';
import './App.scss';
import queryString from 'query-string';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  ])

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  })

  useEffect(() => {
    async function fetchPostList() {

      try {

        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const respone = await fetch(requestUrl);
        const responeJSON = await respone.json();
        console.log({ responeJSON });

        const { data, pagination } = responeJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('failed to fetch post list: ', error.message)
      }
    }

    fetchPostList();
  }, [filters]);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleFormSubmit(formValue) {
    console.log(formValue);
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      ...formValue,
    };
    const newTodoList = [newTodo, ...todoList];
    setTodoList(newTodoList);
  }

  function handlePageChange(newPage) {
    console.log('New page:', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleFilterChange(newFilters) {
    console.log('Filter: ', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="app">
      <h1>React hooks</h1>

      <PostFiltersForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      {/* <TodoForm onSubmit={handleFormSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />

      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Hide Clock</button>
    </div>
  );
}

export default App;
