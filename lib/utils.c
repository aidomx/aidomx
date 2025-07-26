#include "ctypes.h"
#include "enum.h"
#include "limit.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void clearScreen() {
#ifdef _WIN32
  system("cls")
#else
  system("clear");
#endif
}

char getBracketType(const char *ptr) {
  if (!ptr)
    return 0;

  for (; *ptr; ptr++) {
    if (isfn(*ptr))
      return *ptr;
  }

  return 0;
}

Types gettype(const char *ptr) {
  if (strcmp(ptr, "true") == 0 || strcmp(ptr, "false") == 0)
    return BOOLEAN;

  if (isquote(*ptr)) {
    char quote = *ptr;
    const char *end = ptr + 1;
    while (*end && *end != quote)
      end++;
    return (*end == quote) ? STRING : UNKNOWN;
  }

  else if (isint(*ptr)) {
    const char *p = ptr;
    bool has_digit = false, has_dot = false;

    while (isint(*p)) {
      has_digit = true;
      p++;
    }

    if (isdot(*p)) {
      has_dot = true;
      p++;

      bool has_frac = false;
      while (isint(*p)) {
        has_frac = true;
        p++;
      }

      if (!has_frac)
        return UNKNOWN;
    }

    return (has_digit && !has_dot) ? NUMBER : FLOAT;
  }

  else if (isstr(*ptr)) {
    const char *p = ptr + 1;
    while (*p && (isstr(*p) || isint(*p)))
      p++;
    return (*p == '\0') ? IDENTIFIER : UNKNOWN;
  }

  return UNKNOWN;
}

int istype(const char *ptr, int *output) {
  int i = 0, left = 0, right = 0;

  while (ptr[i] != '\0') {
    if (i == 0) {
      left = isquote(ptr[i]);
    }
    right = isquote(ptr[i]);

    int compare = left == 0 && right == 0;

    // string literal
    // example: "Hello world"
    if (left > 0 && right > 0) {
      return STRING;
    }

    // integer
    // example: 10
    else if (compare && isint(ptr[i])) {
      return NUMBER;
    }

    // identifier
    // example: name
    else if (compare && isstr(ptr[i])) {
      return IDENTIFIER;
    }

    i++;
  }

  return 0;
}

void replace(const char *str, const char *key, const char *value,
             char output[]) {
  if (!str || !key || !value || !output)
    return;

  char *p = strstr(str, key);
  if (!p) {
    strncpy(output, str, MAX_MESSAGE_LENGTH - 1);
    output[MAX_MESSAGE_LENGTH - 1] = '\0';
    return;
  }

  int prefix_len = p - str;
  int remaining_len = MAX_MESSAGE_LENGTH - 1;

  snprintf(output, remaining_len, "%.*s%s%s", prefix_len, str, value,
           p + strlen(key));
}

char *serialize(const char *str, char buffer[]) {
  int newline = 0, out = 0;

  while (*str != '\0') {
    if (isnewline(*str)) {
      if (!newline) {
        buffer[out++] = '\x1F';
        newline = 1;
      }
    } else {
      buffer[out++] = *str;
      newline = 0;
    }
    str++;
  }
  buffer[out] = '\0';

  return buffer;
}

char *substring(const char *input, int start, int end) {
  if (!input || start < 0 || end <= start)
    return NULL;

  int len = end - start;
  char *result = malloc(len + 1);
  if (!result)
    return NULL;

  strncpy(result, input + start, len);
  result[len] = '\0';

  return result;
}

void trimbracket(char *value, char open, char close) {
  if (!value)
    return;

  if (open == '(') {
    size_t n = strlen(value);
    memmove(value, value + 1, n);
    value[n] = '\0';
  } else if (close == ')') {
    size_t n = strlen(value) - 1;
    memmove(value, value, n);
    value[n] = '\0';
  }
}

void trimspace(char *value) {
  while (*value != '\0') {
    if (isspace(*value)) {
      memmove(&(*value), &(*value) + 1, strlen(value));
      value++;
      continue;
    }
    value++;
  }
}

void trimquote(char *value) {
  int n = strlen(value) - 1;

  if (isquote(value[0]) && isquote(value[n])) {
    memmove(value, value + 1, n);
    value[n - 1] = '\0';
  } else {
    n = strlen(value) - 2;

    if (isquote(value[0]) && isquote(value[n])) {
      memmove(value, value + 1, n);
      value[n - 1] = '\0';
    }
  }
}
