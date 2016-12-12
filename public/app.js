var submitClick = function (event) {
  event.preventDefault();

  var errorMessage = function () {
    alert('Heavens to Murgatroyd! You forgot to type in the field. So exit, stage left.');
  }

  var newItem = $('#grocery_name').val();

  var listItem = function () {
    $('ul').append('<li>' + newItem + ' <input type="button" id="remove_item" value="Delete"</input></li>');
    $('#grocery_name').val("");
  }

  var postRequest = function () {
    $.ajax({
      method: 'POST',
      url: '/groceries',
      data: {name: newItem}
    }).success(listItem);
  }

  if (newItem.trim() === '') {errorMessage()}
  else {postRequest()};
}

//------------------------------------------------

var deleteClick = function (event) {
  event.preventDefault();

  var item = $(this).closest('li')
  var text = item.text().trim();

  var confirmMessage = function () {
    return confirm('You are about to delete ' + text + '.');
  }

  var deleteItem = function () {
    item.remove();
  }

  var deleteRequest = function () {
    if (confirmMessage() === true) {
      $.ajax({
        method: 'DELETE',
        url: '/groceries',
        data: {name: text}
      }).success(deleteItem);
    }
  }

  deleteRequest()
}

//------------------------------------------------

$(document).ready(function () {
  $('form').on('submit', submitClick);
  $('ul').on('click', '#remove_item', deleteClick);
});
