#include <stdio.h>
struct student{
    int id;
    float marks;
};
int main() {
struct student s1={101,88.5};
struct student*ptr=&s1;
printf("ID:%d\n",ptr->id);
printf("MARKS:%2f\n",ptr->marks);
ptr->marks=93.0;
printf("updated marks:%.2f\n",s1.marks);
return 0;
}
