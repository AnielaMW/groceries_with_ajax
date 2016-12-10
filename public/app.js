var errorMessage = function () {
  alert('Heavens to Murgatroyd! You forgot to type in the field. So exit, stage left.')
}

var submitClick = function (event) {
  event.preventDefault()

  var newItem = $('#grocery_name').val()

  var listItem = function () {
    $('ul').append('<li>' + newItem + '</li>')
  }

  var postRequest = function () {
    $.ajax({
      method: 'POST',
      url: '/groceries',
      data: { name: newItem }
    }).success(listItem)
  }

  if (newItem === '') { errorMessage() } else { postRequest() }
}

$(document).ready(function () {
  $('form').on('submit', submitClick)
})
