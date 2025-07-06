#include <stdio.h>
void increment(int *p,int *q)
{ *p=*p+1;
 *q=*q+100;
}
void modifyarray(int arr[])
{ arr[1]=10;
arr[2]=20;
arr[4]=100;
}
int main(){
int x=42;
int y=1000;
int arr[]={1,2,3,4,5};
int *p=&x;
int *q=&y;
increment(p,q);
printf("x=%d\n",x);
printf("y=%d\n",y);
modifyarray(arr);
for(int i=0;i<5;i++)
{ printf("arr[%d]=%d\n",i,arr[i]);
}
}
