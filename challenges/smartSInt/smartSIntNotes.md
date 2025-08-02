
Chris
Swasti
Chris McDermut Interview
Session
1
// Given two arrays, find common elements between them.
2
// elements are only integers
3
// arrays are not sorted
4
//return and array of common elements
5

6
function testCase1() {
7
  const array1 = [1,2,3,4,5,5,5,6,7]
8
  const array2 = [5,5,6,7,8,9,10]
9
  const answerCommonElements = [5,5,6,7]
10
  const foundCommonElements = findCommonElements(array1, array2)
11
  if(foundCommonElements === answerCommonElements){
12
    console.log('congrats you passed and the found comone elemtns are right')
13
    return true
14
  }
15
     console.log('you failed and the found comone elemtns are not equal')
16
    return false
17
}
18
testCase2();
19

20

21

22
const findCommonElements = (array1, array2) => {
23
  const sortedArray1 = array1.sort()
24
   const sortedArray2 = array2.sort()
25
   let commonElements = {}
26
  //firstArray look through
27
  sortedArray1.forEach((element)=>{
28
    if(!commonElements[element]){
29
      commonElements[element] = 0
30
    }
31
      commonElements[element]+= 1
32
  })
33
  sortedArray2.foreEach((element)=>{
34
    if(!commonElements[element]){
35
      commonElements[element] = 0
36
    }
37
      commonElements[element]+= 1
38
  })
39
  //delete elements with value 1 from map
40
  commonElements.forEach((element)=>{
41
    if(commonElements[element]===1){
42
      comm
43
    }
44
  })
45
  //turn object into array and return
46
};
47

48
hello();
49

