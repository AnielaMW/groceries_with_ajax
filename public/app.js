var submitClick = function (event) {
  event.preventDefault();

  var errorMessage = function () {
    alert('Heavens to Murgatroyd! You forgot to type in the field. So exit, stage left.');
  }

  var newItem = $('#grocery_name').val();

  var listItem = function () {$('ul').append('<li>' + newItem + ' <input type="button" id="remove_item" value="Delete"</input></li>');}

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

  var item = $(this).closest('li').val();
  // ^^^ I know this is wrong, because it is calling the item and the delete button.

  var confirmMessage = function () {
    confirm('You are about to delete ' + item + '.');
  } // ^^^ I'm not exctly sure how this confirm method works. I know it will ask the user to confirm their request, but does the confirm method know what to do when ok or cancle are clicked?

  var deleteItem = function () {
    $(this).closest('li').remove();
    // ^^^ I know this is wrong, but I don't know why.
  }

  var deleteRequest = function () {
    confirmMessage();
    $.ajax({
      method: 'DELETE',
      url: '/groceries',
      data: {name: item}
                // ^^^ I need "item" to call the correct .val() in order for it to delete the correct record from the SQL. Is this the corrct way to create the params for my DELETE method in the app.rb?
    }).success(deleteItem());
  }

  deleteRequest()
}

//------------------------------------------------

$(document).ready(function () {
  $('form').on('submit', submitClick);
  $('li').on('click', '#remove_item', deleteClick);
});
