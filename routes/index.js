
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Student Loan Default Rates' })
};

