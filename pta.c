#include <stdio.h>
int main()
{
int arr[]={1,2,3};
*arr=10;
*(arr+1)=20;
for(int i=0;i<3;i++)
{
printf("%d\n",*(arr+i));
}
}