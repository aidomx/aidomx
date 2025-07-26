#include "limit.h"
#include "package.h"
#include "structure.h"
#include "utils.h"
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

ReplState *createState() {
  ReplState *state = malloc(sizeof(ReplState));
  state->history = NULL;
  state->length = 0;
  state->line = 1;
  return state;
}

void processState(ReplState *state, Token *token, const char *input) {
  if (!state || !token || !input)
    return;

  if (strcmp(input, ".clear") == 0) {
    clearScreen();
    clearState(state);
    clearToken(token, 10);
  } else {
    addToHistory(state, input);
    state->line++;
  }
}

void editorRepl(ReplState *state, Token *token, bool *actived, char buffer[],
                int line) {
  if (!state || !token) {
    *actived = false;
    return;
  }

  if (fgets(buffer, MAX_BUFFER_SIZE, stdin) == NULL) {
    *actived = false;
    return;
  }

  buffer[strcspn(buffer, "\n")] = '\0';

  if (strcmp(buffer, ".exit") == 0) {
    *actived = false;
  } else {
    processState(state, token, buffer);
    tokenize(token, buffer, state->line);
    parse(token);
  }
}

void startRepl() {
  ReplState *state = createState();
  Token *token = createToken(10);
  // int line_number = 1;
  bool actived = true;
  char buffer[MAX_BUFFER_SIZE];

  printf("Welcome to Aidomx v%.1f\n", VERSION);

  while (actived) {
    printf("%d ", state->line);
    editorRepl(state, token, &actived, buffer, state->line);
  }

  clearAll(state, token);
}
