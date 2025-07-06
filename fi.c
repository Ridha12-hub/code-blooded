#include <stdio.h>
#include<string.h>
struct student{
    int id;
    char name[50];
    float marks;
};
void updatemarks(struct student *s){
    s->marks+=5;
}
int main()
{
    struct student s1={101,"Amir",85.0};
    printf("before update\n");
    printf("ID:%d,Name:%s,Marks:%2f\n",s1.id,s1.name,s1.marks);
    updatemarks(&s1);
    printf("\nafterupdate\n");
      printf("ID:%d,Name:%s,Marks:%2f\n",s1.id,s1.name,s1.marks);
}

