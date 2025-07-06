#include<stdio.h>
#include<string.h>
int main() {  

char name[50];
fgets(name,50,stdin);
puts(name);
int m=strlen(name);
printf("length of the string is %d",m);
return 0;
}