import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 170px;
  height: 30px;
  border: grey solid 1px;
  color: white;
  text-align: center;
  background-color: #2AC0C4;
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: bold;
  &:hover {
    cursor:pointer;
  }
`;

const AddNoteFormContainer = styled.div`
  padding: 2%;
  background-color: rgb(230,230,230);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const HeaderTwo = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  justify-content: row-start;
  align-items: flex-end;
  height: 60px;
`;

const InputTitle = styled.input`
  width: 60%;
  height: 30px;
  margin-bottom: 10px;
  ::-webkit-input-placeholder { text-align:left; }
`;

const InputBodyText = styled.input`
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2%;
  background-color: rgb(230,230,230);
  width: 100%;
`;

const HyperLinkContainer = styled.p`
  display: flex;
  justify-content: flex-end;

`;

const HyperLink = styled.p`
  color: black;
  text-decoration: underline;
  margin-right: 20px;
  font-size: 1.4rem;
  &:hover {
    cursor:pointer;
  }
`;

const NoteBody = styled.p`
  color: rgb(220,220,200);
  font-size: 1.6rem;
  color: black;
`;

function assignButtonText(currentView){
  if(currentView === "add"){
    return "Save";
  }else{
    return "Update";
  }
}

function assignHeaderText(currentView){
  if(currentView === "add"){
    return "Create New Note:";
  }else{
    return "Edit Note:";
  }
}

function assignStateValues(props) {
  let state = {};

  if(props.currentView === "add"){
    state = {
      title: '',
      textBody: '',
      _id: null
    };
  }else{ //edit, note
    state = {
      title: props.note.title,
      textBody: props.note.textBody,
      _id: props.note._id
    }
  }

  state["tags"] = [];
  state["currentView"] = props.currentView;
  state["changingView"] = props.changingView;

  return state;
}

class NoteForm extends React.Component {

  //***you will need to figure out how to handle tag vs tags input field***
  constructor(props) {
    super(props);
    this.state = assignStateValues(props);
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.addNote({
      tags: this.state.tags,
      title: this.state.title,
      textBody: this.state.textBody,
    });
  };

  handleClick = (event, id, type) => {
      console.log("hyperlink clicked; type: " +  type);
      this.props.changeView(
        {
          id: id,
          currentView: type
        }
      );
  };

  render() {
    console.log('** this.state.currentView = ' + this.state.currentView);
    if(this.state.changingView){
      return(<div>Loading...</div>);
    }
    if(this.state.currentView === "add" || this.state.currentView === "edit"){
      return (
        <AddNoteFormContainer>
          <HeaderTwo>{assignHeaderText(this.state.currentView)}</HeaderTwo>
          <form onSubmit={this.submitHandler}>
            <InputTitle
              onChange={this.changeHandler}
              type="text"
              name="title"
              value={this.state.title}
              placeholder="title.."
            />
            <InputBodyText
              onChange={this.changeHandler}
              type="text"
              name="textBody"
              value={this.state.textBody}
              placeholder="note text.."
            />
            <Button>
              {assignButtonText(this.state.currentView)}
            </Button>
          </form>
        </AddNoteFormContainer>
      );
    }else if(this.state.currentView === "note"){ //is "note"
      //add JSX for note display including edit + delete buttons
      return(
        <NoteContainer>
          <HyperLinkContainer>
            <HyperLink onClick={event => this.handleClick(event,this.state._id,"edit")} >edit</HyperLink>
            <HyperLink onClick={event => this.handleClick(event,this.state._id,"delete")} >delete</HyperLink>
          </HyperLinkContainer>
          <HeaderTwo>{this.state.title}</HeaderTwo>
          <NoteBody>{this.state.textBody}</NoteBody>
        </NoteContainer>
      );
    }else{
      //display note with delete overlaid
      return (
        <div>test</div>
      );
    }
  }
}

export default NoteForm;