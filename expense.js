 
 //Expense constructor
 function Expense(type, value, details){
	this.type = type;
	this.value = value;
	this.details = details;
 }
 
const expense = new Expense();

//UI Constructor
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
	//console.log(expense);
	let table =  document.querySelector('.table');
	table.appendChild(row);

}

//showAlert()
UI.prototype.showAlert = function(msg, className){

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
	
	//Timeout after 3 seconds
	setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000); 
}

//clearFields()
UI.prototype.clearFields = function(){
  document.getElementById('Exp_type').value = "";
  document.getElementById('Exp_value').value = "";
  document.getElementById('Exp_details').value = "";
  
  
}
 
UI.prototype.deleteExpense = function (target) {
if(target.className === 'delete'){
	//delete parent of the parent of the target element
		target.parentElement.parentElement.remove();
	}    
}

//clear Expenses
UI.prototype.clearExpenses = function(){
	 const expenses  = document.querySelectorAll('.delete');
	 expenses.forEach(function(expense){
		expense.parentElement.parentElement.remove();
	 });
}

 

 
UI.prototype.disableInp = function(){
	document.querySelector('#Clear_Expenses').disabled = true;
	document.querySelector('#Expense').disabled = true;
 
} 

UI.prototype.enableInp = function(){
	document.querySelector('#Clear_Expenses').disabled = false;
	document.querySelector('#Expense').disabled = false;
	 
} 
 
 
 
//Local Store Constructor
function LS (){};


//storeExpenses
LS.prototype.storeExpenses = function(expense){
	let Expenses;
	if(localStorage.getItem('Expenses') === null){
		Expenses = [];
	}	else {
		Expenses = JSON.parse(localStorage.getItem('Expenses'));
	}
		Expenses.push(expense);
		localStorage.setItem('Expenses', JSON.stringify(Expenses));
		
	let Total_Food;
	let Total_Goods;
	let Total_Services;
	let Grand_Total = 0;

	 

	Expenses.forEach(function(expense){
		Grand_Total += Number(expense.value);
	});
	document.getElementById('Total_Grand').value = Grand_Total;

	
	
	if(expense.type === 'Food'){
		Total_Food =[];
		
		let Expenses = JSON.parse(localStorage.getItem('Expenses'));
		
		Expenses.forEach(function(expense){
			if(expense.type === 'Food'){
				Total_Food.push(expense.value);
				localStorage.setItem('Total_Food', JSON.stringify(Total_Food));
				
				//console.log(Total_Expenses);
				let sumTFood = 0;
				for(var i =0; i<Total_Food.length; i++){
					sumTFood += Number(Total_Food[i]);
					 
				}
				document.getElementById('Total_F').value = sumTFood;
			}	 
		});
		 
		 
	}	else if(expense.type === 'Goods'){
		Total_Goods =[];
		
		let Expenses = JSON.parse(localStorage.getItem('Expenses'));
		
		Expenses.forEach(function(expense){
			if(expense.type === 'Goods'){
				Total_Goods.push(expense.value);
				localStorage.setItem('Total_Goods', JSON.stringify(Total_Goods));
				
				//console.log(Total_Expenses);
				let sumTGoods = 0;
				for(var i =0; i<Total_Goods.length; i++){
					sumTGoods += Number(Total_Goods[i]);
					 
				}
				document.getElementById('Total_G').value = sumTGoods;
			}	 
		});
		
	} else if (expense.type === 'Services'){
		Total_Services =[];
		let Expenses = JSON.parse(localStorage.getItem('Expenses'));
		
		Expenses.forEach(function(expense){
			if(expense.type === 'Services'){
				Total_Services.push(expense.value);
				localStorage.setItem('Total_Services', JSON.stringify(Total_Services));
				
				//console.log(Total_Expenses);
				let sumTServices = 0;
				for(var i =0; i<Total_Services.length; i++){
					sumTServices += Number(Total_Services[i]);
					 
				}
				document.getElementById('Total_S').value = sumTServices;
			}	
			
			
		});
	}
	 

}	


	
	 

//getExpenses
LS.prototype.getExpenses = function (){
	let Expenses;
	if(localStorage.getItem('Expenses') === null){
		Expenses = [];
	}	else {
		Expenses = JSON.parse(localStorage.getItem('Expenses'));
	}

	//forEach for the stored expenses + totals
	Expenses.forEach(function(expense){
		const ui = new UI;
		//add expense
		ui.addExpense(expense);
		if (expense.type ==='Food'){
			
			let Total_Food = JSON.parse(localStorage.getItem('Total_Food'));
			let sumTFood = 0;
			for(var i =0; i<Total_Food.length; i++){
					sumTFood += Number(Total_Food[i]);
					document.getElementById('Total_F').value = sumTFood;
				}
			
			
			
		} else if (expense.type ==='Goods'){
			let Total_Goods = JSON.parse(localStorage.getItem('Total_Goods'));
			let sumTGoods = 0;
				for(var i =0; i<Total_Goods.length; i++){
					sumTGoods += Number(Total_Goods[i]);
					document.getElementById('Total_G').value = sumTGoods;
				}
			
		}
		
		else if(expense.type ==='Services'){
			let Total_Services = JSON.parse(localStorage.getItem('Total_Services'));
			let sumTServices = 0;
				for(var i =0; i<Total_Services.length; i++){
					sumTServices += Number(Total_Services[i]);
					document.getElementById('Total_S').value = sumTServices;
				}
			
		} 
		
		let Grand_Total = 0;
		for(i=0; i<Expenses.length; i++){
			Grand_Total += Number(expense.value);
			document.getElementById('Total_Grand').value = Grand_Total;
		}
		
	});				  
}

//remove Expense
LS.prototype.removeExpense = function(expense, details, index){
	let Expenses;
	if(localStorage.getItem('Expenses') === null){
		Expenses = [];
	}	else {
		Expenses = JSON.parse(localStorage.getItem('Expenses'));
	}

if(expense.details === details){
	Expenses.splice(index, 1); //splice -remove only the current index element;
	localStorage.setItem('Expenses', JSON.stringify(Expenses));
	}
	
	
	
	//testing remove splice totals;
	let Total_Food =[];
	let Total_Goods =[];
	let Total_Services =[];
	let Grand_Total = 0;
	let sumTFood = 0;
	let sumTGoods = 0;
	let sumTServices = 0;
	
	Expenses.forEach(function(expense, index){
		Grand_Total += Number(expense.value);
		if(expense.details === details){
				Grand_Total.splice(index, 1);
				localStorage.setItem("Grand_Total", JSON.stringify(Grand_Total));
		}
		
		
		if(expense.type === 'Food'){
				Total_Food.push(expense.value);
				localStorage.setItem('Total_Food', JSON.stringify(Total_Food));
				
				//console.log(Total_Expenses);
				 
				for(var i =0; i<Total_Food.length; i++){
					sumTFood += Number(Total_Food[i]);
				 
						Total_Food.splice(index, 1);
						localStorage.setItem('Total_Food', JSON.stringify(Total_Food));
					 
					 
					
					
				}
				
			} else if(expense.type === 'Goods'){
				Total_Goods.push(expense.value); 
				localStorage.setItem('Total_Goods', JSON.stringify(Total_Goods));
				
				
				for(var i =0; i<Total_Goods.length; i++){
					sumTGoods += Number(Total_Goods[i]);
					 
						Total_Goods.splice(index, 1);
						localStorage.setItem('Total_Goods', JSON.stringify(Total_Goods)); 
					 
					
				}
				
			} else if(expense.type === 'Services'){
				Total_Services.push(expense.value);
				localStorage.setItem('Total_Services', JSON.stringify(Total_Services));
				
			
				for(var i =0; i<Total_Services.length; i++){
					sumTServices += Number(Total_Services[i]);
					 
						Total_Services.splice(index, 1);
						localStorage.setItem('Total_Services', JSON.stringify(Total_Services)); 
					 
					
				}
				
			}
	});
	
	location.reload();
	document.getElementById('Total_Grand').value = Grand_Total;
	document.getElementById('Total_F').value = sumTFood;
	document.getElementById('Total_G').value = sumTGoods;
	document.getElementById('Total_S').value = sumTServices;
	 
}

//remove Expenses
LS.prototype.removeExpenses = function(){
	localStorage.clear();
	}

//Event Listener for Add Expense;
document.getElementById('Expense').addEventListener('click', function(e){
	
	//define vars
	const type = document.getElementById('Exp_type').value,
	      value = parseInt(document.getElementById('Exp_value').value),
		  	details = document.getElementById('Exp_details').value
	
	//instantiate expense obj	
	const expense = new Expense(type, value, details);
	
	//instantiate ui obj
	const ui = new UI();
	
	//validate input
	if(type === '' || value ==='' || details === ''){
		ui.showAlert('Please fill in an Expense!', 'form-control bg-warning text-center text-dark font-weight-bold');  
	} else {
	
	
	ui.addExpense(expense);
	//console.log(expense);

	const ls = new LS();
	ls.storeExpenses(expense);

	ui.clearFields();
	
	ui.showAlert('Expense recorded!', 'form-control bg-success text-center text-light font-weight-bold');
	
	}
	
	 
	document.querySelector('#hide_Expense').style.display = "block";
	
	ui.disableInp();
	
	window.setTimeout(ui.enableInp, 3000); 
	
	e.preventDefault();
});


//event listener for Delete Expense (select parent for event delegation)
document.querySelector('.table').addEventListener('click', function(e){
	//instantiate UI
	const ui = new UI();

	//call deleteExpense();
	ui.deleteExpense(e.target);
	
	//instantiate LS
	const ls = new LS();
	ls.removeExpense(e.target);
	
	//show alert
	 if(e.target.className === 'delete'){ui.showAlert('Expense removed!', 'form-control bg-warning text-center text-dark font-weight-bold');}
	 else {
		 
	 }
	
	ui.disableInp();
	
	window.setTimeout(ui.enableInp, 3000); 
	
	e.preventDefault();
});

//DOM Load event listener
document.addEventListener('DOMContentLoaded', function(){
  const ls = new LS();
  ls.getExpenses();
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

//hide expenses and totals
document.querySelector('#Total').style.display = "none";
document.querySelector('#hide_Expense').style.display = "none";


//event listener for clear expenses
document.querySelector('#Clear_Expenses').addEventListener('click', function(){
	 const ui = new UI();
	 ui.clearExpenses(); 
	 
	 const ls = new LS();
	 ls.removeExpenses();

	 document.getElementById('Total_F').value = '';
	 document.getElementById('Total_G').value = '';
	 document.getElementById('Total_S').value = '';
	 document.getElementById('Total_Grand').value = '';
	 
	 ui.showAlert('Expenses Cleared!', 'form-control bg-warning text-center text-dark font-weight-bold'); 
	 
	 ui.disableInp();
	
	window.setTimeout(ui.enableInp, 3000); 
});

 