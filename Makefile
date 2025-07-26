# Makefile
CC = gcc
CFLAGS = -Wall -I./include

SRC = main.c lib/config.c lib/history.c lib/lexer.c lib/node.c lib/parse.c lib/repl.c lib/tokenize.c lib/utils.c 
OUT = app

all:
	$(CC) $(CFLAGS) $(SRC) -o $(OUT)
