import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
// import { showService} from './services';
import { Alert, Card, Row, Column, Button, Form } from './widgets';
import { createHashHistory } from 'history';
import { roomService } from './services';


// for å kunne bytte url med kode, må dette med.
// Hvis man skal bytte url med html tag så bruk <NavLink to="url"/>
const history = createHashHistory();

type Message = {
  text: string,
  chatRoomId: number
}

type RoomType = {
  id?: number,
  title: string,
  description: string
  messages?: Message[]
}

class Home extends Component {
  
  rooms: RoomType[] = [];
  room: RoomType = {
    title: "",
    description: ""
  }
  
  render() {
    return (
      <div>
        <h1>
          ChatApp
        </h1>
        <Card title="Chat rooms">
          { 
            this.rooms?.map((room, index) => {
              return <div key={index}>
                <NavLink to={`/room/${room.id}`} >
                        { room.title }
                  </NavLink>
              </div>
            })
          }
        </Card>
        <Card title="New chat room">
          <Form.Label>
            Title
          </Form.Label>
          <Form.Input 
            type='text'
            value={this.room.title}
            onChange={e => this.room.title = e.target.value }
          />

          <br />

          <Form.Label>
            Description
          </Form.Label>
          <Form.Input 
            type='text'
            value={this.room.description}
            onChange={e => this.room.description = e.target.value }
          />

          <br />
          
          <Button.Success
            onClick={this.create}
          >
            Create chat room
          </Button.Success>
        </Card>
      </div>
    );
  }

  async create(): Promise<void> { 
    if (!this.room.title.length && !this.room.description.length) return;
    await roomService.insertRoom(this.room);
    this.rooms = await roomService.getRooms();
    this.room.title = "";
    this.room.description = "";
  }

  async mounted(): Promise<void> { this.rooms = await roomService.getRooms(); }
}

class Room extends Component<{ match: { params: { id: string } } }> {

  room: RoomType = {
    title: "",
    description: ""
  };

  message: string = "";

  render() {
    return (
      <div>
        <NavLink to={"/"}>
          Chat rooms
        </NavLink>
        <Card title="Chat room">
          <Card title={this.room?.title}>
            <p>
              { this.room?.description }
            </p>
            <Card title="Messages">
              {
                this.room?.messages?.map((message, index) => {
                  return <p key={index}>
                            - { message.text }
                        </p>
                })
              }
            </Card>
          </Card>

          <Card title="New message">
              <Form.Input
                type='text'
                value={this.message}
                onChange={e => this.message = e.target.value}
              />
              <Button.Success
                onClick={this.addMessage}
              >
                Create message
              </Button.Success>
          </Card>
        </Card>
      </div>
    );
  }

  async addMessage(): Promise<void> {
    if (!this.message.length) return;
    await roomService.addMessage(this.message, Number(this.props.match.params.id));
    this.message = "";
    if (this.room.id) this.room.messages = await roomService.getMessages(this.room.id);
  }

  async mounted(): Promise<void> {
    this.room = await roomService.getRoom(Number(this.props.match.params.id));
    if (this.room.id) this.room.messages = await roomService.getMessages(this.room.id);
  }
}


let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <div>
      <Alert />
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/room/:id" component={Room} />
        </div>
      </HashRouter>
    </div>
  );
