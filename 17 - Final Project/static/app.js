 
// event listener for button to enter form info and return prediction in result section.
d3.select("#submit-btn").on("click", function() {

  // do not refresh the page
  d3.event.preventDefault();

  // gather form input and store in variables
  var glucoseInput = d3.select("#AvgGlucose").property("value");
  var bmiInput = d3.select("#BMI").property("value");
  var ageInput = d3.select("#Age").property("value");
  var genderInput = d3.select("#Gender_Male").property("checked")
  var marriageInput = d3.select("#EverMarried_Yes").property("checked") 
  var residenceInput = d3.select("#ResidenceType_Urban").property("checked")
  
  // add variable values to index form IDs
  d3.select("#resultline1").text(`Based on your Input of:`)
  d3.select("#glucoseID").text(`Average Glucose: ${glucoseInput} mg/dL`);
  d3.select("#bmiID").text(`BMI: ${bmiInput}`);
  d3.select("#ageID").text(`Age: ${ageInput}`);
  d3.select("#genderID").text(`Male? ${genderInput}`);
  d3.select("#marriageID").text(`Ever married? ${marriageInput}`);
  d3.select("#residenceID").text(`Is residence urban? ${residenceInput}`);

  // convert categorical variables back to numbers for diagnosis prediction
  if(d3.select("#Gender_Male").property("checked")){var genderInput2 = "1";} else {var genderInput2 = "0";}
  if(d3.select("#EverMarried_Yes").property("checked")){var marriageInput2 = "1";} else {var marriageInput2 = "0";}
  if(d3.select("#ResidenceType_Urban").property("checked")){var residenceInput2 = "1";} else {var residenceInput2 = "0";}

  // based on input url, determine diagnosis
  $.ajax(`/api/predict?avgGlucose=${glucoseInput}&BMI=${bmiInput}&Age=${ageInput}&EverMarried_Yes=${marriageInput2}&ResidenceType_Urban=${residenceInput2}&Gender_Male=${genderInput2}`).done(function (response) {
    d3.select("#diagnosisID").text(response[0].diagnosisText)
  });

 })