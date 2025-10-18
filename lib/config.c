#include "limit.h"
#include "package.h"
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool readfile(const char *path, char *buffer) {
  const char *entryfile = path;

  // action
  FILE *file = fopen(entryfile, "r");
  if (!file) {
    fprintf(stderr, "File %s is not found\n", entryfile);
    return false;
  }

  fseek(file, 0, SEEK_END);
  size_t fileSize = ftell(file);
  rewind(file);

  if (fileSize > MAX_BUFFER_SIZE) {
    fprintf(stderr, "File %s is greater of buffer size.\n", entryfile);
    return false;
  }

  size_t bytes = fread(buffer, 1, fileSize, file);
  if (bytes != fileSize) {
    fprintf(stderr, "Error reading file %s\n", entryfile);
    return false;
  }
  buffer[bytes] = '\0';
  fclose(file);

  return true;
}

char *getConfig(const char *line, const char *key, char *value) {
  if (strstr(line, key) == NULL)
    return NULL;

  char *start = strchr(line, '"');
  if (!start)
    return NULL;
  start++;
  char *end = strchr(start, '"');
  if (end)
    *end = '\0';

  if (strcmp(key, "entry:") == 0) {
    size_t response = readfile(start, value);
    if (!response)
      return NULL;

    return value;
  } else if (strcmp(key, "format:") == 0) {
    strcpy(value, start);

    return value;
  }

  return NULL;
}
