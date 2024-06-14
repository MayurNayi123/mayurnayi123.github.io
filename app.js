
sheetId = "1nrxiQx1kN_Iup_G4-8kV35yKI347YHovHsqPUtlysro"
keyId = "AIzaSyACcT7k6jQJY-4f8B-YJMC8KZ4orKIHRbQ"
var url = "https://sheets.googleapis.com/v4/spreadsheets/"+sheetId+"/?key="+keyId+"&includeGridData=true#gid=0";                                                             
$(document).ready(function () {
  getData();


    $('#productForm').submit(function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get product details from form inputs
    var title = $('#productTitle').val();
    var price = $('#productPrice').val();

    // Prepare data to send to Google Sheets
    var requestData = {
    "range": "Sheet1!A1:C1",
    "majorDimension": "ROWS",
    "values": [
      ["https://images.unsplash.com/photo-1718002129552-a0445f9baeb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title, price]
    ]};
    $.ajax({
    url: "https://sheets.googleapis.com/v4/spreadsheets/"+sheetId+"/values/Sheet1!A1:C1:append?valueInputOption=RAW",
    type: "POST",
    data: JSON.stringify(requestData),
    contentType: "application/json",
    headers:{
      "Authorization": "Bearer ya29.a0AXooCgvJ5nXS4p0eFnu1rgjJnt2dO99D6giSZNQGuzV1r9dsyO86yi6MwjdCjfjnD9oDyWakDbB5ed-jPC5XFcut3oz4uia7DgOldjpSLA6RJKL-xz3XN2PSVH_mhW7BYcn37sRyDjP1k0qPc13-JqOB2BoRP_hU9nITaCgYKAXYSARISFQHGX2MierfbhOZ_EkmG1od7kVdj3Q0171" 
    },
    success: function (response) {
      console.log("Record added successfully");
      getData();
      // Optionally, you can do something after the record is added
    },
    error: function (error) {
      console.error("Error adding record:", error);
    }
});
    // Clear form inputs after submission
    $('#productTitle').val('');
    $('#productPrice').val('');
  });

});

function getData() {
  $.ajax({
          type: "GET",
          url: url,
          success: function (dataResponse, status) {
            $('.products-row').html("");
          var sheet = dataResponse.sheets
          var data = sheet[0].data
          rowData = data[0].rowData
              // Assuming your data is in the format of rows and columns
            products = rowData; // Assuming the first row contains headers
            // Loop through the products and create HTML for each
            for (var i = 0; i < products.length; i++) { // Start from 1 to skip headers
              productDetails = products[i];
              columnsRecords = productDetails.values
              var imageUrl = null
              var title = null
              var price = null
              var product = columnsRecords;
              console.log("product")
              console.log(product)

              imageUrl = product[0].formattedValue; // Assuming first column contains image URLs
              title = product[1].formattedValue; // Assuming second column contains titles
              price = product[2].formattedValue //produc.formattedValue; // Assuming third column contains prices
              // Create card HTML
              var cardHtml = '<div class="col-md-4">';
              cardHtml += '<div class="card">';
              cardHtml += '<img src="' + imageUrl + '" class="card-img-top" alt="...">';
              cardHtml += '<div class="card-body">';
              cardHtml += '<h5 class="card-title">' + title + '</h5>';
              cardHtml += '<p class="card-text">$' + price + '</p>';
              cardHtml += '<a href="#" class="btn btn-primary">Add to Cart</a>';
              cardHtml += '</div></div></div>';

              // Append card HTML to the Products section
              $('.products-row').append(cardHtml);
              }

        },
        error: function ( error) {
            alert("error");
            console.log(error)
        }
    });
}
