// Add your JavaScript code here
function validateInput(value) {
    return /^\d*(\.\d+)?$/.test(value);
  }
  
  function calculateTax() {
    // Hide all error icons
    var errorIcons = document.getElementsByClassName('error-icon');
    for (var icon of errorIcons) {
      icon.style.display = 'none';
    }
  
    // Validate and collect form data
    var grossIncome = document.getElementById('grossIncome').value;
    var extraIncome = document.getElementById('extraIncome').value;
    var ageGroup = document.getElementById('ageGroup').value;
    var deductions = document.getElementById('deductions').value;
    var tax = 0;
    
    // Validation flags
    var isValid = true;
  
    // Validate Gross Income
    if (!validateInput(grossIncome)) {
      document.getElementById('grossIncome').nextElementSibling.style.display = 'inline';
      isValid = false;
    }
  
    // Validate Extra Income
    if (!validateInput(extraIncome)) {
      document.getElementById('extraIncome').nextElementSibling.style.display = 'inline';
      isValid = false;
    }
  
    // Validate Deductions
    if (!validateInput(deductions)) {
      document.getElementById('deductions').nextElementSibling.style.display = 'inline';
      isValid = false;
    }
  
    // Check if age group is selected
    if (!ageGroup) {
      document.getElementById('ageGroup').nextElementSibling.style.display = 'inline';
      isValid = false;
    }
    
    if (!isValid) return; // Stop calculation if validation fails
    
    var totalIncome = parseFloat(grossIncome) + parseFloat(extraIncome || 0) - parseFloat(deductions || 0);
    
    // Calculate tax based on age and income
    if (totalIncome > 800000) {
      switch (ageGroup) {
        case '<40':
          tax = 0.30 * (totalIncome - 800000);
          break;
        case '>=40 & <60':
          tax = 0.40 * (totalIncome - 800000);
          break;
        case '>=60':
          tax = 0.10 * (totalIncome - 800000);
          break;
      }
    }
    
    
  var formattedResult = totalIncome.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
  
    // Update the modal content
    document.getElementById('resultText').innerHTML = '<span style="font-size: 20px;">Your overall income will be</span><br>' + 
    '<span style="font-size: 20px;">' + formattedResult + '</span><br>' +
    '<span style="font-size: 14px;">after tax deductions</span>';
  
  document.getElementById('resultModal').style.display = 'block';
  
  
  }
  
  function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
  }