function parse(tokens) {
  // Clears all these lists
  objectList = [];
  shapeList = [];
  var statements = [];

  var currentToken = 0;

  // Splits tokens by statements and pushes into an arraylist
  while(!checkToken(EOF, currentToken, tokens)) {
    var statement = [];

    var i = 0;
    while(!checkToken(SEMICOLON, currentToken, tokens)) {
      statement[i] = tokens[currentToken];
      currentToken++;
      i++;
    }
    currentToken++;
    statements.push(statementss(statement));
  }

  // Evaluates all the statements
  for (i = 0; i < statements.length; i++) {
    statements[i].evaluate();
  }
}

function statementss(statement) {
// ======================= OBJECT CREATION STATEMENT ======================= //
  if (has(statement, VAR) && has(statement, ARROW) && !has(statement, RECTANGLE) && !has(statement, CIRCLE) && !has(statement, LINE) && !has(statement, TEXT)) {
    console.log("create");
    var id = statement[1].getLexeme();
    var value = expression(statement.slice(3, statement.length));
    // var value = statement[3].getLiteral();
    var type = statement[3].getTokenType();

    return new statementObjectCreation(id, value, type);
  }
// ======================= OBJECT SET STATEMENT ======================= //
  else if (has(statement, IDENTIFIER) && has(statement, ARROW) && !has(statement, RECTANGLE) && !has(statement, CIRCLE)&& !has(statement, LINE) && !has(statement, TEXT)) {
    var id = statement[0].getLexeme();
    var value = statement[2].getLexeme();
    var type = statement[2].getTokenType();

    return new statementSetObjectValue(id, value, type);
  }
// ======================= PRINT STATEMENT ======================= //
  else if (has(statement, PRINT) && (has(statement, IDENTIFIER) || has(statement, STRING) || has(statement, NUMBER))) {
    var value = statement[1].getLexeme();
    var type = statement[1].getTokenType();

    return new statementPrint(value, type);
  }
// ======================= RECTANGLE STATEMENT ======================= //
  else if (has(statement, VAR) && has(statement, IDENTIFIER) && has(statement, RECTANGLE)) {
    var id = statement[1].getLexeme();
    var type = statement[3].getTokenType();
    var x = statement[5].getLexeme();
    var y = statement[7].getLexeme();
    var width = statement[9].getLexeme();
    var height = statement[11].getLexeme();
    var red = statement[13].getLexeme();
    var green = statement[15].getLexeme();
    var blue = statement[17].getLexeme();

    return new statementRectangle(id, type, x, y, width, height, red, green, blue);
  }
// ======================= CIRCLE STATEMENT ======================= //
else if (has(statement, VAR) && has(statement, IDENTIFIER) && has(statement, CIRCLE)) {
  var id = statement[1].getLexeme();
  var type = statement[3].getTokenType();
  var cx = statement[5].getLexeme();
  var cy = statement[7].getLexeme();
  var radius = statement[9].getLexeme();
  var red = statement[11].getLexeme();
  var green = statement[13].getLexeme();
  var blue = statement[15].getLexeme();

  return new statementCircle(id, type, cx, cy, radius, red, green, blue);
}
// ======================= LINE STATEMENT ======================= //
else if (has(statement, VAR) && has(statement, IDENTIFIER) && has(statement, LINE)) {
  var id = statement[1].getLexeme();
  var type = statement[3].getTokenType();
  var x1 = statement[5].getLexeme();
  var y1 = statement[7].getLexeme();
  var x2 = statement[9].getLexeme();
  var y2 = statement[11].getLexeme();
  var red = statement[13].getLexeme();
  var green = statement[15].getLexeme();
  var blue = statement[17].getLexeme();
  var strokeWidth = statement[19].getLexeme();

  return new statementLine(id, type, x1, y1, x2, y2, red, green, blue, strokeWidth);
}
// ======================= TEXT STATEMENT ======================= //
else if (has(statement, VAR) && has(statement, IDENTIFIER) && has(statement, TEXT)) {
  var id = statement[1].getLexeme();
  var type = statement[3].getTokenType();
  var x = statement[5].getLexeme();
  var y = statement[7].getLexeme();
  var text = statement[9].getLiteral();
  var red = statement[11].getLexeme();
  var green = statement[13].getLexeme();
  var blue = statement[15].getLexeme();

  return new statementText(id, type, x, y, text, red, green, blue);
}
// ======================= ELLIPSE STATEMENT ======================= //

// ======================= POLYGON STATEMENT ======================= //

// ======================= POLYLINE STATEMENT ======================= //

// ======================= ERROR HANDLING FOR UNKNOWN STATEMENTS ======================= //
  else {
    errorList.push(new Error(statement[0].getLine(), "This statement is not recognized!"));
  }
}

function expression(tokens) {
  var value = 0;
  if (tokens.length != 1) {
    var left = tokens[0].getLiteral();
    var operator = tokens[1].getTokenType();
    var right = tokens[2].getLiteral();

    value = findExpressionWithOperator(left, operator, right);

    tokens = tokens.slice(3, tokens.length);

    while(has(tokens, PLUS) || has(tokens, MINUS) || has(tokens, STAR) || has(tokens, SLASH)) {
      var left = value;
      var operator = tokens[0].getTokenType();
      var right = tokens[1].getLiteral();

      value = findExpressionWithOperator(left, operator, right);

      tokens = tokens.slice(2, tokens.length);
    }

    return value;
  } else {
    return tokens[0].getLexeme();
  }
}
