#ifndef PACKAGE_H
#define PACKAGE_H

#include "structure.h"

#include <stdbool.h>

int addDelim(Token *token, char c, int line, int row);
int addToken(Token *token, Types types, const char *value, int line, int row);
void addToHistory(ReplState *state, const char *input);
void clearAll(ReplState *state, Token *token);
void clearScreen();
void clearState(ReplState *state);
void clearToken(Token *token, int capacity);
NodeTree *createNode(int capacity);
Token *createToken(int capacity);
void compiler(SystemConfig cfg);
void console(ReplState *state, bool *actived, char buffer[], int line);
char *getConfig(const char *line, const char *key, char *value);
void handleVariable(Token *token, const char *input, int line, int row);
void interpreter(Node *node, Error *e);
void lexer(char *str, Token *t);
void parse(Token *token);
bool readfile(const char *path, char *buffer);
void saveToken(Token *token, const char *src, char expr, int line, int row);
void startRepl();
void tokenize(Token *token, const char *input, int line);

#endif
