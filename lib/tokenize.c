#include "ctypes.h"
#include "enum.h"
#include "package.h"
#include "structure.h"
#include "utils.h"
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

Token *createToken(int capacity) {
  Token *token = malloc(sizeof(Token));

  if (token == NULL) {
    perror("Memory allocation failed.");
    exit(EXIT_FAILURE);
  }

  token->entries = calloc(capacity, sizeof(DataToken));
  token->capacity = capacity;
  token->length = 0;

  return token;
}

int addToken(Token *t, Types types, const char *value, int line, int row) {
  if (!t || t->length >= MAX_TOKENS || !value)
    return 0;

  if (t->length >= t->capacity) {
    size_t newCapacity = t->capacity * 2;
    DataToken *data = realloc(t->entries, sizeof(DataToken) * newCapacity);

    if (!data) {
      perror("Relocation of data is failed.");
      return 1;
    }

    memset(&data[t->length], 0,
           (newCapacity - t->capacity) * sizeof(DataToken));
    t->entries = data;
    t->capacity = newCapacity;
  }

  DataToken *data = &t->entries[t->length];
  data->value = strdup(value);
  data->line = line >= 1 ? line - 1 : line;
  data->row = row;
  data->type = types;

  return t->length++;
}

int addDelim(Token *t, char c, int line, int row) {
  const char del[2] = {c, '\0'};
  if (isassign(c)) {
    return addToken(t, ASSIGN, del, line, row);
  }

  return addToken(t, DELIM, del, line, row);
}

void clearToken(Token *token, int capacity) {
  if (!token || token->length < 0)
    return;

  for (int i = 0; i < token->length; i++) {
    free(token->entries[i].value);
    token->entries[i].line = 0;
    token->entries[i].row = 0;
    token->entries[i].type = 0;
  }

  token->capacity = capacity;
  token->length = 0;
}

void addStringToken(Token *t, const char *value, int line, int row) {
  char temp[strlen(value) + 1];
  strcpy(temp, value);
  char qopen = temp[0];
  char qclose = temp[strlen(temp) - 1];
  addDelim(t, qopen, line, row);
  trimquote(temp);
  addToken(t, STRING, temp, line, row);
  addDelim(t, qclose, line, row);
}

void saveToken(Token *t, const char *token, char expr, int line, int row) {
  if (!t || !token)
    return;

  char bracket = getBracketType(token);
  char *ptr = strdup(token);

  if (!ptr)
    return;

  if (bracket == '(') {
    addDelim(t, bracket, line, row);
    trimbracket(ptr, bracket, 0);
  } else if (bracket == ')') {
    trimbracket(ptr, 0, bracket);
  }

  trimspace(ptr);
  Types type = gettype(ptr);

  if (type == STRING) {
    addStringToken(t, ptr, line, row);
  } else {
    addToken(t, type, ptr, line, row);
  }

  if (expr > 0) {
    char op[2] = {expr, '\0'};
    addToken(t, EXPRESSION, op, line, row);
  }

  if (bracket == ')') {
    addDelim(t, bracket, line, row);
  }

  free(ptr);
}

void tokenize(Token *token, const char *input, int line) {
  if (!token || !input)
    return;

  for (int i = 0; input[i]; i++) {
    if (input[i] == '\0') {
      addToken(token, ENDOF, NULL, line, i);
    }

    if (isassign(input[i])) {
      handleVariable(token, input, line, i);
      break;
    }
  }
}
