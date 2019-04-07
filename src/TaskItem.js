import { Button, Card, Checkbox, Icon, Tag } from "@blueprintjs/core";
import React from "react";

export default class TaskItem extends React.Component {
  render() {
    const task = this.props.task;
    const intent = task.due > new Date() ? "primary" : "danger";
    console.log(intent);
    console.log(task.due, new Date());
    return (
      <Card className="itemCard" key={task.id}>
        <h2 className={task.status ? "taskDone" : ""}>
          <Checkbox
            onChange={() => {
              this.props.handleChangeChecked(task.id);
            }}
            checked={task.status}
          >
            {task.message}
          </Checkbox>
        </h2>
        <Button
          onClick={() => {
            this.props.deleteTask(task.id);
          }}
        >
          <Icon icon="trash" />
        </Button>{" "}
        <Tag minimal>
          Created on <b>{task.timestamp.toLocaleDateString()}</b>
        </Tag>
        {!task.status ? (
          <Tag intent={intent}>
            Due by <b>{task.due.toLocaleDateString()}</b>
          </Tag>
        ) : (
          <div />
        )}
      </Card>
    );
  }
}
