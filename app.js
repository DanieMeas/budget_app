
//Budget Controller
var budgetController = (function() {

  var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

var allExpenses = [];
var allIncomes = [];
var totalExpenses = 0;

var data = {
  allItems: {
      exp: [],
      inc: []
  },
  totals: {
     exp: 0,
     inc: 0
  }
 
};

return {
    addItem: function(type, des, val) {
      var newItem, ID;


      //Create new Id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      //Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
          newItem  = new Expense(ID, des, val);
      } else if (type === 'inc') {
          newItem  = new Expense(ID, des, val);
      }
      //Push into our data structure
      data.allItems[type].push(newItem);
      
      //Return the new element 
      return newItem;

    },

    testing: function() {
      console.log(data)
    }
};


})();

//UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
    
  };

  
  return {
    getinput: function() {
      return {
          type: document.querySelector(DOMstrings.inputType).value, //wil be either inc or exp
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: document.querySelector(DOMstrings.inputValue).value

        };
      },
    
        addListItem: function(obj, type) {
          var html, newHtml, element;
          // Create HTML string with placegholder text

          if (type === 'inc') {
            element = DOMstrings.incomeContainer;
            html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
          } else if (type ==='exp') {
            element = DOMstrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
          }
          
          //replace the placeholder text with some actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

          // Insert the html to the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
      }, 
      clearFields: function() {
        var fields, fieldsArr;

        fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

        fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current, index, array) {
          current.value = "";
          
        });

        fieldsArr[0].focus();

      },

      getDomstrings: function() {
        return DOMstrings;
      }

    };

})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDomstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
   
    document.addEventListener('keypress', function(event) {
      if (event.keyCode ===13 || event.which ===13) {
        ctrlAddItem();
      }
  
    });
    
  }
  var updateBudget = function(){
        //1. CALCULATE THE BUDGET
       //2. return the budget
       //3. DISPLAY THE BUDGET ON UI

  };
  var ctrlAddItem = function() {
    var input, newItem;

     //1. GET THE FIELD INPUT DATA.
     input = UICtrl.getinput();

     if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
          //2. ADD THE ITEM TO THE BUDGET CONTROLLER
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. ADD NEW ITEM TO UI 
    UICtrl.addListItem(newItem, input.type);

    //4. CLEAR THE FIELDS
    UICtrl.clearFields();

    //5. Calculate and update budget
    updateBudget();   
  
  };

     }



     var input = UICtrl.getinput();
     var input, newItem;
      

 

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();

    }
  };


    
})(budgetController, UIController);

controller.init();
