
import React, { useState } from 'react';
import './ToDoForm.css'; // Import the CSS file

function ToDoForm() {
  const [todos, setTodos] = useState([
    { id: 1, type: 'text', label: 'Text Field', value: '' },
    // Initial state with a text field; you can add other types similarly
  ]);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [newOption, setNewOption] = useState('');



  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setSelectedFieldId(null);
  };

  const addField = (type, label) => {
    let initialOptions = [];
    if (type === 'radio') {
      initialOptions = ['Option 1', 'Option 2']; // Add initial options for radio fields
    }

    const newField = {
      id: todos.length + 1,
      type: type,
      label: label || 'New Field',
      value: type === 'radio' || type === 'checkbox' ? [] : '',
      options: initialOptions,
    };
    setTodos([...todos, newField]);
    setShowOptions(false);
  };

  const addDynamicOption = (fieldId) => {
    const updatedFields = todos.map((field) =>
      field.id === fieldId ? { ...field, options: [...field.options, newOption] } : field
    );
    setTodos(updatedFields);
    setNewOption('');
  };

  const deleteField = (id) => {
    const updatedFields = todos.filter((field) => field.id !== id);
    setTodos(updatedFields);
  };

  const handleTodoChange = (e, id) => {
    const { name, value } = e.target;
    const updatedFields = todos.map((field) =>
      field.id === id ? { ...field, [name]: value } : field
    );
    setTodos(updatedFields);
  };
  

// const handleOptionChange = (id, optionIndex) => {
//   const updatedFields = todos.map((field) => {
//     if (field.id === id) {
//       return {
//         ...field,
//         value: field.options[optionIndex],
//       };
//     }
//     return field;
//   });
//   setTodos(updatedFields);
// };

const handleOptionChange = (id, optionIndex) => {
  const updatedFields = todos.map((field) =>
    field.id === id
      ? {
          ...field,
          value: optionIndex === field.value ? null : optionIndex, // Toggle selection
        }
      : field
  );
  setTodos(updatedFields);
};


  
  const handleSelectChange = (e, id) => {
    const updatedFields = todos.map((field) =>
      field.id === id ? { ...field, value: e.target.value } : field
    );
    setTodos(updatedFields);
     //   setSelectedFieldId(id); 
  };

  

  const handleEditableChange = (e, id, fieldToUpdate) => {
    const updatedFields = todos.map((field) =>
      field.id === id ? { ...field, [fieldToUpdate]: e.target.textContent } : field
    );
    setTodos(updatedFields);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(todos);
    //setTodos([]);
  };

  
  const handleAddOption = () => {
    const updatedFields = todos.map((field) => {
      if (field.id === selectedFieldId) {
        const updatedOptions = [...field.options, 'New Option'];
        return { ...field, options: updatedOptions };
      }
      return field;
    });
    setTodos(updatedFields);
  };
  
  
  const handleDeleteOption = (fieldId, optionIndex) => {
    const updatedFields = todos.map((field) =>
      field.id === fieldId
        ? {
            ...field,
            options: field.options.filter((opt, index) => index !== optionIndex),
          }
        : field
    );
    setTodos(updatedFields);
  };

  return (
<form onSubmit={handleSubmit}>
    {todos.map((field) => (
      <div key={field.id}>
          <label
            contentEditable="true"
            onBlur={(e) => handleEditableChange(e, field.id, 'label')}
            className="editable-label"
          >
            {field.label}
          </label>
        {field.type === 'text' && (
          <input
            type="text"
            name="value"
            value={field.value}
            onChange={(e) => handleTodoChange(e, field.id)}
            required
          />
        )}
        {field.type === 'radio' && (
          <div>
            {field.options.map((option, index) => (
              <div key={index} className='radio-option'>
                <input
                  type="radio"
                  //checked={field.value === option}
                  checked={field.value === index}
                  //value={option}
                  // onChange={() =>
                  //   handleOptionChange({ target: { value: option } }, field.id)
                  // }
                  onChange={() => handleOptionChange(field.id, index)}
                />
                
                {/* <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(e, field.id, index)}
                  onClick={() => setSelectedFieldId(field.id)}
                /> */}
                 <span
                    contentEditable="true"
                    onBlur={(e) => handleOptionChange(e,field.id, index)}
                    onClick={() => setSelectedFieldId(field.id)}
                    className="editable-option"
                  > 
                    {option}
                  </span>
                <button onClick={() => handleDeleteOption(field.id, index)}>
                  Delete
                </button>
              </div>
            ))}
            {selectedFieldId === field.id && (
              <button onClick={() => handleAddOption(field.id)}>
                Add Option
              </button>
            )}
          </div>
        )}
        {field.type === 'checkbox' && (
          <div>
            <input
              type="checkbox"
              checked={field.value[0]}
              onChange={(e) => handleOptionChange(e, field.id, 0)}
            />
            <label>Check</label>
          </div>
        )}
        

{field.type === 'select' && (
  <div key={field.id}>
    <label
      contentEditable="true"
      onBlur={(e) => handleEditableChange(e, field.id, 'label')}
      className="editable-label"
    >
      {field.label}
    </label>
    <select
      value={field.value}
      onChange={(e) => handleSelectChange(e, field.id)}
    >
      {field.options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
      <option disabled hidden>Add New Option...</option>
    </select>
    <div className="editable-options">
      <input
        type="text"
        placeholder="New Option..."
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
      />
      <button onClick={() => addDynamicOption(field.id)}>Add Option</button>
    </div>
    <button onClick={() => deleteField(field.id)}>Delete</button>
  </div>
)}

<button onClick={() => deleteField(field.id)}>Delete</button>

      </div>
    ))}
    <div className="button-group">
      <button onClick={toggleOptions}>+</button>
      {showOptions && (
        <div className="options">
          <button onClick={() => addField('text')}>Add Text Field</button>
          <button onClick={() => addField('radio')}>Add Radio Field</button>
          <button onClick={() => addField('checkbox')}>
            Add Checkbox Field
          </button>
          <button onClick={() => addField('select')}>Add Select Field</button>
        </div>
      )}
    </div>
    <button type="submit" style={{ marginBottom: '20px' }}>
      Submit
    </button>
  </form>
  

  
  );
}

export default ToDoForm;
