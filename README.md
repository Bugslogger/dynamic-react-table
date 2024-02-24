
# Dynamic Table Components [MrDark]

(I'm trying my best to make code simple and easy to understant for developers to work on it.)

Table component has main 2 props. we can add more props as per requirements. [Do not add props if you don't really need it. avoid adding props untill it needed to add. 
you can do many things like adding css to row or td from `cols` array without adding more props] 
1. cols
2. response

1. cols type is an Array. It has multiple objects and each object inside array represents data of one cell of row.

STRUCTURE OF `cols` Array

```
[{
    title: "",
    key: "",
    id: "",
    isSortable: "",
    isKey: false or true,
    render: (rowData)=>{
        return rowData;
    },
    bodyStyle: "",
    headStyle: "",
    bodyClass: "",   
    headClass: "",   
    click: ()={}
}]
```


The above is structure of cols array object of how it looks. if you have 5 cell in a row. then your array will have 5 object.

Explanation: 

1. title: title will be displayed in the header of tables. whatever you will write in title: "Head" it will be displayed in table head.

2. key and isKey: key conatains the name of `key` from you response object. 
[let say you a response from API which looks like {name: "sarfaraj", occ: "developer", company: 'haix'}. Now here i will assign name to key
it will look like. {key: 'name'} remeber key name must be same as the key name you getting from response. suppose you have key named "name" and you have assign {key: "Name"} it will not work. coz `key` names are case-sensetive] 
and to display data you have to set `isKey` to true. otherwise it will not display data on web page.

3. render: render property of object takes a function and return every index data from array response. From this method you can access the respose data. and this method is responsible to display the data ion web page. 
Function must have a return statement. 

4. bodyStyle: this property applies the inline styling to the particular cell of table row (i.e table td tags cell)
5. bodyClass: this property added classes to the particular cell of row.

6. similar is for `headStyle` and `headClass` this 2 properties appplies to the header cells of table.

7. isSortable: this property takes a bolean value true or false. this property depends on `key` property you must provide key property to make sortable work.
    if you assign isSortable to true. Then when click on the header of any column it will sort the data in assending or dessending order.


# Table props
## Some props you can pass directly to the table and you don't need to pass it from array object.

  cols,
  response,
  isPaginate,
  headerClass,
  rowHover,
  numberOfData,
  isBgTransparent,
  PaginationOnButtonClick,
  fixedHeight,


Explanation:


Note: Remeber one object in arrray represents a single cell in a row. it does not represents the whole row.
But whole array of objects represents a single row of table.


NOTE: this doc is still incomplete. 
