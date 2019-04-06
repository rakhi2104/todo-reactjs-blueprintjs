import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import React from "react";
import "./App.css";

export default class NewTaskForm extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <FormGroup labelFor="task-message" label="Todo Message" labelInfo="*">
            <InputGroup
              autoComplete="off"
              id="task-message"
              onChange={this.props.inputMessageChange}
              placeholder="Enter task item"
              style={{ width: 480 }}
              value={this.props.formData.taskMessage}
            />
          </FormGroup>
          <FormGroup label="Due Date" labelFor="task-deadline">
            <DateInput
              formatDate={date => date.toLocaleDateString()}
              id="task-deadline"
              maxDate={new Date(Date.now() + Math.pow(10, 11))}
              minDate={new Date(Date.now() + 6000)}
              onChange={this.props.handleDateChange}
              parseDate={str => new Date(str)}
              placeholder={"DD/MM/YYYY"}
              showActionsBar="true"
              todayButtonText="Today"
              value={this.props.formData.date}
            />
          </FormGroup>

          <Button icon="add" onClick={this.props.onFormSubmit}>
            Add Task
          </Button>
        </Card>

        <div style={{ margin: "auto", marginTop: 12 }}>
          <Button icon="add" onClick={this.props.addDefaultItems}>
            Add Default Items
          </Button>
        </div>
      </div>
    );
  }
}
