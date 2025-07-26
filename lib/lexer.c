#include "ctypes.h"
#include "enum.h"
#include "package.h"
#include "structure.h"
#include "utils.h"
#include <ctype.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void processExpression(Token *t, char *input, int line, int row) {
  if (!t || !input)
    return;

  trimspace(input);
  int expr_count = 0;
  char exprs[256] = {0};

  for (int i = 0; input[i]; i++) {
    if (isoperator(input[i])) {
      exprs[expr_count++] = input[i];
      input[i] = '\n';
    }
  }

  const char *delim = "\n";
  char *token = strtok(input, delim);
  for (int i = 0; token && i < expr_count + 1; i++) {
    saveToken(t, token, i < expr_count ? exprs[i] : 0, line, row);
    token = strtok(NULL, delim);
  }
}

void handleVariable(Token *t, const char *input, int line, int row) {
  char *id = substring(input, 0, row);
  char *value = substring(input, row + 1, strlen(input));

  if (id && !issymdenied(id[0])) {
    for (int i = 0; id[i]; i++) {
      if (issymdenied(id[i])) {
        if (!isarray(id[i])) {
          printf("\033[1;30mUndefined\033[0m\n");
          break;
        } else {
          addToken(t, IDENTIFIER, id, line, row - 1);
          addDelim(t, input[row], line, row);
          break;
        }
      } else {
        addToken(t, IDENTIFIER, id, line, row - 1);
        addDelim(t, input[row], line, row);
        break;
      }
    }

    if (value) {
      if (strpbrk(value, "+-*/%")) {
        processExpression(t, value, line, row);
      } else {
        saveToken(t, value, 0, line, row + 1);
      }
    }
  } else {
    printf("\033[1;30mUndefined\033[0m\n");
  }

  free(id);
  free(value);
}

void function(Token *t, char *ptr, int line, int row) {
  int newline = 0, prev = 0, next = 0;
  char curr = ptr[row];

  if (curr == '(' && isstr(ptr[row - 1])) {
    prev = row - 1;
    next = row + 1;
    newline = row;

    while (prev > 0 && !isnewline(ptr[prev])) {
      prev--;
    }

    int x = row - prev;
    char keyword[x];
    strncpy(keyword, ptr + prev, x);
    keyword[x] = '\0';

    addToken(t, KEYWORD, keyword, line, row);
    addDelim(t, curr, line, row);

    while (!isnewline(ptr[newline])) {
      newline++;
    }

    if (isquote(ptr[next])) {
      addDelim(t, ptr[next], line, row);
    }

    int y = newline - next;
    char args[y];
    strncpy(args, ptr + next, y);
    args[y] = '\0';

    char fnclose = args[strlen(args) - 1];
    char qclose = args[strlen(args) - 2];

    args[strlen(args) - 1] = '\0';

    if (isquote(*args)) {
      trimquote(args);
      addToken(t, STRING, args, line, row);
    } else if (isstr(*args)) {
      addToken(t, IDENTIFIER, args, line, row);
    } else if (isint(*args)) {
      addToken(t, NUMBER, args, line, row);
    }

    if (isquote(qclose)) {
      addDelim(t, qclose, line, row);
    }

    if (fnclose == ')') {
      addDelim(t, fnclose, line, row);
    }
  }
}
