#include "ctypes.h"
#include "enum.h"
#include "limit.h"
#include "package.h"
#include "structure.h"
#include "utils.h"
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*void addChildNodes(NodeTree *node, DataToken *data) {*/
/*if (node->length >= node->capacity) {*/
/*int newCapacity = node->capacity * 2;*/
/*childNodes *children =*/
/*realloc(node->childNodes, sizeof(childNodes) * newCapacity);*/

/*if (!children) {*/
/*perror("Reallocaton is failed.");*/
/*return;*/
/*}*/

/*memset(&children[node->length], 0,*/
/*(newCapacity - node->capacity) * sizeof(childNodes));*/
/*node->childNodes = children;*/
/*node->capacity = newCapacity;*/
/*}*/

/*node->childNodes[node->length].children.value = strdup(data->value);*/
/*}*/

/*void addParentNode(NodeTree *node, DataToken *data) {*/
/*if (node->length >= node->capacity) {*/
/*int newCapacity = node->capacity * 2;*/
/*childNodes *parent =*/
/*realloc(node->childNodes, sizeof(childNodes) * newCapacity);*/

/*if (!parent) {*/
/*perror("Reallocaton is failed.");*/
/*return;*/
/*}*/

/*memset(&parent[node->length], 0,*/
/*(newCapacity - node->capacity) * sizeof(NodeTree));*/
/*node->childNodes = parent;*/
/*node->capacity = newCapacity;*/
/*}*/

/*node->childNodes[node->length].parent.value = strdup(data->value);*/
/*node->length++;*/
/*}*/
DataToken *getDataToken(Token *token, int length) {
  return &token->entries[length];
}

void createAssignment(char *name, DataToken *value) {
  if (!name || !value)
    return;

  printf("%s\n", name);
}

void parseAssignment(Token *token) {
  if (!token)
    return;

  int current = 0;
  char name[64];

  for (int i = 0; i < token->length; i++) {
    if (token->entries[i].type == IDENTIFIER) {
      current = i + 1;
      strcpy(name, token->entries[i].value);
    }
  }

  for (int i = current; i < token->length; i++) {
    printf("%s,%s\n", name, token->entries[i + 1].value);
  }
}

void parse(Token *token) {
  if (!token)
    return;

  NodeTree *node = createNode(10);

  if (token->length > 0) {
    parseAssignment(token);
  }

  free(node);
}
