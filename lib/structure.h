#ifndef STRUCTURE_H
#define STRUCTURE_H

#include "enum.h"
#include "limit.h"
#include <stdbool.h>
#include <stddef.h>

typedef struct {
  char name[64];
  struct Node *value;
  int line;
  int row;
} Assignment;

typedef struct {
  char message[MAX_MESSAGE_LENGTH];
  char code[MAX_CODE_LENGTH];
  int line;
  int row;
  ErrorType type;
} ErrorInfo;

typedef struct {
  ErrorInfo info[256];
  int length;
} Error;

typedef struct {
  char name[64];
  char value[1024];
  int line;
  int row;
  int length;
} SymbolTable;

typedef struct {
  char value[1024];
  int line;
  int row;
  Types types;
} Args;

typedef struct {
  char raw[64];
  int line;
  int row;
  Types types;
} Delim;

typedef struct {
  Types types;
  char name[64];
  char value[256];
  int line;
  int row;
  int length;
} Variable;

typedef struct {
  char raw[64];
  int line;
  int row;
  Types types;
} Identifier;

typedef struct {
  char raw[MAX_VALUE];
  int line;
  int row;
  Types types;
} Value;

typedef struct {
  char func[MAX_VALUE];
  char args[8][256];
  int line;
  int row;
  Types types;
} Function;

typedef struct {
  union {
    struct {
      char name[64];
      char value[MAX_VALUE];
      int line;
      int row;
      // Identifier id[256];
      // Value value[256];
      // Variable var[256];
      Types types[MAX_DEPTH];
    } assign;

    NodeType type;

    struct {
      char func[64];
      char args[8][256];
      int argc;
      int line;
      int row;
      Types type;
    } call;
  };
} AstNode;

typedef struct Node {
  AstNode ast[MAX_DEPTH];
  union {
    struct {
      char name[64];
    } assign;
  };
  int length;
} Node;

typedef struct Children {
  char **value;
  int capacity;
  int length;
} Children;

typedef struct Parent {
  char **value;
  int capacity;
  int length;
} Parent;

typedef struct {
  char *name;
  struct NodeTree *value;
} NodeAssign;

typedef struct NodeTree {
  NodeType type;
  union {
    Children children;
  };
} NodeTree;

typedef struct {
  char entry[MAX_BUFFER_SIZE];
  char format[64];
  char output[MAX_BUFFER_SIZE];
  int length;
} SystemConfig;

typedef struct {
  char key[64];
  char value[MAX_VALUE];
  int line;
  int row;
} Object;

typedef struct {
  char raw[MAX_VALUE];
  char *value;
  int line;
  int row;
  Types type;
} DataToken;

typedef struct {
  DataToken data[MAX_DEPTH];
  DataToken *entries;
  Types types[MAX_DEPTH];
  Types type;
  size_t capacity;
  char **value;
  int length;
  int line;
  int row;
} Token;

typedef struct {
  char **history;
  int length;
  int line;
} ReplState;

#endif
