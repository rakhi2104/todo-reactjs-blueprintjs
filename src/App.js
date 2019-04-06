import { Card, Icon, NonIdealState } from "@blueprintjs/core";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import React, { Component } from "react";
import uuid from "uuid";
import "./App.css";
import NewTaskForm from "./NewTaskForm";
import TaskItem from "./TaskItem";

class App extends Component {
  state = {
    formData: {
      date: new Date(Date.now() + 864 * Math.pow(10, 5)),
      taskMessage: ""
    },
    tasks: []
  };

  addDefaultItems = () => {
    var defaultTasks = [];
    var counter = this.state.tasks.length;
    for (var i = 0; i < 3; i++) {
      var taskID = uuid.v4();
      defaultTasks.push({
        due: new Date(
          Date.now() + Math.ceil(Math.random() * 10) * 864 * Math.pow(10, 5)
        ),
        id: taskID,
        message: "Task " + (counter + i + 1),
        status: Math.random() > 0.65 ? 1 : 0,
        timestamp: new Date(Date.now())
      });
    }
    var finalTasks = this.state.tasks
      .concat(defaultTasks)
      .sort((a, b) => a.status - b.status);

    this.setState({
      tasks: finalTasks
    });
  };

  deleteTask = taskID => {
    var oldTasks = this.state.tasks;
    oldTasks.sort((a, b) => a.status - b.status);
    oldTasks.some((item, index) => {
      if (item.id === taskID) {
        oldTasks.splice(index, 1);
      }
      return null;
    });
    this.setState({
      tasks: oldTasks
    });
  };

  handleChangeChecked = taskID => {
    const oldTasks = this.state.tasks;
    oldTasks.forEach(item => {
      if (item.id === taskID) item.status = !item.status;
    });

    oldTasks.sort((a, b) => a.status - b.status);

    this.setState({
      tasks: oldTasks
    });
  };

  handleDateChange = date => {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        date
      }
    });
  };

  inputMessageChange = message => {
    if (message.target.value !== "") {
      this.setState({
        ...this.state,
        formData: {
          ...this.state.formData,
          taskMessage: message.target.value
        }
      });
    }
  };

  onFormSubmit = e => {
    if (this.state.formData.taskMessage !== "") {
      var newUUID = uuid.v4();

      var newTask = {
        due: this.state.formData.date,
        id: newUUID,
        message: this.state.formData.taskMessage,
        status: 0,
        timestamp: new Date(Date.now())
      };

      var oldTasks = this.state.tasks;
      oldTasks.push(newTask);
      oldTasks.sort((a, b) => a.status - b.status);

      this.setState({
        formData: {
          taskMessage: "",
          date: new Date(Date.now() + 864 * Math.pow(10, 5))
        },
        tasks: oldTasks
      });
    }
  };

  render() {
    const taskComps = [];
    this.state.tasks.forEach(item => {
      taskComps.push(
        <TaskItem
          deleteTask={this.deleteTask}
          handleChangeChecked={this.handleChangeChecked}
          key={item.id}
          task={item}
        />
      );
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1>React To-Do App</h1>
        </header>

        <main>
          <div className="mainContent">
            <div className="left">
              <h3 style={{ textAlign: "center" }}>CREATE TASKS</h3>

              <NewTaskForm
                addDefaultItems={this.addDefaultItems}
                formData={this.state.formData}
                handleDateChange={this.handleDateChange}
                inputMessageChange={this.inputMessageChange}
                onFormSubmit={this.onFormSubmit}
              />

              <div style={{ textAlign: "center", marginTop: 24 }}>
                Developed by <Icon icon="git-branch" />{" "}
                <a href="https://github.com/rakhi2104">rakhi2104</a>
              </div>
            </div>

            <div className="right">
              <h3 style={{ textAlign: "center" }}>TASKS</h3>
              {taskComps.length > 0 ? (
                taskComps
              ) : (
                <Card style={{ minHeight: 360 }}>
                  <NonIdealState
                    description="Create new task from the left panel"
                    icon="timeline-events"
                    title="No Tasks Yet"
                  />
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
