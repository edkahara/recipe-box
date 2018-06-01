//import the necessary files
import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

//create a class for displaying the modal for adding a new recipe and export it
export class AddRecipe extends React.Component {
  constructor(props) {//create a state to handle the new recipe
    super(props);
    this.state = {name: "", ingredients: ""};
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handleRecipeIngredientsChange = this.handleRecipeIngredientsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.handleCancel = this.handleCancel.bind(this);
  }
  handleRecipeNameChange(e) {//change the name to reflect user input
    this.setState({name: e.target.value});
  }
  handleRecipeIngredientsChange(e) {//change the ingredients to reflect user input
    this.setState({ingredients: e.target.value});
  }
  handleSubmit(e) {//get the recipe data, manipulate it and call the function for creating a new recipe
    e.preventDefault();
    const onAdd = this.props.onAdd;
    const regExp = /\s*,\s*/;
    var newName = this.state.name;
    var newIngredients = this.state.ingredients.split(regExp);
    var newRecipe = {name: newName, ingredients: newIngredients};
    onAdd(newRecipe);
    this.setState({name: "", ingredients: ""});
  }
  handleCancel() {
    const onAddModal = this.props.onAddModal;
    this.setState({name: "", ingredients: ""});
    onAddModal();
  }
  render() {
    const onShow = this.props.onShow;
    var regex1 = /^\S/;
    var regex2 = /^[^,\s]/;
	  var regex3 = /[^,\s]$/;
    const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);
    return(
      <Modal show={onShow} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsName">
            <ControlLabel>Recipe Name</ControlLabel>
            <FormControl type="text" required onChange={this.handleRecipeNameChange} value={this.state.name} placeholder="Enter Name" />
          </FormGroup>
          <FormGroup controlId="formControlsIngredients">
            <ControlLabel>Recipe Ingredients</ControlLabel>
            <FormControl componentClass="textarea" type="text" required onChange={this.handleRecipeIngredientsChange} value={this.state.ingredients} placeholder="Enter Ingredients(separate by commas)" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!validRecipe} bsStyle="success" onClick={this.handleSubmit}>Save Recipe</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
