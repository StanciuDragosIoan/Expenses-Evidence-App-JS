 //Expense constructor###
 function Expense(type, value, details){
	this.type = type;
	this.value = value;
	this.details = details;
 }
 
//UI Constructor###
 function UI(){};

//addExpense()
 UI.prototype.addExpense = function(expense){
	 
	let row = document.createElement('tr');
	row.innerHTML = `
	<td>${expense.type}</td>
	<td>${expense.value}</td>
	<td>${expense.details}</td>
	<td><a href="#" class='delete'>X</a></td>
 `;
	 
	let table =  document.querySelector('.table');
	table.appendChild(row);
	
	document.getElementById('Exp_type').value = "";
	document.getElementById('Exp_value').value = "";
	document.getElementById('Exp_details').value = "";
}

//showAlert()
UI.prototype.showAlert = function(msg, className){
	let alertDiv = document.querySelector('.alert');
	//create div
	const div = document.createElement('div');
	//add className
	div.className = `alert ${className}`;//"col-md-12 mx-auto-bg-warning";
	//add text
	div.appendChild(document.createTextNode(msg));
	//get parent
	const parent = document.querySelector('#ex');
	//get the element before which we'll insert div
	const befoRe = document.querySelector('#before');
	//insert div before befoRe in parent
	parent.insertBefore(div, befoRe);		 
}


 
UI.prototype.clearAlert = function(){
	let alertDiv = document.querySelector('.alert');
	setTimeout(function(){
		alertDiv.remove();
	}, 2000);
}

UI.prototype.removeExpense = function(target){
  if(target.className === 'delete'){
		//delete parent of the parent of the target element
			target.parentElement.parentElement.remove();
		}
}

UI.prototype.clearExpenses = function(){
	const expenses  = document.querySelectorAll('.delete');
	expenses.forEach(function(expense){
	expense.parentElement.parentElement.remove();
	});
	document.getElementById('Total_F').value = 0;
	document.getElementById('Total_G').value = 0;
	document.getElementById('Total_S').value = 0;
	document.getElementById('Total_Grand').value = 0;
}
//Local Store Constructor###
function LS (){};

//Store Expense
LS.prototype.storeExpense = function(expense){
	let Expenses;
	if(localStorage.getItem('Expenses') === null){
		Expenses = [];
	}	else {
		Expenses = JSON.parse(localStorage.getItem('Expenses'));
	}	
		Expenses.push(expense);
		localStorage.setItem('Expenses', JSON.stringify(Expenses));
		
	//Total Expenses Array
	let Total_Expenses;
	if(localStorage.getItem('Total_Expenses') === null){
		Total_Expenses = [];
	}	else {
		Total_Expenses = JSON.parse(localStorage.getItem('Total_Expenses'));
	}	
	Total_Expenses.push(expense.value);
	localStorage.setItem('Total_Expenses', JSON.stringify(Total_Expenses));
	
	let sumTotal_Expenses = 0;
				for(var i =0; i<Total_Expenses.length; i++){
					sumTotal_Expenses += Number(Total_Expenses[i]);	 
				}
				document.getElementById('Total_Grand').value = sumTotal_Expenses;
	 
	//total Food  
	let Total_Food;
	if(localStorage.getItem('Total_Food') === null){
		Total_Food = [];
	} else {
		Total_Food = JSON.parse(localStorage.getItem('Total_Food'));
	}
	if(expense.type === 'Food'){
		Total_Food.push(expense.value);
		localStorage.setItem('Total_Food', JSON.stringify(Total_Food));
	}
	let sumTotal_Food = 0;
	for(var i =0; i<Total_Food.length; i++){
		sumTotal_Food += Number(Total_Food[i]);	 
	}
	document.getElementById('Total_F').value = sumTotal_Food;

	//total Goods  
	let Total_Goods;
	if(localStorage.getItem('Total_Goods') === null){
		Total_Goods = [];
	} else {
		Total_Goods = JSON.parse(localStorage.getItem('Total_Goods'));
	}
	if(expense.type === 'Goods'){
		Total_Goods.push(expense.value);
		localStorage.setItem('Total_Goods', JSON.stringify(Total_Goods));
	}
	let sumTotal_Goods = 0;
	for(var i =0; i<Total_Goods.length; i++){
		sumTotal_Goods += Number(Total_Goods[i]);	 
	}
	document.getElementById('Total_G').value = sumTotal_Goods;
	
	//total Services  
	let Total_Services;
	if(localStorage.getItem('Total_Services') === null){
		Total_Services = [];
	} else {
		Total_Services = JSON.parse(localStorage.getItem('Total_Services'));
	}
	if(expense.type === 'Services'){
		Total_Services.push(expense.value);
		localStorage.setItem('Total_Services', JSON.stringify(Total_Services));
	}
	let sumTotal_Services = 0;
	for(var i =0; i<Total_Services.length; i++){
		sumTotal_Services += Number(Total_Services[i]);	 
	}
	document.getElementById('Total_S').value = sumTotal_Services;
}

//delete Expense
LS.prototype.deleteExpense = function (target, index){
	let Expenses = JSON.parse(localStorage.getItem('Expenses'));
	let Total_Expenses = JSON.parse(localStorage.getItem('Total_Expenses'));
	let Total_Food = JSON.parse(localStorage.getItem('Total_Food'));
	let Total_Goods = JSON.parse(localStorage.getItem('Total_Goods'));
	let Total_Services = JSON.parse(localStorage.getItem('Total_Services'));
	if(target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerText  === 'Food'){
		Expenses.splice(index, 1); 
		localStorage.setItem('Expenses', JSON.stringify(Expenses));
		Total_Expenses.splice(index, 1);
		localStorage.setItem('Total_Expenses', JSON.stringify(Total_Expenses));
		Total_Food.splice(index, 1);
		localStorage.setItem('Total_Food', JSON.stringify(Total_Food));
	} else if (target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerText  === 'Goods'){
		Expenses.splice(index, 1); 
		localStorage.setItem('Expenses', JSON.stringify(Expenses));
		Total_Expenses.splice(index, 1);
		localStorage.setItem('Total_Expenses', JSON.stringify(Total_Expenses));
		Total_Goods.splice(index, 1);
		localStorage.setItem('Total_Goods', JSON.stringify(Total_Goods));
	} else if (target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerText  === 'Services'){
		Expenses.splice(index, 1); 
		localStorage.setItem('Expenses', JSON.stringify(Expenses));
		Total_Expenses.splice(index, 1);
		localStorage.setItem('Total_Expenses', JSON.stringify(Total_Expenses));
		Total_Services.splice(index, 1);
		localStorage.setItem('Total_Services', JSON.stringify(Total_Services));
	} 
 	//Total Expenses
	 let sumTotal_Expenses = 0;
	 for(var i =0; i<Total_Expenses.length; i++){
		 sumTotal_Expenses += Number(Total_Expenses[i]);	 
	 }
	 document.getElementById('Total_Grand').value = sumTotal_Expenses;
	 //Total Food
	 let sumTotal_Food = 0;
	 for(var i =0; i<Total_Food.length; i++){
		 sumTotal_Food += Number(Total_Food[i]);	 
	 }
	 document.getElementById('Total_F').value = sumTotal_Food;
	 //Total Goods
	 let sumTotal_Goods = 0;
		for(var i =0; i<Total_Goods.length; i++){
			sumTotal_Goods += Number(Total_Goods[i]);	 
		}
		document.getElementById('Total_G').value = sumTotal_Goods;
		//Total Services
		let sumTotal_Services = 0;
		for(var i =0; i<Total_Services.length; i++){
			sumTotal_Services += Number(Total_Services[i]);	 
		}
		document.getElementById('Total_S').value = sumTotal_Services;	 
}


//Get Expenses
LS.prototype.getExpenses = function(){
	const Expenses = JSON.parse(localStorage.getItem('Expenses'));
	if(Expenses !== null){
		const ui = new UI();
	Expenses.forEach(function(expense){
		let row = document.createElement('tr');
		row.innerHTML = `
		<td>${expense.type}</td>
		<td>${expense.value}</td>
		<td>${expense.details}</td>
		<td><a href="#" class='delete'>X</a></td>
		`;
		let table =  document.querySelector('.table');
		table.appendChild(row);	
	});
	
		//Total Expenses
		let Total_Expenses = JSON.parse(localStorage.getItem('Total_Expenses'));
		let sumTotal_Expenses = 0;
					for(var i =0; i<Total_Expenses.length; i++){
						sumTotal_Expenses += Number(Total_Expenses[i]);	 
					}
					document.getElementById('Total_Grand').value = sumTotal_Expenses;

		//Total Food
		let Total_Food = JSON.parse(localStorage.getItem('Total_Food'));
		let sumTotal_Food = 0;
		for(var i =0; i<Total_Food.length; i++){
			sumTotal_Food += Number(Total_Food[i]);	 
		}
		document.getElementById('Total_F').value = sumTotal_Food;

		//Total Goods
		let Total_Goods = JSON.parse(localStorage.getItem('Total_Goods'));
		let sumTotal_Goods = 0;
		for(var i =0; i<Total_Goods.length; i++){
			sumTotal_Goods += Number(Total_Goods[i]);	 
		}
		document.getElementById('Total_G').value = sumTotal_Goods;

		//Total Services
		let Total_Services = JSON.parse(localStorage.getItem('Total_Services'));
		let sumTotal_Services = 0;
		for(var i =0; i<Total_Services.length; i++){
			sumTotal_Services += Number(Total_Services[i]);	 
		}
		document.getElementById('Total_S').value = sumTotal_Services;
	}	
}

LS.prototype.removeExpenses = function(){
	let Expenses = JSON.parse(localStorage.getItem('Expenses'));
	let Total_Expenses = JSON.parse(localStorage.getItem('Total_Expenses'));
	let Total_Food = JSON.parse(localStorage.getItem('Total_Food'));
	let Total_Goods = JSON.parse(localStorage.getItem('Total_Goods'));
	let Total_Services = JSON.parse(localStorage.getItem('Total_Services'));
	localStorage.removeItem('Expenses');
	localStorage.removeItem('Total_Expenses');
	localStorage.removeItem('Total_Food');
	localStorage.removeItem('Total_Goods');
	localStorage.removeItem('Total_Services');
}
	


//DOM Load event listener
document.addEventListener('DOMContentLoaded', function(){
  const ls = new LS();
  ls.getExpenses();
});

//Event Listener for Add Expense;
document.getElementById('Expense').addEventListener('click', function(e){
	
	//vars for expense
	const type = document.getElementById('Exp_type').value,
	      value = parseInt(document.getElementById('Exp_value').value),
		  details = document.getElementById('Exp_details').value
		  
	const ui = new UI();
	
	const expense = new Expense(type, value, details);
	
	//validate input
	if(type === '' || value ==='' || details === ''){
		const alertDiv = document.querySelector('.alert');
		if(alertDiv){
			alertDiv.remove();
		}
		
		ui.showAlert('Please fill in an Expense!', 'form-control bg-warning text-center text-dark font-weight-bold'); 
		ui.clearAlert();
	} else {
	const alertDiv = document.querySelector('.alert');
		if(alertDiv){
			alertDiv.remove();
		}
	ui.addExpense(expense);
	ui.showAlert('Expense recorded!', 'form-control bg-success text-center text-light font-weight-bold');
	ui.clearAlert();
	const ls = new LS();
	ls.storeExpense(expense);
	}

	e.preventDefault();
});

//Event Listener for Remove Expense
document.querySelector('.table').addEventListener('click', function(e){
	 if(e.target.className === "delete"){
		const ui = new UI();
		ui.removeExpense(e.target);

		const ls = new LS();
		ls.deleteExpense(e.target);
	 }
	
	e.preventDefault();
});

//Event Listener for hide expenses
document.querySelector('#Hide_Expenses').addEventListener('click', function(){
	let x = document.querySelector('#hide_Expense');
	 if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
});
	
//Event Listener for hide Totals
document.querySelector('#Hide_T').addEventListener('click', function(){
	let x = document.querySelector('#Total');
	 if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
});

//event listener for clear expenses
document.querySelector('#Clear_Expenses').addEventListener('click', function(){
	const ui = new UI();
	ui.clearExpenses(); 
	const ls = new LS();
	ls.removeExpenses();
});

document.querySelector('#Total').style.display = 'none';
document.querySelector('#hide_Expense').style.display = 'none';