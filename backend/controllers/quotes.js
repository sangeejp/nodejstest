const db = require("../db");

exports.createQuote=(req, res, next) => {
  var sql="insert into test_table set quoteDate='" + req.body.quoteDate + "' ";
  sql+=" ,quoteNumber='"+ req.body.quoteNumber +"'";
  sql+=" ,customerName='"+ req.body.customerName +"'";
  sql+=" ,salesPerson='"+ req.body.salesPerson +"'";
  sql+=" ,quoteStatus='"+ req.body.quoteStatus +"'";
  sql+=" ,quoteInfo='"+ req.body.quoteInfo +"'";
  sql+=" ,quoteSummary='"+ req.body.quoteSummary +"'";
  db.query(sql,  function(err, result) {
    if (err) console.log(err);
    else{
      res.status(200).json({
        message: "Thanks for creating the Quotes and your Quote id is :  "+result.insertId,
        status:1
        
      });
    }
  });
  }
 
exports.updateQuote=(req, res, next) => {
  var sql="update test_table set quoteDate='" + req.body.quoteDate + "' ";
  sql+=" ,quoteNumber='"+ req.body.quoteNumber +"'";
  sql+=" ,customerName='"+ req.body.customerName +"'";
  sql+=" ,salesPerson='"+ req.body.salesPerson +"'";
  sql+=" ,quoteStatus='"+ req.body.quoteStatus +"'";
  sql+=" ,quoteInfo='"+ req.body.quoteInfo +"'";
  sql+=" ,quoteSummary='"+ req.body.quoteSummary +"'";
  sql+=" where quoteId='"+ req.body.quoteId +"'";
  db.query(sql,  function(err, result) {
    if (err) console.log(err);
    else{
      res.status(200).json({
        message: "Thanks for Updating  the Quote id is :  "+req.body.quoteId,
        status:1
        
      });
    }
  });
}

exports.getQuoteById=(req, res, next) => {
  var sql="select * from test_table  ";
  sql+=" where quoteId='"+ req.query.quoteId +"'";
  db.query(sql,  function(err, result) {
    if (err) console.log(err);
    else{
      if(result.length==0){
        res.status(201).json({
          message: "No Quotes Found",
          status:2,
          result:new Array(),
          maxQuotes:0
        });
      }
      else{
        res.status(200).json({
          message: "Quotes fetched Successfully",
          status:1,
          result:result,
          maxQuotes:result.length
        });
      }
     
    }
  });
}

