#include <stdio.h>
int demo(int x)
{ x=x+1;
printf("x=%d",x);
return x;
}
int main()
{ int x=100;
int y;
y=demo(1000);
printf("y=%d\n",y);
printf("x=%d\n",x);
}
