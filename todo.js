//how is the checkmark happening?
$(document).ready(function(e) {
	// creates add-to-do button
  $('#add-todo').button({
	  icons: {
		  primary: "ui-icon-circle-plus"
	  }
  }).click(function(){
	  $('#new-todo').dialog('open');
  });
  
  // $('#edit-todo').button({
	  // icons:{
		  // primary: "ui-icon-pencil"
	  // }
	  
  // }).click(function(){
	  // $('#edit').dialog('open');
  // });
    //****************************************************************************
	
	// creates a help dialog box that opens with the HELP button
	$('#helpDialog').dialog({
		autoOpen : false,
		buttons:{
			"Close": function(){
				$(this).dialog('close');
			}
		}
	});
	
	$('#help').button({
		icons:{
			primary: "ui-icon-help"
		}
	}).click(function(){
		$('#helpDialog').dialog('open');
	});
  //******************************************************************************
  //when add to-do button is clicked, open this dialog to enter new item
  $('#new-todo').dialog({
	  modal: true,
	  autoOpen : false,
	  buttons:{
		  "Add task" : function(){
			  var taskName = $('#task').val();                 //this creates a new variable and assigns teh value of the dialog box's text field. 
		      if (taskName ===''){
				  return false;
			  }
			  //new var and add sring values
			  var taskHTML = '<li><span class="done">%</span>'  //area to mark done
			  taskHTML += '<span class="delete">x</span>'       //area to delete
			  taskHTML += '<span class="task"></span>'   //area to display the task
			  taskHTML += '<span class="edit">r</span></li>';
			  var $newTask = $(taskHTML);
			  $newTask.find('.task').text(taskName);         //take the li element contained inside the $newTask var and look inside it for another element with the class name of task. then text() adds  the contents of the taskName var inside that span
		     
			  //first hide it 
		      $newTask.hide();
			  $('#todo-list').prepend($newTask);             //prepend to list
			  $newTask.show('clip',250).effect('highlight',1000);  //grow and highlight

			  $(this).dialog('close');
			  

		 },
		  "Cancel" : function(){
			  $(this).dialog('close');
		  }
	  },
	  close: function(){
		  $('#new-todo input').val('');
	  }
  }); // end dialog
  
  //********************************************************************************
  
  //event delegation routine
  //first select the unordered list. then use on() method accept event name 'click',
  // then the element that must be clicked on,
  //  then a function
  $('#todo-list').on('click', '.done',function(){
	  var $taskItem = $(this).parent('li'); //when click on done/ ((this)) parent('li') selects the nearest ancestor that is an <li>, the item you are after, then store it in var $taskItem
      
	  //slideUp to hide, then move to other list with callback function
	  $taskItem.slideUp(250,function(){
		var $this = $(this);  //do this so you are not running jquery every time, store it in the var once and use that
		$this.detach();
	    $('#completed-list').prepend($this); //add to other list with prepend
        $this.slideDown();
	 });
 }); // end on
 
 //********************************************************************************
 
 //clickng the edit button makes the .text class contenteditable and puts focus on it 
 $('#todo-list').on('click','.edit',function(){
	// $('#edit').dialog('open');
	// $('#edit').text('$taskEdit').text;
	 $(this).parent('li').find('.task').prop("contenteditable",true).focus();
	// $(this).parent('li .text').find('span').prop("contenteditable",true).focus();
	 return false;
 }); // end on
 
 //copy above for completed list
  $('#completed-list').on('click','.edit',function(){
	// $('#edit').dialog('open');
	// $('#edit').text('$taskEdit').text;
	// $(this).parent('li .text').find('span').prop("contenteditable",true).focus();
    $(this).parent('li').find('.task').prop("contenteditable",true).focus();

	 return false;
 }); // end on
 
 //*********************************************************************************
 
 $('.sortlist').sortable({ //make list sortable and connect with other sortable list.
	 connectWith:'.sortlist',
	 cursor: 'pointer',
	 placeholder : 'ui-state-highlight',
	 cancel : '.delete,.done,.edit'
 });  //end sortable
 
 $('.sortlist').on('click','.delete',function(){
	$(this).parent('li').effect('puff',function(){  //select the parent and remove with puff effect
		$(this).remove();
	});
 }); // end on(Delete)
 
}); // end ready