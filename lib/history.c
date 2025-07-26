#include "package.h"
#include "structure.h"
#include <stdlib.h>
#include <string.h>

void clearAll(ReplState *state, Token *token) {
  if (!state || !token)
    return;

  clearState(state);
  clearToken(token, 10);
  free(state);
  free(token->entries);
  free(token);
}

void clearState(ReplState *state) {
  if (!state)
    return;

  for (int i = 0; i < state->length; i++) {
    free(state->history[i]);
  }

  free(state->history);
  state->history = NULL;
  state->line = 1;
  state->length = 0;
}

void addToHistory(ReplState *state, const char *input) {
  state->history =
      realloc(state->history, (state->length + 1) * sizeof(char *));
  state->history[state->length] = strdup(input);
  state->length++;
}
