function handleSubmit(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
  
    // Perform form validation here
    const isValid = validateForm(formObject);
  
    if (isValid) {
      // Submit form data to server here
      console.log('Form is valid. Submit data:', formObject);
    } else {
      // Display error messages here
      console.log('Form is invalid.');
    }
  }
  
  function validateForm(formObject) {
    // Example validation rules
    const rules = {
      firstName: { required: true, minLength: 2 },
      lastName: { required: true, minLength: 2 },
      phoneNo: { required: true},
      age: { required: true, min: 18, max: 120 },
      email: { required: true },
      password: { required: true }
    };
  
    let isValid = true;
  
    for (const key in formObject) {
      if (rules.hasOwnProperty(key)) {
        const rule = rules[key];
        const value = formObject[key];
  
        if (rule.required && !value) {
          setError(key, 'This field is required.');
          isValid = false;
        } else if (rule.pattern && !rule.pattern.test(value)) {
          setError(key, 'Invalid format.');
          isValid = false;
        } else if (rule.minLength && value.length < rule.minLength) {
          setError(key, `Minimum length is ${rule.minLength}.`);
          isValid = false;
        } else if (rule.min && value < rule.min) {
          setError(key, `Minimum value is ${rule.min}.`);
          isValid = false;
        } else if (rule.max && value > rule.max) {
          setError(key, `Maximum value is ${rule.max}.`);
          isValid = false;
        } else {
          setSuccess(key);
        }
      }
    }
  
    return isValid;
  }
  
  function setError(field, message) {
    // Add error styling and display error message here
    console.log(`Error in field ${field}: ${message}`);
  }
  
  function setSuccess(field) {
    // Remove error styling and hide error message here
    console.log(`Success in field ${field}`);
  }