import React, {ChangeEvent, FC, FormEvent, MouseEvent, useState} from 'react';
import {Button, ButtonGroup, Form, ListGroup, ListGroupItem} from "react-bootstrap";
import classNames from "classnames";


interface ITask {
  task: string;
  isComplete: boolean;
}

export const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [todolist, setTodolist] = useState<ITask[]>([]);
  const [filterParam, setFilterParam] = useState<string | boolean>('All')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  }

  const addTask = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newTask = {task: task, isComplete: false }
    setTodolist([...todolist, newTask]);
    setTask(" ");
  }

  const handleComplete = (task: string, event: ChangeEvent<HTMLInputElement>): void => {
    const newTodolist = todolist.map((item) => {
      if (item.task === task) {
        return {...item, isComplete: event.target.checked}
      }
      return item
    })
    setTodolist(newTodolist);
  }

  const handleFilter = (param: string | boolean, event: MouseEvent<Element>) => {
    setFilterParam(param)
  }

  const predicate = (x:ITask) => x.isComplete === filterParam
  const renderTodolist = filterParam === 'All' ? todolist : todolist.filter(predicate);


  return (
    <div className="container-sm w-75 bg-light py-5 text-center">
      <div className="fs-1 fw-lighter text-danger text-opacity-50"> todos</div>
      <div>
        <ListGroup
            className="fw-light fs-5">
            <ListGroupItem>
              <Form onSubmit={addTask} role="form">
                <Form.Control
                    className="fw-light fs-5 border-0"
                    type="text"
                    placeholder="What needs to be done?"
                    onChange={handleChange}
                    value={task}
                    role="input"

                />
              </Form>
            </ListGroupItem>
            {renderTodolist.map((task:ITask, key: number) => {
              return (
                  <ListGroup.Item
                      key={key}
                      >
                    <Form.Check id={task.task} className="w-100">
                      <Form.Check.Input
                          type={"checkbox"}
                          onChange={(event) => handleComplete(task.task, event)}
                          checked={task.isComplete}
                      />
                      <Form.Check.Label className={classNames('w-100 text-start', task.isComplete && 'text-black text-opacity-25 text-decoration-line-through')}>{task.task}</Form.Check.Label>
                    </Form.Check>
                  </ListGroup.Item>)
            })}
            <ListGroupItem>
              <ButtonGroup>
                <Button variant="light" active={filterParam === 'All'} onClick={(event) => handleFilter('All', event)}>All</Button>
                <Button variant="light" active={filterParam === false} onClick={(event) => handleFilter(false, event)}>Active</Button>
                <Button variant="light" active={filterParam === true} onClick={(event) => handleFilter(true, event)}>Completed</Button>
              </ButtonGroup>
            </ListGroupItem>
        </ListGroup>
        <div>
        </div>
      </div>


    </div>
  );
}


