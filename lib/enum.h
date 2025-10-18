#ifndef ENUM_H
#define ENUM_H

typedef enum {
  AST_ASSIGN,
  AST_BINARY,
  AST_BRACKET,
  AST_BOOLEAN,
  AST_CALL,
  AST_DELIM,
  AST_FLOAT,
  AST_NUMBER,
  AST_STRING
} AstType;

typedef enum { ERR, WARN } ErrorType;

typedef enum {
  NODE_ASSIGN,
  NODE_BINARY,
  NODE_BOOLEAN,
  NODE_CALL,
  NODE_FLOAT,
  NODE_NUMBER,
  NODE_STRING
} NodeType;

typedef enum {
  ASSIGN,
  BOOLEAN,
  DELIM,
  DOUBLE,
  ENDOF,
  EXPRESSION,
  FLOAT,
  KEYWORD,
  IDENTIFIER,
  NUMBER,
  STRING,
  UNKNOWN
} Types;

#endif
