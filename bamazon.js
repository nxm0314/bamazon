var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Aidenmocta2017",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Find products by item name",
        "Find data within a specific price range",
        "Search for a specfic product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find products by item name":
        productsSearch();
        break;


      case "Find data within a specific price range":
        rangeSearch();
        break;

      case "Search for a specific product":
        productsSearch();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function productsSearch() {
  inquirer
    .prompt({
      name: "item_name",
      type: "input",
      message: "What products would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, item_id, product_name, department_name, price?";
      connection.query(query, { products: answer.item }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Product: " + res[i].products + " || Price: " + res[i].price);
        }
        runSearch();
      });
    });
}


function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,item_id,product_name,department_name,price FROM products WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || : item_id" +
              res[i].product_name +
              " || Products: " +
              res[i].department_name +
              " || department: " +
              res[i].price +
              "|| price: " +
              res[i].quatity +
              "|| quantity: " 
          );
        }
        runSearch();
      });
    });
}

function productsSearch() {
  inquirer
    .prompt({
      name: "product",
      type: "input",
      message: "What products would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.products);
      connection.query("SELECT * FROM products WHERE ?", { item: answer.item }, function(err, res) {
        if (err) throw err;
        console.log(
            "Position: " +
            res[i].position +
            " || : item_id" +
            res[i].product_name +
            " || Products: " +
            res[i].department_name +
            " || department: " +
            res[i].price +
            "|| price: " +
            res[i].quatity +
            "|| quantity: " 
        );
        runSearch();
      });
    });
}