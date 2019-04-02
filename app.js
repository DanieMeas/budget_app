
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
    inputBtn: '.add__btn'

  };

  
  return {
    getinput: function() {
      return {
          type: document.querySelector(DOMstrings.inputType).value, //wil be either inc or exp
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: document.querySelector(DOMstrings.inputValue).value

        };
    
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
  var ctrlAddItem = function() {

     //1. GET THE FIELD INPUT DATA.
     var input = UICtrl.getinput();
     var input, newItem;
      

    //2. ADD THE ITEM TO THE BUDGET CONTROLLER
    var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. ADD NEW ITEM TO UI 
    //4. CALCULATE THE BUDGET
    //5. DISPLAY THE BUDGET ON UI


  };

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();

    }
  };


    
})(budgetController, UIController);

controller.init();
