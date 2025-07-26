#ifndef CTYPES_H
#define CTYPES_H

// Grup karakter
#define isarray(c) ((c) == '[' || (c) == ']')
#define isassign(c) ((c) == ':' || (c) == '=')
#define isbacktick(c) ((c) == '`')
#define isblock(c) ((c) == '{' || (c) == '}')
#define iscomma(c) ((c) == ',')
#define isdollar(c) ((c) == '$')
#define isdot(c) ((c) == '.')
#define isfn(c) ((c) == '(' || (c) == ')')
#define ishash(c) ((c) == '#')
#define isint(c) ((c) >= '0' && (c) <= '9')
#define isminus(c) ((c) == '-')
#define ismodules(c) ((c) == '%')
#define ismultiply(c) ((c) == '*')
#define isnewline(c) ((c) == '\n' || (c) == '\r' || (c) == '\x1F')
#define isplus(c) ((c) == '+')
#define isquote(c) ((c) == '"' || (c) == '\'')
#define issemicolon(c) ((c) == ';')
#define isslash(c) ((c) == '/')
#define isunderscore(c) ((c) == '_')
#define iswhitespace(c) ((c) == ' ' || (c) == '\t')
#define isstr(c) (((c) >= 'a' && (c) <= 'z') || ((c) >= 'A' && (c) <= 'Z'))

// Operator umum
#define isoperator(c)                                                          \
  ((c) == '+' || (c) == '-' || (c) == '/' || (c) == '*' || (c) == '%' ||       \
   (c) == '!' || (c) == '<' || (c) == '>' || (c) == '&' || (c) == '|' ||       \
   (c) == '^' || (c) == '~' || (c) == '?')

// Simbol yang diperbolehkan di awal identifier
#define issymallow(c)                                                          \
  (isdollar(c) || (c) == '@' || isunderscore(c) || ishash(c))

// Simbol yang dilarang di awal identifier
#define issymdenied(c)                                                         \
  (isassign(c) || isarray(c) || isblock(c) || isfn(c) || isoperator(c) ||      \
   isdot(c) || iscomma(c) || issemicolon(c) || isquote(c) || isbacktick(c) ||  \
   (c) == '\\')

// Semua simbol umum
#define issymbol(c) (issymallow(c) || issymdenied(c))

#endif
